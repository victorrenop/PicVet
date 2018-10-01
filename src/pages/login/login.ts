import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../providers/login-service';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import 'rxjs/add/operator/catch';

@IonicPage({
	segment: "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	private username: string;
  private error: boolean = false;
  private errorText: string;
  private user: UserNoPwd;
  private emailPattern: string = '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$';

  loginFormGroup: FormGroup;

  constructor(private login: LoginService, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public formBuilder: FormBuilder) {
    this.menu.swipeEnable(false);
    this.loginFormGroup = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    });
  }

 register() {
    this.nav.setRoot('UserProfilePage');
  }

  parseLogin(){
    this.error = false;
    if(!this.loginFormGroup.valid){
      this.error = true;
      this.errorText = 'Preencha todos os campos corretamente'
    }
    else{
      this.login.getUserInformation( this.username ).subscribe(
        data =>{
          this.user = {
            name : data.name,
            cep : data.cep,
            email : data.email,
            avatar: data.avatar  
          };
          
          this.nav.setRoot('MenuPage', {
            userData: this.user
          })
        },
        error =>{
          if( error == 404 ){
            this.errorText = 'Usuário ou senha incorretos'
            this.error = true;
            console.log(error);
          }
        }
      )
    }
  }

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
