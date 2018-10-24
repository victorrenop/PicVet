import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, ToastController } from 'ionic-angular';
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

  private emailPattern: string = '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$';
	private error: boolean = false;
  private errorText: string;

  //Scope variables
  private username: string;
  private password: string;

  private user: UserNoPwd;
  
  loginFormGroup: FormGroup;

  constructor(private login: LoginService, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public formBuilder: FormBuilder) {
    this.menu.swipeEnable(false);

    this.loginFormGroup = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    });

  }

 register() {
    this.nav.push('RegisterPage');
  }

  requestLogin(){
    this.error = false;
    
    if(this.loginFormGroup.valid)
    {
      this.login.Login(this.username, this.password).subscribe(
        data =>{

          this.user = {
            name : "Name",
            lastName: "data.lastName",
            phone: "data.phone",
            cep : "data.cep",
            email : "data.email",
            avatar: "data.avatar"  
          };

            if(data.isAuthorized)
                this.nav.setRoot('MenuPage', {
                    userData: this.user
                })
        },  
        error =>{
          
          console.log(error);
          if( error == 401)
          {
            this.errorText = 'Usuário não autorizado'
            this.error = true;
          }

        })  
    }
    else
    {
      this.error = true;
      this.errorText = 'Preencha todos os campos corretamente'
    }

  };

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Esqueceu a senha?',
      message: "Preencha seu e-mail para receber um link de redefinição.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          /*handler: data => {
            console.log('Cancel clicked');
          }*/
        },
        {
          text: 'Enviar',
          handler: data => {
            //console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'E-mail enviado com sucesso',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
