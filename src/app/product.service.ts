import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Product } from './product';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = '/api/products/';

  products! : Product[];

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
      //.pipe(catchError(this.handleError<Product[]>('getProducts', [])));
  }

  deleteProduct(product : Product) {
    return this.http.delete<Product>(`${this.productsUrl}/${product.id}`)
      .pipe(catchError(this.handleError<Product>("delete error")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
