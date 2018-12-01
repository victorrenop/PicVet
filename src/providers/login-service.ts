import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { LoginRequest } from '../models/AuthRequest/login.request';
import { LoginResponse } from '../models/AuthResponse/login.response';
import { LogoutResponse } from '../models/AuthResponse/logout.response';

import { Storage } from '@ionic/storage';


var headers: Headers;
headers = new Headers({'Content-Type': 'application/json'});

const options = new RequestOptions({
  method: RequestMethod.Post,
  headers: headers,
});

@Injectable()
export class LoginService {

  //MOVE TO CONFIG FILE
  private userUrl: string = "https://picvetauth.azurewebsites.net/User";
  private appId: string = "5e0dd296-abed-4da8-a674-b5e705bd91fa";

  constructor(private http: Http, private storage: Storage) {
    
  }
  
  Login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post(`${this.userUrl}/${this.appId}/Login`, this.BuildLoginRequest(email, password), options)
        .map((data: Response) => data.json())
        .catch((error: Response) => {
        return Observable.throw(error.status);
       });
  };

  BuildLoginRequest(email: string, password: string): LoginRequest {
      return {
        email: email,
        password: password
      }
  };

  ExecuteRequest(val, scope):  Observable<LogoutResponse>
  {
      return scope.http.get(`${scope.userUrl}/${scope.appId}/Logout?logoutRequest.token=${val}`)
           .map((data: Response) => data.json())
           .catch ((err: Response) => {
              return Observable.throw(err);
           });
  }

  async getStorageValue(key: string, callback)
  {
      const result  = await this.storage.get(key);
       
      return new Promise((resolve, reject) => {
        callback(result, this).subscribe(
          data =>{
              resolve(data.loggedOut);
          },  
          error =>{
            resolve(false);
          })
      });
  };

  Logout() : any {
      return this.getStorageValue('token', this.ExecuteRequest);
  };

}