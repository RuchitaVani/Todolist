import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { StatusService } from '../services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.css'
})
export class StatusListComponent implements OnInit{
  statuses: Status[] = []; // Array to hold list of statuses
  displayedColumns: string[] = ['name', 'dateCreated' , 'action','actiondelete'];

  constructor(private statusService: StatusService, private router: Router) {}

  ngOnInit() {
    // Fetch Statuses on component initialization
    this.statusService.getStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }

  // Navigate to Status details component
  viewStatus(id: number) {
    this.router.navigate(['/status', id]);
  }
  deleteStatus(id: number) {
    if (confirm('Are you sure you want to delete this status?')) {
      this.statusService.deleteStatus(id).subscribe(() => {
        this.statuses = this.statuses.filter(status => status.statusId !== id);
      });
    }
  }
  // Navigate to new Status form
  addStatus() {
    this.router.navigate(['/status']);
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

 
}
