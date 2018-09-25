import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import { map, filter, switchMap } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class CloudObjectsService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
    .map(result => this.result = result.json().data);
  }
}
