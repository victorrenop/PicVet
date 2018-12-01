import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { VaccineInterface } from '../../models/vaccine.interface';
import { Pets } from '../../models/pet.interface';

/**
 * Generated class for the VaccinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaccine',
  templateUrl: 'vaccine.html',
})
export class VaccinePage {

	private vacs: VaccineInterface[];
	private pet: Pets;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  	this.vacs = [
	  	{name: "Rabica", description: "Anti-Raiva", date: ""},
	  	{name: "Tetano", description: "Anti-Teteanica", date: ""},
	  	{name: "Sei la", description: "HEHEHHE", date: ""}
  	];
  	this.pet = this.navParams.get('pet');
  }

  vaccineDetails(v: VaccineInterface) {
    let alert = this.alertCtrl.create({
      title: v.name,
      message: v.description,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }
}
