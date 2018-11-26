import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot)/*: Observable<boolean> | Promise<boolean> | boolean*/ {
      let toReturn: boolean;
      const currentUser = this.authenticationService.currentUserValue;

      if (currentUser) {
        toReturn =  true;
      } else {
        toReturn = false;
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      }
      return toReturn;
  }
}
