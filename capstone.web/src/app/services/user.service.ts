// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.BASE_URL;
  private tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) { }
  url = 'https://localhost:7197/api/users';

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.url);
  // }

  // Fetch a single User by id
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  // Add a new User
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // Update an existing User
  updateUser(user: User ): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  // Delete a User by id
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

}
