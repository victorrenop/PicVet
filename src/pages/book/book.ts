import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import { BaseRestService } from '../../providers/base-rest-service';
import { Book } from '../../models/PicVetAppResponse/book.interface';

declare var L: any;

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  pos: any;

    private user: UserNoPwd;
    private books: any[] = [];
    private bookService;
    private url;

  constructor(public navCtrl: NavController, public baseRestService: BaseRestService, public navParams: NavParams) {
      this.url = this.baseRestService.url.bookServiceUrl;
      var bookServicePromisse = this.baseRestService.DataService<Book>(this.url);

      bookServicePromisse.then(
        (val) => { 
          this.bookService = val
          this.loadBooks();
        },
        (err) => console.error(err)
      );
  }

  loadBooks()
  {
    this.bookService.get()
      .subscribe(data =>{  
          let i = 0;
          for( let p in data ){
            this.books[i] = data[i]
            i++;
          }
        },
      (error) => {
        console.log("error: "+ error);
      });
  };

  onSelect(item)
  {
    this.navCtrl.push('LogPage', {
      book: item
    });
  }
}
