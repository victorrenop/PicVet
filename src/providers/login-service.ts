import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from '../models/user.interface';

@Injectable()
export class LoginService{
	private baseUrl: string = "http://localhost:3000/user";
	private user: User;

	 constructor(private http: Http) {
  }

	getUserInformation(username: string): Observable<User>{
  	return this.http.get(`${this.baseUrl}/${username}`)
  		.map((data: Response) => data.json())
  		.catch((error: Response) => {
        return Observable.throw(error.status);
    });
  }

  parseUserInformation(username: string): void{
  	this.getUserInformation(username).subscribe(
      (data: User) => this.user = data,
      err => {
        return Observable.throw(err);
      });
  }

}