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

  // VARIAVEIS PARA FILTRO DE PESQUISA

  private storeName: string;
  private storeLocation:  string;
  private storeDate: string;
  // FILTRO POR CONSULTA, EXAME, BANHO E TOSA
  private tabs = {
    cons: false,
    exam: false,
    bath: false,
    tosa: false
  };

	private user: UserNoPwd;
	private sort = {
		name: { toggle: true, asc: true, dsc: false},
		meanRatings: { toggle: false, asc: true, dsc: false},
		totalRatings: { toggle: false, asc: true, dsc: false}
	};
	private results: number;
	private sts: StoreInterface[] = [];
  private selected: StoreInterface[] = [];



  private maps: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private geolocation: Geolocation) {
  	this.user = this.navParams.get('userData');
    this.storeLocation = "";
    this.storeDate = "";
    this.storeName = "";
  	this.maps = false;
  	this.sts[0] = {
  		address: "Rua Barao, 25, Centro",
  		name: "PETVET",
  		logo: "../../assets/imgs/random.jpg",
  		totalRatings: 150,
  		meanRating: 4.5,
      open: "Segunda a Sexta",
      types:[
        "Exames",
        "Consultas",
      ],
      services:[
        {name: "Exame do Pet", type: "Exames", details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting", priceRange: "100-150", date: "Segunda a Sexta"},
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
        "Exames",
        "Consultas",
        "Banho",
        "Tosa"
      ],
      services:[
        {name: "Exame do Pet", type: "Exames", details: "Exame com o a escolha de horario e medico", priceRange: "50-150", date: "Terca a Sexta"},
        {name: "Consulta Especializada", type: "Consultas", details: "Consulta para diversos tipos de problemas", priceRange: "100-150", date: "Terca a Sexta"},
        {name: "Banho Completo", type: "Banho", details: "Banho com direito a shampoo premium", priceRange: "30-80", date: "Toda Semana"},
        {name: "Tosa a Escolha", type: "Tosa", details: "Tosa a escolha do cliente", priceRange: "20-100", date: "Toda Semana"}
      ]
  	};

    this.sts[2] = {
      address: "Avenida Orual Salvador, 590, Jd. Sta. Maria",
      name: "Walking With Dogs",
      logo: "../../assets/walk.png",
      totalRatings: 137,
      meanRating: 4.2,
      open: "Terca a Domingo",
      types:[
        "Exames",
        "Consultas",
        "Banho",
        "Tosa"
      ],
      services:[
        {name: "Exame do Pet", type: "Exames", details: "Exame com o a escolha de horario e medico", priceRange: "50-150", date: "Terca a Sexta"},
        {name: "Consulta Especializada", type: "Consultas", details: "Consulta para diversos tipos de problemas", priceRange: "100-150", date: "Terca a Sexta"},
        {name: "Banho Completo", type: "Banho", details: "Banho com direito a shampoo premium", priceRange: "30-80", date: "Toda Semana"},
        {name: "Tosa a Escolha", type: "Tosa", details: "Tosa a escolha do cliente", priceRange: "20-100", date: "Toda Semana"}
      ]
    };

    this.sts[3] = {
      address: "Avenida Oscar Bagatini, 501, Parque Brasil",
      name: "Pet Center",
      logo: "../../assets/center.png",
      totalRatings: 137,
      meanRating: 4.7,
      open: "Segunda a Sexta",
      types:[
        "Banho",
        "Tosa"
      ],
      services:[
        {name: "Banho Completo", type: "Banho", details: "Banho com direito a shampoo premium", priceRange: "30-80", date: "Toda Semana"},
        {name: "Tosa a Escolha", type: "Tosa", details: "Tosa a escolha do cliente", priceRange: "20-100", date: "Toda Semana"}
      ]
    };


    this.sts[4] = {
      address: "Rua Denise, 47, Centro",
      name: "Dogs Dream",
      logo: "../../assets/dream.png",
      totalRatings: 82,
      meanRating: 3.9,
      open: "Segunda a Sabado",
      types:[
        "Banho",
        "Tosa"
      ],
      services:[
        {name: "Banho Completo", type: "Banho", details: "Banho com direito a shampoo premium", priceRange: "30-80", date: "Toda Semana"},
        {name: "Tosa a Escolha", type: "Tosa", details: "Tosa a escolha do cliente", priceRange: "20-100", date: "Toda Semana"}
      ]
    };

    this.results = this.sts.length;
    this.selected = this.sts;
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

 
	
  setAllTabs(){
  	this.tabs.cons = false;
  	this.tabs.exam = false;
  	this.tabs.bath = false;
  	this.tabs.tosa = false;
  }

  toggleCons(){
  	this.tabs.cons = !this.tabs.cons;
  }

  toggleExam(){
  	this.tabs.exam = !this.tabs.exam;	
  }

  toggleBath(){
  	this.tabs.bath = !this.tabs.bath;	
  }

  toggleTosa(){
  	this.tabs.tosa = !this.tabs.tosa;	
  }

  search(){

    let i =0;
    this.selected = [];
    if( this.storeName ){
      for( let p in this.sts ){
        if( this.sts[i].name === this.storeName ){
          this.selected.push(this.sts[i]);
        }
        i++;
      }
    }
    else{
      this.selected = this.sts;
    }

    console.log( this.storeDate);
    console.log( this.storeName);
    console.log( this.storeLocation);
    console.log( this.tabs.cons);
    console.log( this.tabs.exam);
    console.log( this.tabs.bath);
    console.log( this.tabs.tosa);
  }

}
