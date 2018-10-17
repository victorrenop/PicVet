import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var L: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  pos: any;

	private user: UserNoPwd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private geolocation: Geolocation) {
  	menu.enable(true);
  }

  ionViewWillLoad() {
    this.user = this.navParams.get('userData');
    console.log(this.user);
  }

  ionViewDidLoad(){
    this.showMap();
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then( resp => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    })
    .catch(error => {
      console.log(error);
    });
  }

  showMap(){
    this.getPosition();
    console.log(this.pos);
    var mymap = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidmljdG9ycmVubyIsImEiOiJjam4ybHozaDQwbzU1M3ZuZDNraHdndmJ0In0.GRn1RsamZemHOmnn504lng'
}).addTo(mymap);
    var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
  }

}
