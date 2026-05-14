import { Component, Input, OnInit } from '@angular/core';
import { Quest } from '../models/quest';
import { QuestListComponent } from '../quest-list/quest-list.component';
import { Priority } from '../models/priority';
import { Category } from '../models/category';
import {QuestService} from '../services/quest.service';
import { FormControl } from '@angular/forms';
import { PriorityService } from '../services/priority.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Status } from '../models/status';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // This is for drag and drop
 
  quests: Quest[] = []; // Array to hold list of quests
  newQuests: Quest[] = [];
  activeQuests: Quest[] = [];
  resolvedQuests: Quest[] = [];
  closedQuests: Quest[] = [];
  statuses: Status[] = [];
  filteredQuests: Quest[] = []; // Array to hold list of  filtered quest by priority or category
  selectedQuest: Quest | null = null;
  
  priorities: Priority[] = []; // Array to hold list of priorities
  categories: Category[] = []; // Array to hold list of categories
  displayedColumns: string[] = ['new', 'active' , 'resolved', 'closed'];
  

  
  //Using FormControl for Priority Filter
  priorityFilter = new FormControl('');

  //Using FormControl for Category Filter
  categoryFilter = new FormControl('');

  statusFilter = new FormControl('');
  
  

    constructor(
      private questService: QuestService,
      private priorityService: PriorityService,
      private categoryService: CategoryService,
      private statusService: StatusService,
      private router: Router
    ) {}
  
  ngOnInit(){
       // Fetch Quests on component initialization
       this.questService.getQuests().subscribe((data) => {
        this.quests = data;
        this.filteredQuests =[...this.quests];

        this.organizeQuestsByStatus();
      });

      this.statusService.getStatuses().subscribe((data) => {
        this.statuses = data;
      });

      this.priorityService.getPrioritys().subscribe((data) => {
        this.priorities = data;
      });

      this.categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      });

      this.priorityFilter.valueChanges.subscribe((value) => {
        this.applyFilter();
      });
  }

  // Organize quests by their status
  

  // Method to handle drag-and-drop
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  // Helper method to get the statusId based on container ID (New, Active, Resolved, Closed)
  

  organizeQuestsByStatus() {
    // Clear previous quests
    this.newQuests = [];
    this.activeQuests = [];
    this.resolvedQuests = [];
    this.closedQuests = [];
  
    // Log the statusId for each quest
    this.quests.forEach(quest => {
      console.log('Checking quest:', quest, 'statusId:', quest.statusId);
  
      // Match statusId to appropriate arrays
      if (quest.statusId === 1) {
        console.log('Adding to newQuests');
        this.newQuests.push(quest);
      } else if (quest.statusId === 2) {
        console.log('Adding to activeQuests');
        this.activeQuests.push(quest);
      } else if (quest.statusId === 3) {
        console.log('Adding to resolvedQuests');
        this.resolvedQuests.push(quest);
      } else if (quest.statusId === 4) {
        console.log('Adding to closedQuests');
        this.closedQuests.push(quest);
      } else {
        console.log('Unknown statusId:', quest.statusId);
      }
    });
  
    console.log('Organized Quests:', {
      new: this.newQuests,
      active: this.activeQuests,
      resolved: this.resolvedQuests,
      closed: this.closedQuests,
    });
  }
  

  applyFilter() {
    const selectedPriority = this.priorityFilter.value;

    if (!selectedPriority) {
      this.filteredQuests = [...this.quests];
    } else {
      const selectedPriorityNumber = Number(selectedPriority);
      this.filteredQuests = this.quests.filter((quest) => quest.priorityId === selectedPriorityNumber);
    }
  }

  

  // Navigate to Quest details component
  viewQuest(id: number) {
    this.router.navigate(['/quest', id]);
  }
  deleteQuest(id: number) {
    if (confirm('Are you sure you want to delete this quest?')) {
      this.questService.deleteQuest(id).subscribe(() => {
        this.quests = this.quests.filter(quest => quest.questId !== id);
        this.applyFilter();
      });
    }
  }
  // Navigate to new Quest form
  addQuest() {
    this.router.navigate(['/quest']);
  }
  goBack() {
    this.router.navigate(['/navigation']);
  }
 
  getCategoryName(id: number): string {

    const category = this.categories.find((y) => y.categoryId == id)
  
    if(category) {
      return category.name;
    }
  
    throw `Unable to find Category by the given Id: ${id}`;
  }

  getPriorityName(id: number): string {

    const priority = this.priorities.find((x) => x.priorityId == id)
  
    if(priority) {
      return priority.name;
    }
  
    throw `Unable to find Priority by the given Id: ${id}`;
  }

  getStatusName(id: number): string {

    const status = this.statuses.find((x) => x.statusId == id)
  
    if(status) {
      return status.name;
    }
  
    throw `Unable to find Priority by the given Id: ${id}`;
  }
}
