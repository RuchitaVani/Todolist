import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TimeBarComponent } from '../time-bar/time-bar.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})

export class LoginComponent implements OnInit, OnDestroy{
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  usernameValid: boolean = false;
  passwordValid: boolean = false;

  currentDate: string = '';
  currentTime: string = '';
  dayOfWeek: string = '';
  intervalId: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // Update every second
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear interval on component destruction
    }
  }

  updateDateTime() {
    const now = new Date();
    this.dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    this.currentDate = now.toLocaleDateString(); // Format: MM/DD/YYYY
    this.currentTime = now.toLocaleTimeString(); // Format: HH:MM:SS
  }

  validateInput(field: string): void {
    if(field === 'username') {
      this.usernameValid = this.username.length > 0;
    } else if (field === 'password') {
      this.passwordValid = this.password.length > 0;
    }
  }

  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        this.userService.setToken(response.token);
        this.router.navigate(['/dashboard']); // Navigate to the home page or dashboard
      },
      error => {
        this.errorMessage = 'Invalid username or password.';
      }
    );
  }
}
