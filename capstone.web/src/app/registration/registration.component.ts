import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    standalone: false
})
export class RegistrationComponent implements OnInit, OnDestroy{
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  message: string = '';
  isSubmitting: boolean = false;

  firstNameValid: boolean = false;
  lastNameValid: boolean = false;
  usernameValid: boolean = false;
  passwordValid: boolean = false;
  confirmPasswordValid: boolean = false;
  emailValid: boolean = false;

  currentDate: string = '';
  currentTime: string = '';
  dayOfWeek: string = '';
  intervalId: any;
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // Update every second
  }

  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }

  //dynamic
  updateDateTime() {
    const now = new Date();
    this.dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    this.currentDate = now.toLocaleDateString(); // Format: MM/DD/YYYY
    this.currentTime = now.toLocaleTimeString(); // Format: HH:MM:SS
  }

  validateInput(field: string): void {
    if (field === 'firstName') {
      this.firstNameValid = this.firstName.length > 0;
    } else if (field === 'lastName') {
      this.lastNameValid = this.lastName.length > 0;
    } else if (field === 'username') {
      this.usernameValid = this.username.length > 0;
    } else if (field === 'password') {
      this.passwordValid = this.password.length > 0;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordValid = this.confirmPassword === this.password;
    } else if (field === 'email') {
      this.emailValid = this.validateEmail(this.email);
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  register() {
    // Ensure passwords match
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }


    

    // Create user data object
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      passwordHash: this.password, // Adjust if the backend uses a different key
      role: this.role
    };

    // Set submission state
    this.isSubmitting = true;

    // dynamic
    
    // Make API call
    this.http.post('https://localhost:7197/api/users', userData).subscribe({
      next: (response) => {
        this.message = 'User registered successfully!';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.message = 'Registration failed, please try again' + (error.error || 'Server error');
        console.error(error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
