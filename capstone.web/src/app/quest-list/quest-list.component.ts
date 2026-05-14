import { Component , OnInit } from '@angular/core';
import { Quest } from '../models/quest';
import { QuestService } from '../services/quest.service';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Priority } from '../models/priority';
import { CategoryService } from '../services/category.service';
import { PriorityService } from '../services/priority.service';
import { FormControl } from '@angular/forms';
import { Status } from '../models/status';
import { StatusService } from '../services/status.service';

@Component({
    selector: 'app-quest-list',
    templateUrl: './quest-list.component.html',
    styleUrl: './quest-list.component.css',
    standalone: false
})

export class QuestListComponent implements OnInit{
  quests: Quest[] = []; // Array to hold list of quests
  filteredQuests: Quest[] = []; // Array to hold list of  filtered quest by priority or category
  priorities: Priority[] = []; // Array to hold list of priorities
  categories: Category[] = []; // Array to hold list of categories
  statuses: Status[] = []; // Array to hold list of Statuses
  
  displayedColumns: string[] = ['name', 'dueDate' , 'status' ,'category', 'priority', 'action','actiondelete'];
  
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
      });

      this.priorityService.getPrioritys().subscribe((data) => {
        this.priorities = data;
      });

      this.categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      });

      this.statusService.getStatuses().subscribe((data) => {
        this.statuses = data;
      });

      this.priorityFilter.valueChanges.subscribe((value) => {
        this.applyFilter();
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
    this.router.navigate(['/dashboard']);
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
