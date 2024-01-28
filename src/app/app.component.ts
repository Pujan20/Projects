import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatInputModule} from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';


@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [ 
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
      DashboardComponent,CommonModule, RouterOutlet,MatButtonModule,NavBarComponent,MatToolbarModule,MatInputModule, FormsModule,MatSnackBarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loginApp';
}
export class AppRoutingModule {}
