import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
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
import { BaseRestService } from './base-rest-service';


var headers: Headers;
headers = new Headers({ 'Content-Type': 'application/json' });

const options = new RequestOptions({
  method: RequestMethod.Post,
  headers: headers,
});

@Injectable()
export class LoginService {

  private userUrl: string = "http://localhost:53213/PicVetAuth/Service/User";
  private appId: string = "43491601-3d26-4b77-8774-13b5a5359233";
  private url;
  private petOwnerServicePromisse;
  private petOwnerService;
  private authUserResponse: any;

  constructor(private http: Http, private storage: Storage, public baseRestService: BaseRestService) {
    this.url = this.baseRestService.url.petServiceUrl;
    this.petOwnerServicePromisse = this.baseRestService.DataService<any>(this.url);
  }

  CreateUser(user: any) {


    this.CreateUserAuth(user)
      .subscribe(data => {
        this.authUserResponse = data;
      },
        (error) => {
          console.log("error: " + error);
        });

        console.log(this.authUserResponse);
  }

  private CreateUserAuth(user: any) {
    return this.http.post(`${this.userUrl}/${this.appId}/Create`, this.BuildCreateUserRequest(user), options)
      .map((data: Response) => { data.json() })
      .catch((error: Response) => {
        return Observable.throw(error.status);
      });
  }

  private CreatePetOwner(list, self) {
    console.log("Create Pet Owner");
    let authResponse = list[0];
    let user = list[1];

    console.log(self.BuildCreatePetOwner(authResponse, user));
    console.log(self.petOwnerService);
    console.log("Create Pet Owner - FINAl");
  }

  Login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post(`${this.userUrl}/${this.appId}/Login`, this.BuildLoginRequest(email, password), options)
      .map((data: Response) => data.json())
      .catch((error: Response) => {
        return Observable.throw(error.status);
      });
  };

  Logout(): any {
    return this.getStorageValue('token', this.ExecuteLogoutRequest);
  };

  private ExecuteLogoutRequest(val, scope): Observable<LogoutResponse> {
    return scope.http.get(`${scope.userUrl}/${scope.appId}/Logout?logoutRequest.token=${val}`)
      .map((data: Response) => data.json())
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  private async getStorageValue(key: string, callback) {
    const result = await this.storage.get(key);

    return new Promise((resolve, reject) => {
      callback(result, this).subscribe(
        data => {
          resolve(data.loggedOut);
        },
        error => {
          resolve(false);
        })
    });
  };

  private BuildLoginRequest(email: string, password: string): LoginRequest {
    return {
      email: email,
      password: password
    }
  };

  private BuildCreateUserRequest(user: any) {
    return {
      Name: user.name,
      Email: user.email,
      Password: user.password
    };
  }

  private BuildCreatePetOwner(authResponse: any, user: any) {
    return {
      name: user.name,
      cpf: user.cpf,
      userId: authResponse.id
    };
  }

  private ExecuteCallbackThenResolved(callback, list) {
    this.petOwnerServicePromisse.then(
      (val) => {
        this.petOwnerService = val;
        callback(list, this);
        return true;
      },
      (err) => {
        return false;
      }
    );
  }
}