import { Component, OnInit, Input } from '@angular/core';
import { Product } from "../product";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product!: Product;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {

  }

  update(name : String, cost : String, stock : String) : void {
    this.product.name = (name.trim().length ? String(name) : this.product.name);
    this.product.cost = (cost.trim().length ? Number(cost) : this.product.cost);
    this.product.stock = (stock.trim().length ? Number(stock) : this.product.stock);
    this.productService.updateProduct(this.product).subscribe();
  }
}
