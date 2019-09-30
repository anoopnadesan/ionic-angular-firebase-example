import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  /**
   * Firbase client service to create, update, get account details and unsubscribe on logout.
   *  
   */
  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  /**
   * Firbase client service to get all accounts list.
   *  
   */
  getAccounts() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('mmi').doc(currentUser.uid).collection('accounts').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  /**
   * Firbase client service to get selected accounts details using account id.
   *  
   */
  getAccount(accountId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('mmi/' + currentUser.uid + '/accounts/' + accountId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  /**
   * On logout unsubscribe from the accounts data snapshot.
   *  
   */
  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  /**
   * Firbase client service to get update account details using account id.
   *  
   */
  updateAccount(accountKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('mmi').doc(currentUser.uid).collection('accounts').doc(accountKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  /**
   * Firbase client service to create account.
   * Account attributes account number, first name, last name, age, overdraft, minimum balance and balance.
   *  
   */
  createAccount(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('mmi').doc(currentUser.uid).collection('accounts').add({
        accountNumer: value.accountNumer,
        firstName: value.firstName,
        lastName: value.lastName,
        age: value.age,
        overdraft: value.overdraft,
        minBalance: value.minBalance,
        balance: value.minBalance
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
}
