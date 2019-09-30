import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';

@Injectable()
export class accountListResolver implements Resolve<any> {

  constructor(private firebaseService: FirebaseService) { }

  resolve() {
    /**
     * All accounts list data resolver 
     * firebaseService service's getAccounts function call to get all accounts list data 
     * 
     */
    return this.firebaseService.getAccounts();
  }
}
