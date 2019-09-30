import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { accountListPage } from './account-list.page';
import { accountListResolver } from './account-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: accountListPage,
    resolve: {
      data: accountListResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [accountListPage],
  providers: [
    accountListResolver
  ]
})
export class accountListPageModule { }
