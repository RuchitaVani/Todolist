import { Component , OnInit } from '@angular/core';
import { Priority } from '../models/priority';
import { PriorityService } from '../services/priority.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-priority',
    templateUrl: './priority.component.html',
    styleUrl: './priority.component.css',
    standalone: false
})
export class PriorityComponent implements OnInit  {

  priority: Priority = {
    priorityId: 0,
    name: '',
    dateCreated: new Date(),
    isDeleted: false,
    color: '',
};
constructor(
  private route: ActivatedRoute,
  private priorityService: PriorityService,
  private router: Router
) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap?.get('id'); // Get priority id from route
  if (id) {
    // Fetch priority details if id exists
    this.priorityService.getPriority(parseInt(id)).subscribe(data => {
      this.priority = data;
      console.log(this.priority)

   /*   if(typeof this.priority.dateCreated === "string") {
        this.priority.dateCreated = this.priority.dateCreated.split('T')[0];
      } */
    });
  }
}

savePriority() {
  if (this.priority.priorityId) {
    this.priorityService.updatePriority(this.priority).subscribe(() => {
      this.goBack();
    });
  } else {
    this.priorityService.addPriority(this.priority).subscribe(() => {
      this.goBack();
    });
  }
}



deletePriority() {
  if (this.priority.priorityId) {
    this.priorityService.deletePriority(this.priority.priorityId).subscribe(() => {
      this.goBack();
    }, error => {
      console.error('Error deleting priority:', error);
      // Handle error appropriately (e.g., show error message)
    });
  }
}

goBack() {
  this.router.navigate(['/prioritys']);
}
}

