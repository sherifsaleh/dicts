import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getDicts(): Observable<any> {
    return this.http.get('/api/dicts').map(res => res.json());
  }
  getSchemas(): Observable<any> {
    return this.http.get('/api/schemas').map(res => res.json());
  }

  countDicts(): Observable<any> {
    return this.http.get('/api/dicts/count').map(res => res.json());
  }

  addDict(dict): Observable<any> {
    return this.http.post('/api/dict', JSON.stringify(dict), this.options);
  }

  getDict(dictId): Observable<any> {
    return this.http.get(`/api/dict/${dictId}`, this.options);
  }

  editDict(dict): Observable<any> {
    return this.http.put(`/api/dict/${dict._id}`, JSON.stringify(dict), this.options);
  }

  deleteDict(dict): Observable<any> {
    return this.http.delete(`/api/dict/${dict._id}`, this.options);
  }

}
