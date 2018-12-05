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
    console.log(this.user);
    this.menu.enable(true);
  
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
      { title: 'Inicial', component: 'HomePage', icon: 'home'},
      { title: 'Buscar Estabelecimentos', component: 'SearchPage', icon: 'search'},
      { title: 'Gerenciar Pets', component: 'ListOfPetsPage', icon: 'paw'},
      { title: 'Agenda de Serviços', component: 'CalendarPage', icon: 'calendar'},
      { title: 'Log de serviços', component: 'BookPage', icon: 'md-cart'},
      { title: 'Carteira de Vacinas', component: 'VaccinePage', icon: 'list'},
      { title: 'Gerenciar Conta', component: 'UserProfilePage', icon: 'contact'}
    ];
  }
}
