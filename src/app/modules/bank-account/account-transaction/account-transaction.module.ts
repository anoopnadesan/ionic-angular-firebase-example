import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransactionsPage } from './account-transaction.page';
import { TransactionsResolver } from './account-transaction.resolver';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage,
    resolve: {
      data: TransactionsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionsPage],
  providers: [TransactionsResolver]
})
export class TransactionsPageModule { }
