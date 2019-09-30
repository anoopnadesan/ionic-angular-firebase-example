import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.page.html',
  styleUrls: ['./account-new.page.scss'],
})
export class AccountNewPage implements OnInit {
  /**
   * New account creation page 
   * Form group instance object to hold all account transaction form
   */
  form: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    /**
     * Form reset initially on new account creation form
     */
    this.resetFields();
  }

  /**
   * Function to reset new account creation form
   * form: form group instance object to create account form data 
   * 
   */
  resetFields() {
    this.form = this.formBuilder.group({
      accountNumer: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      overdraft: new FormControl('', Validators.required),
      minBalance: new FormControl('', Validators.required)
    });
  }

  /**
   * New account creation data submission
   * Account attributes account number, first name, last name, 
   * age, overdraft, minimum balance and balance.
   * Data submitted using firebase service
   * Form reset after form submission
   * Navigate to accounts list page after successful account creation(data submission successful)
   */
  onSubmit(value) {
    let data = {
      accountNumer: value.accountNumer,
      firstName: value.firstName,
      lastName: value.lastName,
      age: value.age,
      overdraft: value.overdraft,
      minBalance: value.minBalance,
      balance: value.minBalance
    }
    this.firebaseService.createAccount(data)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(["/account-list"]);
        }
      )
  }

  /**
   * To show the loader untill we get account list data api response
   * 
   */
  async itsLoading(loading) {
    return await loading.present();
  }

}
