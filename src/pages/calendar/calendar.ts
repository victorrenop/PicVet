import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';
import { Calendar } from '@ionic-native/calendar';
import { ServiceInterface } from '../../models/service.interface';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

	private date: any;
	private daysInThisMonth: any;
	private daysInLastMonth: any;
	private daysInNextMonth: any;
	private monthNames: string[];
	private currentMonth: any;
	private currentYear: any;
	private currentDate: any;
	private eventList: any;
  private selectedEvent: any;
  private isSelected: any;
  private eventDates: any[];
  private events: ServiceInterface[];
  private selectedEvents: ServiceInterface[];
  private selectedDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    this.eventDates = [];
    this.events = [{
      name: "Banho e Tosa",
      type: "",
      details: "Banho completo com shampoo e tosa higienica",
      priceRange: "",
      date: "17 de Novembro"
    },
    {
      name: "Consulta Pet",
      type: "",
      details: "Consulta e exames para o pet",
      priceRange: "",
      date: "21 de Novembro"
    },
    {
      name: "Cirurgia Pet",
      type: "",
      details: "Castracao de Pet",
      priceRange: "",
      date: "8 de Outubro"
    }
    ];
    this.getDaysOfMonth();
    this.selectedDate = this.currentMonth;
    this.getEventDates();
    //this.loadEventThisMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
    this.checkEventMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
    this.checkEventMonth();
  }

  getEventDates(){
    this.eventDates = [];
    this.selectedEvents = [];
    let date = this.selectedDate.split(" ", 3);
    this.events.forEach( (element) => {
      let str = element.date.split(" ", 3);
      if( str[2] == this.currentMonth ){
        this.eventDates.push(+str[0]);
        if ( date.length > 2 ){
          if( date[0] == str[0] ){
            this.selectedEvents.push(element);
          }
        }
        else{
          this.selectedEvents.push(element);
        }
      }
    });
  }

  eventsInMonth(){
    return this.eventDates.length > 0;
  }

  checkEventMonth(){
    this.selectedDate = this.currentMonth;
    this.getEventDates();
  }

  checkEventDay( day: any ){
    this.selectedDate = day + " de " + this.currentMonth;
    this.getEventDates();
  }

}