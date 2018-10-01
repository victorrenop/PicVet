import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private user: UserNoPwd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.user = this.navParams.get('userData');
  }

  changeAvatar(){
  	let toast = this.toastCtrl.create({
	    message: 'Deu certo',
	    duration: 3000,
	    position: 'top',
	    cssClass: 'dark-trans',
	    closeButtonText: 'OK',
	    showCloseButton: true
	  });
	  toast.present();
  }

  alterPassword(){
  }

  alterEmail(){
  }

  alterName(){
  }

  alterAddress(){
  }

  alterPhone(){
  }

}
