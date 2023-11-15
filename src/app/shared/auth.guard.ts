import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PerfromToastAction } from '../state/authenticatio.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkToken();
  }

  private checkToken(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.store.dispatch(new PerfromToastAction(
        { raise: true, message: 'Login first with reqres.in valid users', type: 'Error' }
      ))
      this.router.navigate(['/login']);
      return false;
    }
  }
}
