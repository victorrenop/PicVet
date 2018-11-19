import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { Geolocation } from '@ionic-native/geolocation';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private geolocation: Geolocation, private push: Push) {
  	menu.enable(true);

    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        alert('Tem permissão');/*console.log('We have permission to send push notifications');*/

        const options: PushOptions = {
           android: {},
           ios: {
               alert: 'true',
               badge: true,
               sound: 'false'
           },
           windows: {},
           browser: {
               pushServiceURL: 'http://push.api.phonegap.com/v1/push'
           }
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
          alert(notification.message);/*console.log('Received a notification', notification));*/
        });
        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      } else {
        alert('Não tem permissão');/*console.log('We do not have permission to send push notifications');*/
      }
     });

  }

  ionViewWillLoad() {
    this.user = this.navParams.get('userData');
  }

  ionViewDidLoad(){
    //this.showMap();
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
