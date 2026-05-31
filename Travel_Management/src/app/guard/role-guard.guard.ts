import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const roleGuardGuard: CanActivateFn = (route) => {
  
  const router = inject(Router);

  const expectedRoles = route.data?.['roles'] as string[];
  const currentRole = localStorage.getItem('role');
    if (currentRole && expectedRoles.includes(currentRole)) {
    return true;
  }

  router.navigate(['']);
  return false;
};
