import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../../../services/firebase.service';

@Injectable()
export class TransactionsResolver implements Resolve<any> {
  constructor(public firebaseService: FirebaseService, ) { }

  resolve(route: ActivatedRouteSnapshot) {
    /**
     * Selected account data resolver 
     * firebaseService service's getAccount function call to get selected account data using account id 
     * 
     */
    return new Promise((resolve, reject) => {
      let itemId = route.paramMap.get('id');
      this.firebaseService.getAccount(itemId)
        .then(data => {
          data.id = itemId;
          resolve(data);
        }, err => {
          reject(err);
        })
    })
  };
}
