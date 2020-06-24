import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getIsAuth } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate /*,CanLoad*/ {
  constructor(private store:Store<AppState>) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogin();
      
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLogin();
  }

  checkLogin(): Observable<boolean> { 
    return this.store.select<boolean>(getIsAuth)
  }

}
