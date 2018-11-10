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
export class BaseRestService
{

  private serverBaseUrl: string = "https://picvetauth.azurewebsites.net/";
  private localBaseUrl: string = "http://localhost:53213/";
  private mockBaseUrl: string = "http://localhost:3000";
  
  constructor(private http: Http){
  }
  
  public url = {
      petServiceUrl: this.mockBaseUrl + '/pet',
  };

  public DataService<T>(url) : any {
           let functions = {
            get: function() : Observable<T>{
                console.log(this.http);

                return this.http.get(this.baseUrl)
                .map((data: Response) => data.json())
                .catch ((err: Response) => {
                    return Observable.throw(err);
                });

            },
            save: function(entity, parameters, forcePost){

            },
            insert: function(entity, name, parameters){
             
            },
            update: function(entity, name, parameters){
              
            },
            delete: function(data){
            
            },
            list: function(parameters, data){
              
            },
            listPaged: function(currentPage, pageSize, parameters, data, action) {
            
            },
            search: function(currentPage, pageSize, parameters, data) {
                
            },
            post: function(data){
              
            },
            reorder: function(entity, parameters){

            }
        };

        return functions;
  }
}

