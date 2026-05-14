import { Component , OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css',
    standalone: false
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = []; // Array to hold list of categories
  displayedColumns: string[] = ['name', 'dateCreated' , 'action','actiondelete'];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    // Fetch Categories on component initialization
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Navigate to Category details component
  viewCategory(id: number) {
    this.router.navigate(['/category', id]);
  }
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(category => category.categoryId !== id);
      });
    }
  }
  // Navigate to new Category form
  addCategory() {
    this.router.navigate(['/category']);
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

 
}
