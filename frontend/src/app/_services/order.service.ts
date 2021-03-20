import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/order/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    return this.http.get(AUTH_API, httpOptions);
  }

  create(data?:any): Observable<any> {
    return this.http.post(AUTH_API, data);
  }

  findOne(id?:any): Observable<any> {

    return this.http.get(`${AUTH_API}${id}`);
  }

  update(id?:any, data?:any): Observable<any> {
    return this.http.put(`${AUTH_API}${id}`, data);
  }

  delete(id?:any): Observable<any> {
    return this.http.delete(`${AUTH_API}${id}`);
  }

  searchByDate(data?:any): Observable<any> {
    return this.http.get(`${AUTH_API}search?filter=${data}`);
  }
}