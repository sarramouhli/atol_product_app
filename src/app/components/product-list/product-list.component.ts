import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductElement } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductCreateComponent } from '../product-create/product-create.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'product-list-coponent',
  styleUrls: ['product-list.component.css'],
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'name',
    'type',
    'price',
    'rating',
    'warranty_years',
    'available',
    'action'
  ];

  dataSource;
  currentElement;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    public productService: ProductService
  ) {}
  ngOnInit() {
    this.productService.readAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource<ProductElement>(result);
      this.dataSource.paginator = this.paginator;
    });
  }
  openDialogEdit(data, index): void {
    this.currentElement = index;
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '500px',
      data: data
    });

    dialogRef.beforeClosed().subscribe((result) => {
      this.dataSource.data[this.currentElement] = result;
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '500px'
    });

    dialogRef.beforeClosed().subscribe((result) => {
      this.dataSource.data.push(result);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }

  deleteProduct(element) {
    if (element && element._id > -1) {
      const index = this.dataSource.data.findIndex(
        (e) => e._id === element._id
      );
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }
}
