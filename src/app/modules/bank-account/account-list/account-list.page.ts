import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class accountListPage implements OnInit {
  /**
   * Account listing page 
   * Page routes to account listing page by default
   * Items array to store all accounts list data
   */
  items: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      /**
       * Get all accounts list data initially once the router data is resolved
       * 
       */
      this.getData();
    }
  }

  /**
   * getData function to get all accounts list data 
   * Data receieving through accountListResolver
   * Subscribed through routes
   * 
   */
  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading accounts list. Please hold on..'
    });
    this.itsLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  /**
   * To show the loader untill we get account list data api response
   * 
   */
  async itsLoading(loading) {
    return await loading.present();
  }

}
