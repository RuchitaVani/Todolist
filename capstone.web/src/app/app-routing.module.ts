// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './core/security/auth.guard';
import { PriorityListComponent } from './priority-list/priority-list.component';
import { PriorityComponent } from './priority/priority.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HeaderComponent, canActivate: [AuthGuard] }, // Example default page
  { path: 'prioritys', component: PriorityListComponent },
  { path: 'priority', component: PriorityComponent },
  { path: 'priority/:id', component: PriorityComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
