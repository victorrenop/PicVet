import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	private user: UserNoPwd;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.user = this.navParams.get('userData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
