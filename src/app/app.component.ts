import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  /**
   * App component
   * App menu items list for iterating the object list in sidear menu template 
   * with app component template
   * sign out, new account and account list
   *  
   */
  public menuItems = [{
    title: 'Accounts',
    url: '/account-list',
    icon: 'list'
  },
  {
    title: 'New account',
    url: '/account-new',
    icon: 'add'
  },
  {
    title: 'Sign Off',
    url: 'sign-out',
    icon: 'power'
  }];

  constructor(
    private platform: Platform,
    public menuCtrl: MenuController,
    private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    /**
     * Initializing app component     *  
     */
    this.initializeApp();
  }

  /**
   * Initializing app component
   * Disabling sidebar menu initially
   * Checking for user login session
   * Enabling sidear menu and navigate to account list incase of user already logged in 
   * Navigate to sign in page incase of user not logged in
   *  
   */
  initializeApp() {
    this.menuCtrl.enable(false);
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.menuCtrl.enable(true);
          this.router.navigate(["/account-list"]);
        } else {
          this.router.navigate(["/signin"]);
        }
      }, err => {
        this.router.navigate(["/signin"]);
      }, () => { })
    });
  }

  /**
   * Disabling sidebar menu
   * signOut function: Logging out from token based authentication 
   * Navigating to sign in page after signout
   * 
   */
  signOut() {
    this.menuCtrl.enable(false);
    this.authService.signOut()
      .then(res => {
        this.router.navigate(["/signin"]);
      }, err => {
        console.log(err);
      })
  }
}
