import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationService } from './Authentication.Service';
import { routes } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatDatetimePickerModule, NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { DatePipe } from '@angular/common';


@NgModule({
  
  exports: [RouterModule ,
    NgxMatDatetimepicker,
    
  ],
  imports: [AppComponent,
    
    NgxMatNativeDateModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    MatSnackBarModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]),
  ],
  providers: [AuthenticationService,DatePipe],
})
export class AppModule {}
