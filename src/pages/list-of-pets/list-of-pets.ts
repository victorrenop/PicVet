import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pets } from '../../models/pet.interface';

import { BaseRestService } from '../../providers/base-rest-service';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { AddPetPage } from '../add-pet/add-pet';

@IonicPage({
  segment: "Pet"
})

@Component({
  selector: 'page-list-of-pets',
  templateUrl: 'list-of-pets.html',
})

export class ListOfPetsPage {
  private pets: any[] = [];
  private petService;
  private url;

  constructor(public navCtrl: NavController, public baseRestService: BaseRestService, public navParams: NavParams, private alertCtrl: AlertController) {
      this.url = this.baseRestService.url.petServiceUrl;
      var petServicePromisse = this.baseRestService.DataService<Pets>(this.url);

      /*petServicePromisse.then(
        (val) => { 
          this.petService = val
          this.loadAnimals();
        },
        (err) => console.error(err)
      );*/
      this.loadAnimals();
  };

  loadAnimals()
  {
    /*this.petService.get()
      .subscribe(data =>{    
          let i = 0;

          for( let p in data ){
            this.pets[i] = data[i]
            i++;
          }
        },
      (error) => {
        console.log("error: "+ error);
      });*/
      this.pets[0] = {
        name: 'Pietro',
        breed: 'Debonio',
        avatar: '../../assets/imgs/satanas.jpeg'
      };
      this.pets[1] = {
        name: 'Canga',
        breed: 'Canguru',
        avatar: '../../assets/imgs/canguru.jpg'
      };
  };

  onSelect(item){
    this.navCtrl.push(PetProfilePage, {pet: item});
  }

  addPet()
  {
    this.navCtrl.push(AddPetPage);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagepetPage');
  };
}
