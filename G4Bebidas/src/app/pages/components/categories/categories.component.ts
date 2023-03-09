import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category;
  categories: Category[] = [];
  size: number;
  response: any;
  error: any;
  displayCreateCategory: boolean;
  displayUpdateCategory: boolean;
  listingCategories: boolean;
  categoryForm: FormGroup;
  selectedCategory: any;
  listingCategory: boolean;


  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {
    this.category = new Category();
    this.listingCategory = true;
  }

  ngOnInit(): void {
    this.getCategories();
    this.listingCategories = true;
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null]
    }
    )
  }

  postCategory() {
    let category = new Category;
    category.name = this.categoryForm.value.name;
    category.description = this.categoryForm.value.description;
    category.active = true;
    this.categoryService.postCategory(category).subscribe({
      next: (response) => {
        this.displayCreateCategory = false;
        this.getCategories();
      },
      error: (error) => this.error = error,
    });

  }
  showDialogCreateCategory() {
    this.displayCreateCategory = true;
  }

  onSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
          this.categories = this.categories.filter(category => category.active == true);
          this.size = this.categories.length;
        },
        error: (error) => this.error = error
      });
  }

  putCategory() {
    this.category.name = this.categoryForm.value.name;
    this.category.description = this.categoryForm.value.description;
    this.categoryService
      .putCategory(this.category)
      .subscribe({
        next: (response) => {
          this.displayUpdateCategory = false;
          this.getCategories();
        },
        error: (error) => this.error = error
      });
  }

  showDialogUpdateCategory(category: Category) {
    this.category = category;
    this.displayUpdateCategory = true;
    this.categoryForm = this.formBuilder.group({
      name: [category.name],
      description: [category.description]
    }
    )
  }

  deleteCategory(category: Category) {
    this.category = category;
    this.category.active = false;
    this.putCategory();
  }
}


