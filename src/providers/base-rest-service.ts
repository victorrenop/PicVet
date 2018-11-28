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


@Injectable()
export class BaseRestService {

    private localBaseUrl: string = "http://localhost:53213";
    private mockBaseUrl: string = "http://localhost:3000";

    constructor(public http: Http, public storage: Storage) {
    }

    public url = {
        petServiceUrl: this.mockBaseUrl + '/pet',
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
            get: function (data: any): Observable<T> {

                let customUrl;

                if (data)
                {
                    customUrl = url + "/" + data.id;
                }else
                {
                    customUrl = url;
                }
                
                return self.http.get(customUrl, { headers: headers })
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
            post: function (data) {

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

