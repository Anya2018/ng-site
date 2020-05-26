import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class SalesDataService{

    constructor(private _http: Http) { }

    getOrders(pageIndex: number, pageSize: number) {
        return this._http.get('http://localhost:41794/api/order/' + pageIndex + '/' + pageSize)
        .map(res => res.json());
        //.pipe(map(res => res || []));
      }
    
    getOrdersByCustomer(n: number) {
        return this._http.get('http://localhost:41794/api/order/bycustomer/' + n)
        //.pipe(map(res => res || []));
        .map(res => res.json());
      }
    
    getOrdersByState() {
        return this._http.get('http://localhost:41794/api/order/bystate/')
        //.pipe(map(res => res || []));
        .map(res => res.json());
      }
}
