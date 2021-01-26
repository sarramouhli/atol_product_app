import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product = {
    _id: '',
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false
  };
  submitted = false;

  constructor(private productService: ProductService, public dialogRef: MatDialogRef<ProductCreateComponent>) { }

  ngOnInit(): void {
  }

  createProduct(data): void {

    this.productService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.product = response;
        },
        error => {
          console.log(error);
        });
  }

  onNoClick() {

  }

}