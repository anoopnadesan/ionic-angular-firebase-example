import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * App routes list(sign in, new account, account list and transaction)
 *  
 */
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './modules/auth/signin/signin.module#SigninPageModule' },
  { path: 'account-new', loadChildren: './modules/bank-account/account-new/account-new.module#AccountNewPageModule' },
  { path: 'account-list', loadChildren: './modules/bank-account/account-list/account-list.module#accountListPageModule' },
  { path: 'account-transaction/:id', loadChildren: './modules/bank-account/account-transaction/account-transaction.module#TransactionsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
