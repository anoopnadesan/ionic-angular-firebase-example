import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.page.html',
  styleUrls: ['./account-transaction.page.scss'],
})
export class TransactionsPage implements OnInit {
  /**
   * Account transaction page 
   * Page routes to account listing page by default
   * Form group instance object to hold all account transaction form
   * Item variable to get selected account data using account id 
   */
  form: FormGroup;
  item: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * Get selected account data initially
     */
    this.getData();
  }

  /**
   * getData function to get selected account data using account id 
   * Data receieving through accountListResolver
   * Subscribed through routes
   * 
   */
  getData() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      data.balance = parseInt(data.balance);
      if (data) {
        this.item = data;
      }
    })
    this.form = this.formBuilder.group({
      transactionType: new FormControl('deposit', Validators.required),
      transactionAmount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  /**
   * Account transaction(deposit or withdrawal)
   * Account attributes account number, first name, last name, 
   * age, overdraft, minimum balance and balance.
   * Data updated using firebase service
   * Form reset after form submission
   * Navigate to accounts list page when the transaction is done
   * Account balance is updated ased on transaction type(deposit or withdrawal)
   */
  onSubmit(value) {
    let data = {
      accountNumber: this.item.accountNumber,
      accountType: this.item.accountType,
      firstName: this.item.firstName,
      lastName: this.item.lastName,
      age: this.item.age,
      overdraft: this.item.overdraft,
      minBalance: this.item.minBalance,
      balance: this.accountBalanceUpdated(value)
    }
    this.firebaseService.updateAccount(this.item.id, data)
      .then(
        res => {
          this.router.navigate(["/account-list"]);
        }
      )
  }

  /**
   * accountBalanceUpdated function returns the updated account balance
   * Account balance is updated ased on transaction type(deposit or withdrawal)
   * 
   */
  accountBalanceUpdated(transaction) {
    transaction.transactionAmount = parseInt(transaction.transactionAmount);
    if (transaction.transactionType == 'deposit') {
      return this.item.balance + transaction.transactionAmount;
    } else {
      return (this.item.balance > transaction.transactionAmount) ? (this.item.balance - transaction.transactionAmount) : 0;
    }
  }

  /**
   * To show the loader untill we get account list data api response
   * 
   */
  async itsLoading(loading) {
    return await loading.present();
  }

}
