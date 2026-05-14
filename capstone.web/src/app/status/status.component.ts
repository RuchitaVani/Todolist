import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../services/status.service';




@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {

  status: Status = {
    statusId: 0,
    name: '',
    dateCreated: new Date(),
    isDeleted: false,
};
constructor(
  private route: ActivatedRoute,
  private statusService: StatusService,
  private router: Router
) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap?.get('id'); // Get status id from route
  if (id) {
    // Fetch status details if id exists
    this.statusService.getStatus(parseInt(id)).subscribe(data => {
      this.status = data;
      console.log(this.status)

    });
  }
}

saveStatus() {
  if (this.status.statusId) {
    this.statusService.updateStatus(this.status).subscribe(() => {
      this.goBack();
    });
  } else {
    this.statusService.addStatus(this.status).subscribe(() => {
      this.goBack();
    });
  }
}



deleteStatus() {
  if (this.status.statusId) {
    this.statusService.deleteStatus(this.status.statusId).subscribe(() => {
      this.goBack();
    }, error => {
      console.error('Error deleting status:', error);
      // Handle error appropriately (e.g., show error message)
    });
  }
}

goBack() {
  this.router.navigate(['/statuses']);
}
}
