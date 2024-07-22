import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  navigateToHomeView() {
    this.router.navigate(["home"]);
  }

  navigateToSubscriptionView() {
    this.router.navigate(["subscription"]);
  }

  navigateToLoginView() {
    this.router.navigate(["login"]);
  }

  navigateToResetPasswordView() {
    this.router.navigate(["reset-password"]);
  }

  navigateToDashboardView() {
    this.router.navigate(["dashboard"]);
  }

  navigateToFavouriteView() {
    this.router.navigate(["favourites"]);
  }

  navigateToProfileView() {
    this.router.navigate(["profile"]);
  }
}
