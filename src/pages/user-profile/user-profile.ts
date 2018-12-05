import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { CepInterface } from '../../models/cep.interface';
import { CepService } from '../../providers/cep-service';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private user: UserNoPwd;
  private add: CepInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public toastCtrl: ToastController, private alertCtrl: AlertController,
              private cepService: CepService) {
    this.user = this.navParams.get('userData');

    console.log(this.user);
  }

  changeAvatar(){
  	let toast = this.toastCtrl.create({
	    message: 'Deu certo',
	    duration: 3000,
	    position: 'top',
	    cssClass: 'dark-trans',
	    closeButtonText: 'OK',
	    showCloseButton: true
	  });
	  toast.present();
  }

  alterPassword(){
    let alert = this.alertCtrl.create({
      title: "Mudar a senha da conta",
      inputs: [
      {
        name: 'oldPassword',
        type: "password",
        placeholder: "Senha Atual"
      },
      {
        name: 'newPassword',
        type: "password",
        placeholder: "Nova Senha"
      }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data =>{
            if( data.oldPassword != "teste" ){
              let incorrect = this.alertCtrl.create({
                message: 'Senha atual incorreta',
                buttons: [
                {
                  text: 'Ok'
                }
                ]
              });
              incorrect.present();
            }
          }
        },
        {
          text: 'Cancelar',
        }
      ]
    });
    alert.present();
  }

  alterEmail(){
    let alert = this.alertCtrl.create({
      title: "Mudar o email da conta",
      inputs: [
      {
        name: 'Email',
        placeholder: this.user.email
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

  alterName(){
    let alert = this.alertCtrl.create({
      title: "Mudar o nome da conta",
      inputs: [
      {
        name: 'Name',
        placeholder: this.user.name
      },
      {
        name: 'SName',
        placeholder: this.user.lastName
      }
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
}
