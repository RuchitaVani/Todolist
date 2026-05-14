import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrl: './time-bar.component.css'
})
export class TimeBarComponent {

  currentDate: string = '';
  currentTime: string = '';
  dayOfWeek: string = '';
  intervalId: any;
  constructor(private router: Router) { }

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

}
