import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';
import { urlToNavGroupStrings } from 'ionic-angular/umd/navigation/url-serializer';

var headers: Headers;
headers = new Headers({ 'Content-Type': 'application/json' });

const options = new RequestOptions({
  method: RequestMethod.Post,
  headers: headers,
});


@Injectable()
export class BaseRestService {

    private localBaseUrl: string = "http://localhost:51121/PicVetAPI/Service";
    private mockBaseUrl: string = "http://localhost:3000";

    constructor(public http: Http, public storage: Storage) {
    }

    public url = {
        petOwnerUrl: this.localBaseUrl + '/PetOwner',
        petServiceUrl: this.localBaseUrl + '/Pet',
        bookServiceUrl: this.mockBaseUrl + '/book',
        bookLogServiceUrl: this.mockBaseUrl + '/bookLog',
    };

    async getStorageValue<T>(key: string, url: string) : Promise<any> {

        var self = this;

        const token = await this.storage.get(key);

        let headers = new Headers();
        headers.append('Token', JSON.stringify(token));
        headers.append('Content-Type', 'application/json');

        var requestFunctions = {
            get: function (data: any, customUrl): Observable<T> {

                if (customUrl)
                {
                    if(!url.includes(customUrl))
                    {
                        url += customUrl;
                    }                    
                }
                
                return self.http.get(url, { headers: headers })
                    .map((data: Response) => data.json())
                    .catch((err: Response) => {
                        return Observable.throw(err);
                    });
            },
            save: function (entity, parameters, forcePost) {
                    
            },
            insert: function (entity, name, parameters) {

            },
            update: function (entity, name, parameters) {

            },
            delete: function (data) {

            },
            list: function (parameters, data) {

            },
            listPaged: function (currentPage, pageSize, parameters, data, action) {

            },
            search: function (currentPage, pageSize, parameters, data) {

            },
            post: function (data, customUrl) {

                if (customUrl)
                {
                    if(!url.includes(customUrl))
                    {
                        url += customUrl;
                    }                    
                }

                return self.http.post(`${url}`, data, options);
            },
            reorder: function (entity, parameters) {

            }
        };

        return new Promise((resolve, reject) =>{
                resolve(requestFunctions);
        });
    };

    public DataService<T>(url): Promise<any> {
       return this.getStorageValue<T>("token", url);
    }
}

