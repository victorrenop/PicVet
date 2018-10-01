import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	private user: UserNoPwd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  	menu.enable(true);
  }

  ionViewWillLoad() {
    this.user = this.navParams.get('userData');
    console.log(this.user);
  }

}
