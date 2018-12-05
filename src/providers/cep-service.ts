import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { CepInterface } from '../models/cep.interface';

@Injectable()
export class CepService {

  private cepUrl: string = "https://viacep.com.br/ws";
  private rType: string = "json";

  constructor(private http: Http) {
    
  }
  
  GetCep(cep: string): Observable<CepInterface> {
        return this.http.get(`${this.cepUrl}/${cep}/${this.rType}`)
        .map((data: Response) => data.json())
           .catch ((err: Response) => {
              return Observable.throw(err);
           });
  };

  ReturnAddress(cep: string): CepInterface{
    let add: CepInterface;
    this.GetCep(cep).subscribe((data: CepInterface) => {
      add = data;
      console.log(add);
    });
    return add;
  }

}