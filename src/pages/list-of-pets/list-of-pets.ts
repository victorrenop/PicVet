import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pets } from '../../models/pet.interface';
import { Storage } from '@ionic/storage';


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

  constructor(public navCtrl: NavController,
    public baseRestService: BaseRestService,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public storage: Storage) {
    this.url = this.baseRestService.url.petServiceUrl;
    var petServicePromisse = this.baseRestService.DataService<any>(this.url);

    petServicePromisse.then(
      (val) => {
        this.petService = val
        this.loadAnimals();
      },
      (err) => console.error(err)
    );
  };

  loadAnimals() {


    this.storage.get("petOwnerId").then((val) => {

      let customUrl =  "/"+val+"/ListAll";

      this.petService.get(null, customUrl)
        .subscribe(data => {
          let i = 0;

          for (let p in data) {
            this.pets[i] = data[i]
            this.pets[i].avatar = "../assets/imgs/dog.png"
            i++;
          }
        },
          (error) => {
            console.log("error: " + error);
          });
    });

  };

  onSelect(item) {
    this.navCtrl.push(PetProfilePage, { pet: item });
  }

  addPet() {
    this.navCtrl.push('AddPetPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagepetPage');
  };
}
