import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Firbase based authentication service
   * User authentication with credetials(email id and password)
   * Signout from firebase authentication using angular firebase
   *  
   */
  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth
  ) { }

  /**
   * authenticate function to validate user using credentials
   * email id and password.
   * credentials are passed to firease auth function signInWithEmailAndPassword and validates user
   * 
   */
  authenticate(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  /**
   * signOut function: Logging out from token based authentication 
   * Signout from firebase authentication using angular firebase
   * 
   */
  signOut() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          console.log(error);
          reject();
        });
    })
  }
}
