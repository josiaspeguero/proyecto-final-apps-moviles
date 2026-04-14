import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const { value } = await Preferences.get({ key: 'token' });
  
  if (value) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
