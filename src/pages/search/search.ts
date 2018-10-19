import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { StoreInterface } from '../../models/store.interface';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var L: any;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	@ViewChild('map') mapRef: ElementRef;
  map: any;
  pos: any;

	private user: UserNoPwd;
	private tabs = {
		cons: false,
		exam: false,
		bath: false,
		tosa: false
	};
	private maps: boolean;
	private sort = {
		name: { toggle: true, asc: true, dsc: false},
		meanRatings: { toggle: false, asc: true, dsc: false},
		totalRatings: { toggle: false, asc: true, dsc: false}
	};
	private results: number;
	private sts: StoreInterface[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private geolocation: Geolocation) {
  	this.user = this.navParams.get('userData');
  	this.maps = false;
  	this.sts[0] = {
  		address: "Rua Barao, 25, Centro",
  		name: "PETVET",
  		logo: "../../assets/imgs/random.jpg",
  		totalRatings: 150,
  		meanRating: 4.5,
      open: "Segunda a Sexta",
      types:[
        "Exames,",
        "consultas",
      ],
      services:[
        {name: "Exame do Pet", type: "Exame", details: "Exame com o a escolha de horario e medico", priceRange: "100-150", date: "Segunda a Sexta"},
        {name: "Consulta Especializada", type: "Consultas", details: "Consulta para diversos tipos de problemas", priceRange: "100-150", date: "Segunda a Sexta"},
      ]
  	};

  	this.sts[1] = {
  		address: "Rua Barao, 75, Centro",
  		name: "Dogger",
  		logo: "../../assets/imgs/logoPicVet.png",
  		totalRatings: 250,
  		meanRating: 3,
      open: "Terca a Domingo",
      types:[
        "Exames,",
        "consultas,",
        "banho,",
        "tosa"
      ],
      services:[
        {name: "Exame do Pet", type: "Exame", details: "Exame com o a escolha de horario e medico", priceRange: "50-150", date: "Terca a Sexta"},
        {name: "Consulta Especializada", type: "Consultas", details: "Consulta para diversos tipos de problemas", priceRange: "100-150", date: "Terca a Sexta"},
        {name: "Banho Completo", type: "Banho", details: "Banho com direito a shampoo premium", priceRange: "30-80", date: "Toda Semana"},
        {name: "Tosa a Escolha", type: "Tosa", details: "Tosa a escolha do cliente", priceRange: "20-100", date: "Toda Semana"}
      ]
  	};
  	this.results = this.sts.length;
  }

  selectOrder(){
  	let order = this.alertCtrl.create({
      title: 'Ordenar',
      message: "Escolha a forma de ordenar",
      inputs: [
        {
          type: 'radio',
          label: 'Alfabética Crescente',
          value: '1'
        },
        {
        	type: 'radio',
          label: 'Alfabética Decrescente',
          value: '2'
        },
        {
        	type: 'radio',
          label: 'Total Avaliações Crescente',
          value: '3'
        },
        {
        	type: 'radio',
          label: 'Total Avaliações Decrescente',
          value: '4'
        },
        {
        	type: 'radio',
          label: 'Média Avaliações Crescente',
          value: '5'
        },
        {
        	type: 'radio',
          label: 'Média Avaliações Decrescente',
          value: '6'
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
          text: 'Ordenar',
          handler: (data: string) => {
            this.orderToggle( data );
          }
        }
      ]
    });
    order.present();
  }

  showStore(store: StoreInterface){
    this.navCtrl.push('StoreOptionsPage', {
      storeData: store
    });
  }

  orderToggle(option: string ){
  	if( option ==='1'){
  		this.sort.name.toggle = true;
  		this.sort.meanRatings.toggle = false;
  		this.sort.totalRatings.toggle = false;

  		this.sort.name.asc = true;
  		this.sort.name.dsc = false;
  	}
  	else if(option ==='2'){
  		this.sort.name.toggle = true;
  		this.sort.meanRatings.toggle = false;
  		this.sort.totalRatings.toggle = false;

  		this.sort.name.asc = false;
  		this.sort.name.dsc = true;
  	}
  	else if(option ==='3'){
  		this.sort.name.toggle = false;
  		this.sort.meanRatings.toggle = false;
  		this.sort.totalRatings.toggle = true;

  		this.sort.totalRatings.asc = true;
  		this.sort.totalRatings.dsc = false;
  	}
  	else if(option ==='4'){
  		this.sort.name.toggle = false;
  		this.sort.meanRatings.toggle = false;
  		this.sort.totalRatings.toggle = true;

  		this.sort.totalRatings.asc = false;
  		this.sort.totalRatings.dsc = true;	
  	}
  	else if(option ==='5'){
  		this.sort.name.toggle = false;
  		this.sort.meanRatings.toggle = true;
  		this.sort.totalRatings.toggle = false;

  		this.sort.meanRatings.asc = true;
  		this.sort.meanRatings.dsc = false;
  	}
  	else if(option ==='6'){
  		this.sort.name.toggle = false;
  		this.sort.meanRatings.toggle = true;
  		this.sort.totalRatings.toggle = false;

  		this.sort.meanRatings.asc = false;
  		this.sort.meanRatings.dsc = true;	
  	}
  	this.sortToggle();
  }

  sortToggle(){
  	if( this.sort.name.toggle ){
  		if( this.sort.name.asc )
		  	this.sts.sort((a,b) => 
  				( a.name > b.name ? 1 : -1 )
  			);
		 	else if( this.sort.name.dsc )
		 		this.sts.sort((a,b) => 
  				( a.name > b.name ? -1 : 1 )
  			);
	  }
	  else if( this.sort.meanRatings.toggle ){
	  	if( this.sort.meanRatings.asc )
		  	this.sts.sort((a,b) => 
  				( a.meanRating > b.meanRating ? 1 : -1 )
  			);
		 	else if( this.sort.meanRatings.dsc )
		 		this.sts.sort((a,b) => 
  				( a.meanRating > b.meanRating ? -1 : 1 )
  			);
	  }
	  else if( this.sort.totalRatings.toggle ){
	  	if( this.sort.totalRatings.asc )
		  	this.sts.sort((a,b) => 
  				( a.totalRatings > b.totalRatings ? 1 : -1 )
  			);
		 	else if( this.sort.totalRatings.dsc )
		 		this.sts.sort((a,b) => 
  				( a.totalRatings > b.totalRatings ? -1 : 1 )
  			);
	  }
  }

  toggleMap(){
  	this.maps = !this.maps;
  	/*if( this.map != undefined )
  		this.map.remove();
  	if( this.maps )
  		this.showMap();*/
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

  setAllTabs(){
  	this.tabs.cons = false;
  	this.tabs.exam = false;
  	this.tabs.bath = false;
  	this.tabs.tosa = false;
  }

  toggleCons(){
  	//this.setAllTabs();
  	this.tabs.cons = !this.tabs.cons;
  }

  toggleExam(){
  	//this.setAllTabs();
  	this.tabs.exam = !this.tabs.exam;	
  }

  toggleBath(){
  	//this.setAllTabs();
  	this.tabs.bath = !this.tabs.bath;	
  }

  toggleTosa(){
  	//this.setAllTabs();
  	this.tabs.tosa = !this.tabs.tosa;	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
