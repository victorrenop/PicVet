import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { Pets } from '../models/pet.interface';

@Injectable()
export class PetService{
	private baseUrl: string = "http://localhost:3000/pet";
	private pet: Pets;

	 constructor(private http: Http) {
  }

  public getPetInformation(): Observable<Pets> {
    return this.http.get(this.baseUrl)
      .map( (data: Response) => data.json())
      //.toPromise()
      //.then((response) => {
      //  return response.json();
      //})
      .catch ((err: Response) => {
        return Observable.throw(err);
      });
  }
}