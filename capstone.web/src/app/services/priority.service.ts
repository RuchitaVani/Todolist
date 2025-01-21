import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Priority } from '../models/priority';
@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  constructor(private http: HttpClient) { }
  url = 'https://localhost:7197/api/priorities';
    // Fetch the list of Seller
    getPrioritys(): Observable<Priority[]> {
      return this.http.get<Priority[]>(this.url);
    }
  
    // Fetch a single Priority by id
    getPriority(id: number): Observable<Priority> {
      return this.http.get<Priority>(`${this.url}/${id}`);
    }
  
    // Add a new Priority
    addPriority(priority: Priority): Observable<Priority> {
      return this.http.post<Priority>(this.url, priority);
    }
  
    // Update an existing Priority
    updatePriority(priority: Priority ): Observable<Priority> {
      return this.http.put<Priority>(`${this.url}/${priority.priorityId}`, priority);
    }
  
    // Delete a Priority by id
    deletePriority(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }
  }

