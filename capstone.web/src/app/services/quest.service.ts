import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quest } from '../models/quest';
@Injectable({
  providedIn: 'root'
})
export class QuestService {
  constructor(private http: HttpClient) { }
  url = 'https://localhost:7197/api/quests';
    
    getQuests(): Observable<Quest[]> {
      return this.http.get<Quest[]>(this.url);
    }
  
    
    getQuest(id: number): Observable<Quest> {
      return this.http.get<Quest>(`${this.url}/${id}`);
    }
  
    
    addQuest(quest: Quest): Observable<Quest> {
      return this.http.post<Quest>(this.url, quest);
    }
  
    
    updateQuest(quest: Quest): Observable<Quest> {
      return this.http.put<Quest>(`${this.url}/${quest.questId}`, quest);
    }
  
    
    deleteQuest(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }
  }
