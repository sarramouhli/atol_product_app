import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductElement } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  currentData: any;
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductElement,
    public productService: ProductService
  ) {
    this.currentData = { ...data };
  }
  saveUpadate(data) {
    this.productService.update(data._id, data).subscribe((result) => {
      console.log(result);
    });
  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'close', data: this.currentData });
  }
}
