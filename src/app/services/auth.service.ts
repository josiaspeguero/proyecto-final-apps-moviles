import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';
import { Observable, from, throwError } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  private buildBody(data: any): string {
    const params = new URLSearchParams();
    params.set('datax', JSON.stringify(data));
    return params.toString();
  }

  register(matricula: string): Observable<any> {
    const body = this.buildBody({ matricula });
    return this.http.post<any>(`${this.baseUrl}auth/registro`, body, this.getOptions());
  }

  activate(token: string, contrasena: string): Observable<any> {
    const body = this.buildBody({ token, contrasena });
    return this.http.post<any>(`${this.baseUrl}auth/activar`, body, this.getOptions()).pipe(
      tap(async (res) => {
        if (res.token && res.refreshToken) {
          await this.saveTokens(res.token, res.refreshToken);
        }
      })
    );
  }

  login(matricula: string, contrasena: string): Observable<any> {
    const body = this.buildBody({ matricula, contrasena });
    return this.http.post<any>(`${this.baseUrl}auth/login`, body, this.getOptions()).pipe(
      switchMap(async (res) => {
        if (res.token && res.refreshToken) {
          await this.saveTokens(res.token, res.refreshToken);
          await Preferences.set({ key: 'matricula', value: matricula });
        } else if (res.data?.token) { // Extra cover if it's nested
          await this.saveTokens(res.data.token, res.data.refreshToken || res.data.token);
          await Preferences.set({ key: 'matricula', value: matricula });
        }
        return res;
      })
    );
  }

  refresh(): Observable<any> {
    return from(Preferences.get({ key: 'refreshToken' })).pipe(
      switchMap(({ value }) => {
        if (!value) {
          return throwError(() => new Error('No refresh token available'));
        }

        const body = this.buildBody({ refreshToken: value });
        return this.http.post<any>(`${this.baseUrl}auth/refresh`, body, this.getOptions()).pipe(
          tap(async (res) => {
            if (res.token) {
              await Preferences.set({ key: 'token', value: res.token });
              if (res.refreshToken) {
                await Preferences.set({ key: 'refreshToken', value: res.refreshToken });
              }
            }
          })
        );
      })
    );
  }

  async saveTokens(token: string, refreshToken: string) {
    await Preferences.set({ key: 'token', value: token });
    await Preferences.set({ key: 'refreshToken', value: refreshToken });
  }

  async logout() {
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'refreshToken' });
    await Preferences.remove({ key: 'matricula' });
    this.router.navigate(['/login']);
  }

  forgotPassword(matricula: string): Observable<any> {
    const body = this.buildBody({ matricula });
    return this.http.post<any>(`${this.baseUrl}auth/olvidar`, body, this.getOptions());
  }

  changePassword(actual: string, nueva: string): Observable<any> {
    const body = this.buildBody({ actual, nueva });
    return this.http.post<any>(`${this.baseUrl}auth/cambiar-clave`, body, this.getOptions());
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}perfil`);
  }

  uploadProfilePhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    // Para subir archivos NO establecemos Content-Type a form-urlencoded
    // HttpClient configurará automáticamente multipart/form-data con el boundary correcto
    return this.http.post<any>(`${this.baseUrl}perfil/foto`, formData);
  }
}
