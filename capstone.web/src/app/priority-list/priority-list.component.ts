import { Component , OnInit } from '@angular/core';
import { Priority } from '../models/priority';
import { PriorityService } from '../services/priority.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-priority-list',
    templateUrl: './priority-list.component.html',
    styleUrl: './priority-list.component.css',
    standalone: false
})
export class PriorityListComponent implements OnInit{
  prioritys: Priority[] = []; // Array to hold list of persons
  displayedColumns: string[] = ['name', 'dateCreated' , 'action','actiondelete'];
  
 
    constructor(
      private priorityService: PriorityService,
      private router: Router
    ) {}
  
  ngOnInit(){
       // Fetch Prioritys on component initialization
       this.priorityService.getPrioritys().subscribe((data) => {
        this.prioritys = data;
      });
  }

  // Navigate to Priority details component
  viewPriority(id: number) {
    this.router.navigate(['/priority', id]);
  }
  deletePriority(id: number) {
    if (confirm('Are you sure you want to delete this priority?')) {
      this.priorityService.deletePriority(id).subscribe(() => {
        this.prioritys = this.prioritys.filter(priority => priority.priorityId !== id);
      });
    }
  }
  // Navigate to new Priority form
  addPriority() {
    this.router.navigate(['/priority']);
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

 
}
