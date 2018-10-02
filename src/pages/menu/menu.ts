import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { PageInterface } from '../../models/page.interface';
import { UserNoPwd } from '../../models/user-nopwd.interface';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
  	this.pages = [
  		{ title: 'Home', component: 'HomePage', icon: 'home'},
  		{ title: 'Gerenciar Conta', component: 'UserProfilePage', icon: 'contact'},
  		{ title: 'Gerenciar Pets', component: 'PetProfilePage', icon: 'paw'},
  		{ title: 'Buscar Estabelecimentos', component: 'SearchPage', icon: 'search'}
  	];
    this.user = this.navParams.get('userData');
  }

  openPage(page){
  	this.nav.setRoot(page.component, {userData: this.user});
  }

  logOut(){
    this.menu.toggle();
    this.nav.setRoot('LoginPage');
  }

}
