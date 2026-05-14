import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private url = "https://localhost:7197/api/statuses"; // URL to the JSON server

  constructor(private http: HttpClient) { }

  // Fetch the list of Statuses
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.url);
  }

  // Fetch a single Status by id
  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.url}/${id}`);
  }

  // Add a new Status
  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.url, status);
  }

  // Update an existing Status
  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.url}/${status.statusId}`, status);
  }

  // Delete a Status by id
  deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
