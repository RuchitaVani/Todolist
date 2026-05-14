import { Component , OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css',
    standalone: false
})
export class UserListComponent implements OnInit{
  users: User[] = []; // Array to hold list of persons
  displayedColumns: string[] = ['firstName', 'userName','email','role','action','actiondelete'];
  
 
    constructor(
      private userService: UserService,
      private router: Router
    ) {}
  
  ngOnInit(){
       // Fetch Users on component initialization
       this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
  }

  // Navigate to User details component
  viewUser(id: number) {
    this.router.navigate(['/user', id]);
  }
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }
  // Navigate to new User form
  addUser() {
    this.router.navigate(['/user']);
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }

 
}
