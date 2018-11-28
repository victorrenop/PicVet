import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { PageInterface } from '../../models/page.interface';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { LoginService } from '../../providers/login-service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
	@ViewChild(Nav) nav: Nav;
	pages: Array<PageInterface>;
	rootPage = 'HomePage';

  private user: UserNoPwd;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private menu: MenuController, 
              private loginService: LoginService) {

  	this.buildPageValues();
    this.user = this.navParams.get('userData');
  
  }

  openPage(page){
  	this.nav.setRoot(page.component, {userData: this.user});
  }

  logOut(){

      this.loginService.Logout()
      .then((isLoggedOut) =>
      {
        if (isLoggedOut)
        {
            this.menu.toggle();
            this.nav.setRoot('LoginPage')
        }
        else
            console.log("Não deslogou:" + isLoggedOut);        
      },(err) =>
      {
            console.log("Erro ao deslogar:" + err);        
      });
  }

  buildPageValues()
  {
    this.pages = [
      { title: 'Inical', component: 'HomePage', icon: 'home'},
      { title: 'Buscar Estabelecimentos', component: 'SearchPage', icon: 'search'},
      { title: 'Serviços', component: 'BookPage', icon: 'md-cart'},
      { title: 'Gerenciar Pets', component: 'ListOfPetsPage', icon: 'paw'},
      { title: 'Gerenciar Conta', component: 'UserProfilePage', icon: 'contact'}
    ];
  }

}
