import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Authentication.Service'; // Update with the correct path
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule,NgxMatDatepickerInput} from '@angular-material-components/datetime-picker';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { MatOptionModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/input';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule ,
    MatNativeDateModule ,
    MatDatepickerModule ,
    MatOptionModule,
    FormsModule,
    MatListModule ,
    ReactiveFormsModule ,
    MatSelectModule,
    NavBarComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatFormField ,
    MatInputModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    
    
  ],
  providers:[DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAuthenticated: any;
  dashboardForm: FormGroup;
  ngxMatDatetimePicker: NgxMatDatepickerInput<Date> | null = null;

  
  procedureOptions = [
    { value: 'procedure1', viewValue: 'Procedure 1' },
    { value: 'procedure2', viewValue: 'Procedure 2' },
    // Add more options as needed
  ];
  procedureByOptions = [
    { value: 'person1', viewValue: 'Person 1' },
    { value: 'person2', viewValue: 'Person 2' },
    // Add more options as needed
  ];
picker:any;


  constructor(
   private datePipe:DatePipe,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService ,// Assuming you have an AuthenticationService
    private snackBar:MatSnackBar

  ) 
   {
    this.dashboardForm = this.fb.group({
      name: ['', Validators.required],
      procedure: ['', Validators.required],
      procedureBy: ['', Validators.required],
      place: ['', Validators.required],
      dateTime: [new Date(new Date().toUTCString()), Validators.required],
    });
  }
 

  ngOnInit(): void {
    console.log('Dashboard initialized');
    // Initialize your form group in the ngOnInit lifecycle hook
    

    // Initialize the isAuthenticated status from the authentication service
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  

  signOut(): void {
    // Implement your sign-out logic, e.g., call a service method
    this.authService.signOut();

    // Redirect to the login page
    this.router.navigate(['/login']);

    // Set isAuthenticated to false on sign-out
    this.isAuthenticated = false;
  }

  onSubmit(): void {
    if (this.dashboardForm.valid) {
      const formData = this.dashboardForm.value;
      formData.dateTime = this.datePipe.transform(formData.dateTime, 'yyyy-MM-ddTHH:mm:ss');


      
      this.http.post('http://localhost:8080/api/submit', formData)
        .subscribe(
          (response) => {
            console.log('Form submitted successfully:', response);
            
            this.showSnackBar('Form submitted successfully');
            
          },
          (error: HttpErrorResponse) => {
            console.error('Error submitting form:', error);
            // Handle error, e.g., show an error message
            this.showSnackBar('Error submitting form');
          }
        );
    }}

    private showSnackBar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
    }
  }