import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pets } from '../../models/pet.interface';
import { PetService } from '../../providers/pet-service';
import { PetProfilePage } from '../pet-profile/pet-profile';

/**
 * Generated class for the ManagepetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "Pet"
})

@Component({
  selector: 'page-managepet',
  templateUrl: 'managepet.html',
})
export class ManagePetPage {
  pets: any = null;

  constructor(public navCtrl: NavController, public petService: PetService, public navParams: NavParams, private alertCtrl: AlertController) {
  	this.pets = this.petService.getPetInformation()
    .then( (pets) => {
      //console.log(pets);
      this.pets = pets;
      
    },
    (error) => {
      console.log("error: "+ error);
    });
  }
  onSelect(item){
    this.navCtrl.push(PetProfilePage, {pet: item});
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagepetPage');
  }

}
