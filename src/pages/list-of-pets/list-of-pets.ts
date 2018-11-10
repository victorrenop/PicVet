import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pets } from '../../models/pet.interface';



//import { PetService } from '../../providers/pet-service';
import { BaseRestService } from '../../providers/base-rest-service';
import { PetProfilePage } from '../pet-profile/pet-profile';

@IonicPage({
  segment: "Pet"
})

@Component({
  selector: 'page-list-of-pets',
  templateUrl: 'list-of-pets.html',
})
export class ListOfPetsPage {
  pets: any[] = [];

  constructor(public navCtrl: NavController, public baseRestService: BaseRestService, public navParams: NavParams, private alertCtrl: AlertController) {
  	
    let petService = this.baseRestService.DataService<Pets>(this.baseRestService.url.petServiceUrl);

    console.log(petService.get());

    /*petService.get()
    .subscribe(data =>{    
  
        let i = 0;
        
        for( let p in data ){
          console.log(data[0]);
          this.pets[i++] = data[0]
        }

      },
    (error) => {
      console.log("error: "+ error);
    });*/
  };

  loadAnimals()
  {
    let pet_url = this.baseRestService.url.petServiceUrl;

    this.baseRestService.DataService(pet_url)
  };

  onSelect(item){
    this.navCtrl.push(PetProfilePage, {pet: item});
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagepetPage');
  };
}
