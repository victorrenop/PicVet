import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../providers/login-service';
import { BaseRestService } from '../../providers/base-rest-service';
import 'rxjs/add/operator/catch';

import { UserNoPwd } from '../../models/user-nopwd.interface';

@IonicPage({
  segment: "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  //Scope variables
  private username: string;
  private password: string;
  private errorText: string;
  private user: any;

  //Control variables
  private emailPattern: string = '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$';
  private error: boolean = false;
  private petOwnerUrl;
  private petOwnerServicePromise;

  loginFormGroup: FormGroup;

  constructor(private login: LoginService, public nav: NavController,
    public forgotCtrl: AlertController, public menu: MenuController,
    public toastCtrl: ToastController, public formBuilder: FormBuilder,
    private storage: Storage,
    private dataService: BaseRestService) {

    this.menu.swipeEnable(false);
    this.registerLoginValidators();
    this.petOwnerUrl = this.dataService.url.petOwnerUrl;
    this.petOwnerServicePromise = this.dataService.DataService<any>(this.petOwnerUrl);
  }

  register() {
    this.nav.push('RegisterPage');
  }

  requestLogin() {
    this.error = false;

    if (!this.loginFormGroup.valid) {
      this.buildErrorMessage();
      return;
    }

    this.executeLoginRequest();
  };

  buildUser(data: any) {
    return {
      name: data.name,
      cpf: data.CPF
    };
  };

  buildErrorMessage() {
    this.error = true;
    this.errorText = 'Preencha todos os campos corretamente'
  };


  executeLoginRequest() {
    this.login.Login(this.username, this.password).subscribe(
      data => {


        if (data.isAuthorized) {

          this.nav.setRoot('MenuPage', { userData: this.user })

          this.storage.set('token', data.token);
          this.storage.set('isAuthorized', data.isAuthorized);
          this.storage.set('userId', data.userId);

          this.petOwnerServicePromise.then((success) => {
            success.get(null, "/SelectByUserId/" + data.userId).subscribe(data => {
              if (data)
              {
                this.storage.set("petOwnerId", data.id);
                this.user = this.buildUser(data);
              } 
            });
          }, (error) => {
            console.log(error);
          });

        }
      },
      error => {
        if (error === 401) {
          this.errorText = 'Usuário não autorizado'
          this.error = true;
        }
      })
  };

  registerLoginValidators() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    });
  };
}
