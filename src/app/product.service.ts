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

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
      //.pipe(catchError(this.handleError<Product[]>('getProducts', [])));
  }

  addProduct(product : Product) : Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product)
      .pipe(tap((newProduct: Product) => console.log(`Product added: id=${newProduct.id}`)),
        catchError(this.handleError<Product>("Add product error")));
  }

  deleteProduct(product : Product) : Observable<Product> {
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
