import { Component , OnInit } from '@angular/core';
import { Priority } from '../models/priority';
import { PriorityService } from '../services/priority.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrl: './priority-list.component.css'
})
export class PriorityListComponent implements OnInit{
  prioritys: Priority[] = []; // Array to hold list of persons
  
 
    constructor(
      private priorityService: PriorityService,
      private router: Router
    ) {}
  
  ngOnInit(){
       // Fetch Prioritys on component initialization
       this.priorityService.getPrioritys().subscribe((data) => {
        this.prioritys = data;
        console.log(data);
      });
  }

  // Navigate to Priority details component
  viewPriority(id: number) {
    this.router.navigate(['/priority', id]);
  }

  // Navigate to new Priority form
  addPriority() {
    this.router.navigate(['/priority']);
  }
  goBack() {
    this.router.navigate(['/']);
  }

 
}
