import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';

export const routes: Routes = [
  { path: '', component: ProductList },   // Show product list at root
  // you can keep other routes if any
];
