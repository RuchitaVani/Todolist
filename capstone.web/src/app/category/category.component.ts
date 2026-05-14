import { Component , OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
    standalone: false
})
export class CategoryComponent implements OnInit  {

  category: Category = {
    categoryId: 0,
    name: '',
    dateCreated: new Date(),
    isDeleted: false,
};
constructor(
  private route: ActivatedRoute,
  private categoryService: CategoryService,
  private router: Router
) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap?.get('id'); // Get category id from route
  if (id) {
    // Fetch category details if id exists
    this.categoryService.getCategory(parseInt(id)).subscribe(data => {
      this.category = data;
      console.log(this.category)

    });
  }
}

saveCategory() {
  if (this.category.categoryId) {
    this.categoryService.updateCategory(this.category).subscribe(() => {
      this.goBack();
    });
  } else {
    this.categoryService.addCategory(this.category).subscribe(() => {
      this.goBack();
    });
  }
}



deleteCategory() {
  if (this.category.categoryId) {
    this.categoryService.deleteCategory(this.category.categoryId).subscribe(() => {
      this.goBack();
    }, error => {
      console.error('Error deleting category:', error);
      // Handle error appropriately (e.g., show error message)
    });
  }
}

goBack() {
  this.router.navigate(['/categories']);
}
}

