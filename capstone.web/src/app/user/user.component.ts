import { Component , OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    standalone: false
})
export class UserComponent implements OnInit  {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    // passwordHash: '', // Optional for update cases
    role: ''
};
constructor(
  private route: ActivatedRoute,
  private userService: UserService,
  private router: Router
) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap?.get('id'); // Get user id from route
  if (id) {
    // Fetch user details if id exists
    this.userService.getUser(parseInt(id)).subscribe(data => {
      this.user = data;
      console.log(this.user)
   
    });
  }
}

saveUser() {
  if (this.user.id) {
    this.userService.updateUser(this.user).subscribe(() => {
      this.goBack();
    });
  } else {
    this.userService.addUser(this.user).subscribe(() => {
      this.goBack();
    });
  }
}



deleteUser() {
  if (this.user.id) {
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.goBack();
    }, error => {
      console.error('Error deleting user:', error);
      // Handle error appropriately (e.g., show error message)
    });
  }
}

goBack() {
  this.router.navigate(['/users']);
}
}

