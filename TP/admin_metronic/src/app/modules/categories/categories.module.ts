import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddNewCategorieComponent } from './add-new-categorie/add-new-categorie.component';
import { EditNewCategorieComponent } from './edit-new-categorie/edit-new-categorie.component';
import { DeleteNewCategorieComponent } from './delete-new-categorie/delete-new-categorie.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';


@NgModule({
  declarations: [CategoriesComponent, AddNewCategorieComponent, EditNewCategorieComponent, DeleteNewCategorieComponent, ListCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
