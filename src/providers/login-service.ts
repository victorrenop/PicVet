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
import { Subject } from 'rxjs/Subject';


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

  constructor(private http: Http, private storage: Storage, public baseRestService: BaseRestService) {
    this.url = this.baseRestService.url.petOwnerUrl;
    this.petOwnerServicePromisse = this.baseRestService.DataService<any>(this.url);
  }

  CreateUser(user: any) {
    var subject = new Subject<string>();
    this.CreateUserAuth(user).subscribe(data => {

      this.petOwnerServicePromisse.then(
        (val) => {
          this.petOwnerService = val;
          this.CreatePetOwner(data.json(), user, this).subscribe((value) => subject.next(value));
        },
        (err) => {
          return false;
        }
      );
    },
      (error) => {
        console.log("error: " + error);
      });

    return subject.asObservable();
  }

  private CreateUserAuth(user: any) {
    return this.http.post(`${this.userUrl}/${this.appId}/Create`, this.BuildCreateUserRequest(user), options);
  }

  private CreatePetOwner(authResponse, user, self) {
    let resource="/Create";
    let petOwner = self.BuildCreatePetOwner(authResponse, user)
    var subject = new Subject<string>();

    self.petOwnerService.post(petOwner, resource).subscribe(data => {
      subject.next(data._body);
    },
      (error) => {
        console.log("error: " + error);
      });

    return subject.asObservable();
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
      CPF: user.cpf,
      userId: authResponse.userId
    };
  }
}