import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/security/auth.interceptor';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { PriorityComponent } from './priority/priority.component';
import { PriorityListComponent } from './priority-list/priority-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { StatusComponent } from './status/status.component';
import { StatusListComponent } from './status-list/status-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule} from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { QuestComponent } from './quest/quest.component';
import { QuestListComponent } from './quest-list/quest-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatSelectModule } from '@angular/material/select';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PriorityComponent,
    PriorityListComponent,
    NavigationComponent,
    CategoryComponent,
    CategoryListComponent,
    QuestComponent,
    QuestListComponent,
    CategoryComponent,
    RegistrationComponent,
    UserComponent,
    UserListComponent,
    // StatusComponent,
    // StatusListComponent,
    DashboardComponent,
    // TimeBarComponent
    
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule,
    MatIconModule,
    MatOption,
    MatSelect,
    MatSelectModule,
    MatSidenavModule,
    DragDropModule,
    TimeBarComponent,
    StatusListComponent,
    StatusComponent
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
