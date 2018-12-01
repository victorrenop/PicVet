import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { BaseRestService } from '../../providers/base-rest-service';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

declare var L: any;

@IonicPage()
@Component({
  selector: 'add-pet',
  templateUrl: 'add-pet.html',
})
export class AddPetPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  pos: any;

  private url;
  private pet = {};
  addPetFormGroup: FormGroup;

  private errorText: string;
  private error: boolean = false;


  constructor(public navCtrl: NavController, public baseRestService: BaseRestService, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.url = this.baseRestService.url.bookServiceUrl;
    this.builFormBuilder();
  }

  createPet() {

    if (!this.addPetFormGroup.valid) {
      this.buildErrorMessage();
      return;
    }
    console.log(this.pet);
  }

  buildErrorMessage() {
    this.error = true;
    this.errorText = 'Preencha todos os campos corretamente'
  }

  builFormBuilder() {
    this.addPetFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      species: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      breed: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      color: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      weight: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      sex: [Validators.required],
      date: [Validators.required]
    });
  }


}
