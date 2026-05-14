// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './core/security/auth.guard';
import { PriorityListComponent } from './priority-list/priority-list.component';
import { PriorityComponent } from './priority/priority.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { QuestComponent } from './quest/quest.component';
import { QuestListComponent } from './quest-list/quest-list.component';
import {RegistrationComponent} from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusComponent } from './status/status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeBarComponent } from './time-bar/time-bar.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page
  { path: 'prioritys', component: PriorityListComponent },
  { path: 'priority', component: PriorityComponent },
  { path: 'priority/:id', component: PriorityComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: "category", component: CategoryComponent },
  { path: 'quest/:id', component: QuestComponent },
  { path: "quest", component: QuestComponent },
  { path: 'quests', component: QuestListComponent },
  { path: 'statuses', component: StatusListComponent },
  { path: 'status', component: StatusComponent },
  { path: 'status/:id', component: StatusComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timeBar', component: TimeBarComponent },
  { path: '**', redirectTo: '/login' }, // Redirect any unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
