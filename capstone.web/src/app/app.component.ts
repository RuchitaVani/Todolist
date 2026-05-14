import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  //title = 'Capstone Project 2024';
}
