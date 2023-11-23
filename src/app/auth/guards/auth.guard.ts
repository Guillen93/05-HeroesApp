import {
  ActivatedRouteSnapshot, CanActivateFn,
  CanMatchFn, Route, Router,
  RouterStateSnapshot, UrlSegment,
} from '@angular/router';
import { AuthService } from 'src/app/heroes/services/auth.service';    
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate: CanActivateFn =
	(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  	return this.authService.verificaAutenticacion()
    	.pipe(
      	tap(estaAutenticado => {
        	if (!estaAutenticado) {
          	this.router.navigate(['./auth/login']);
        	}
      	})
    	);
	};

  canMatch: CanMatchFn =
	(route: Route, segments: UrlSegment[]) => {
  	return this.authService.verificaAutenticacion()
    	.pipe(
      	tap(estaAutenticado => {
        	if (!estaAutenticado) {
          	this.router.navigate(['./auth/login']);
        	}
      	})
    	);
	};
}
