import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "https://localhost:7197/api/categories"; // URL to the JSON server

  constructor(private http: HttpClient) { }

  // Fetch the list of Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  // Fetch a single Category by id
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  // Add a new Category
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  // Update an existing Category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${category.categoryId}`, category);
  }

  // Delete a Category by id
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}



