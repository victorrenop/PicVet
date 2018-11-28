import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreInterface } from '../../models/store.interface';
import { ServiceInterface } from '../../models/service.interface';

@IonicPage()
@Component({
  selector: 'page-store-options',
  templateUrl: 'store-options.html',
})
export class StoreOptionsPage {

	private store: StoreInterface; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.store = this.navParams.get('storeData');
    console.log(this.store.types);
  }

  selectService(service: ServiceInterface){
    console.log(service);
  }

}
