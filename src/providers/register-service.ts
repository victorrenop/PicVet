import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from '../models/user.interface';

@Injectable()
export class RegisterService{
	private baseUrl: string = "http://localhost:3000/user";
	private user: User;
	private headers: Headers;
	private requestOptions: RequestOptions;

	constructor(private http: Http) { 
		//this.headers.append("Accept", 'application/json');
		//this.headers.append('Content-Type', 'application/json');
	}

	postUserInformation(user: User){
		/*this.http.post(this.baseUrl, user,
		{
			headers: {
			{
				'Accept', 'application.json'
			},
			{'Content-Type': 'application/json'} 
		}
		})
		.map(data => data.json())
		.catch( error =>{
			console.log(error);
		});*/
	}
}