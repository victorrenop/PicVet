import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Pets } from '../../models/pet.interface';


@IonicPage()
@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})
export class PetProfilePage {

	private pet: Pets;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  	this.pet = this.navParams.get('pet');
  	console.log(this.pet);
  }

  alterName(){
  	let alert = this.alertCtrl.create({
      title: "Mudar o nome do pet",
      message: "Nome atual: " + this.pet.name,
      inputs: [
      {
        name: 'Name',
        placeholder: this.pet.name
      },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data =>{
            
          }
        },
        {
          text: 'Cancelar',
        }
      ]
    });
    alert.present();
  }

  alterBreed(){
  	let alert = this.alertCtrl.create({
      title: "Mudar a raça do pet",
      message: "Raça atual: " + this.pet.breed,
      inputs: [
      {
        name: 'Breed',
        placeholder: this.pet.breed
      },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data =>{
            
          }
        },
        {
          text: 'Cancelar',
        }
      ]
    });
    alert.present();
  }

  vaccineAccess(){
  	this.navCtrl.push('VaccinePage', {pet: this.pet});
  }

}
