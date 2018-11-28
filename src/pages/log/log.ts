import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { BaseRestService } from '../../providers/base-rest-service';
import { Book } from '../../models/PicVetAppResponse/book.interface';
import { BookLog } from '../../models/PicVetAppResponse/book-log.interface';

@IonicPage()
@Component({
    selector: 'page-log',
    templateUrl: 'log.html',
})
export class LogPage {
    @ViewChild('map') mapRef: ElementRef;
    map: any;
    pos: any;

    private book: Book;
    private logs: any[] = [];
    private logService;
    private url;

    constructor(public navCtrl: NavController, public baseRestService: BaseRestService, public navParams: NavParams) {

        this.book = this.navParams.get('book');

        this.url = this.baseRestService.url.bookLogServiceUrl;
        var logServicePromisse = this.baseRestService.DataService<BookLog>(this.url);

        logServicePromisse.then(
            (val) => {
                this.logService = val
                this.loadLogs();
            },
            (err) => console.error(err)
        );

    }


    loadLogs() {

        console.log(this.book);

        this.logService.get(this.book)
            .subscribe(data => {
                let i = 0;
                for (let p in data) {
                    this.logs[i++] = data
                }
            },
                (error) => {
                    console.log("error: " + error);
                });
    }
}