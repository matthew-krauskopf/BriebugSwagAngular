import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Product[];
  selectedProduct : Product = {} as Product;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect(product : Product) : void {
    this.selectedProduct = product;
  }

  addProduct(name : String, cost : String, stock : String) : void {
   name = name.trim();
   if (!name || !cost || !stock) return;
   var new_product:Product = {name: name, cost: Number(cost), stock: Number(stock)} as Product;
   this.productService.addProduct(new_product).subscribe(p => this.products.push(p));
  }

  deleteThis(product : Product) : void {
    this.selectedProduct = {} as Product;
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }

  getProducts() : void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
