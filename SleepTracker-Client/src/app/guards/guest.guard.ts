import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject( AuthenticationService)
  
  return authService.isLoggedIn().pipe(
    map( resp => {
      if(resp == true){
        return true;
      }
      return router.createUrlTree(['signin']);
    })
  );
};
