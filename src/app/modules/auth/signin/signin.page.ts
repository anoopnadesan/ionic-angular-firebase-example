import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  /**
   * Sign in page 
   * form: form group instance object for form data with user credentials
   * errorMessage: var to store error message when authentication failed
   * validationMessages: var to hold validation messages object
   * 
   */
  form: FormGroup;
  errorMessage: string = '';
  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * New for builder to handle sign in form validation 
     * email id and password.
     * form: form group instance object for form data with user credentials
     * 
     */
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  /**
   * authenticate function to validate user using credentials
   * email id and password.
   * Navigate to accounts list page after successful login
   * Log the error message to console if login fails
   * 
   */
  authenticate(value) {
    this.authService.authenticate(value)
      .then(res => {
        this.router.navigate(["/account-list"]);
      }, err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }
}
