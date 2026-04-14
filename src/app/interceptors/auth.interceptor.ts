import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wrap the async token retrieval in a from() observable
  return from(Preferences.get({ key: 'token' })).pipe(
    switchMap(({ value }) => {
      let clonedReq = req;
      
      // If we have a token and it's not a login/register request, attach it
      if (value && !req.url.includes('/auth/login') && !req.url.includes('/auth/registro') && !req.url.includes('/auth/activar')) {
        clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${value}`
          }
        });
      }

      // Proceed with the request and handle errors
      return next(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !req.url.includes('/auth/refresh')) {
            // Token might be expired, let's try to refresh
            return authService.refresh().pipe(
              switchMap((res) => {
                if (res && res.token) {
                  // Retry the original request with the new token
                  const newReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.token}`
                    }
                  });
                  return next(newReq);
                }
                // If refresh fails or doesn't return a token
                authService.logout();
                return throwError(() => error);
              }),
              catchError((refreshErr) => {
                authService.logout();
                return throwError(() => refreshErr);
              })
            );
          }
          return throwError(() => error);
        })
      );
    })
  );
};
