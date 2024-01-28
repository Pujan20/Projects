import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 
  credentials = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  

  async onSubmit() {
    try {
      const response = await this.http.post<any>('http://localhost:8080/api/authenticate', this.credentials, { observe: 'response' }).toPromise();

      if (response) {
        if (response.status === 200) {
          this.handleSuccessfulAuthentication(response);
        } else {
          this.handleFailedAuthentication(response);
        }
      } else {
        this.handleUndefinedResponse();
      }
    } catch (error) {
      this.handleHttpError(error);
    }
  }

  private handleSuccessfulAuthentication(response: HttpResponse<any>): void {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        const data = response.body;

        if (data && data.message === 'Authentication successful!') {
          console.log('Authentication successful!');
          this.showSnackBar('Authentication successful!', 'success');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Authentication failed. Incorrect password.');
          this.showSnackBar('Authentication failed. Incorrect password.', 'error');
        }
      } catch (error) {
        console.error('Error processing response data:', error);
      }
    } else {
      try {
        const errorData = response.body;

        if (errorData && errorData.error === 'Authentication failed.') {
          console.error('Authentication failed.');
          this.showSnackBar('Authentication failed.', 'error');
        } else {
          console.error('Authentication failed with status code:', response.status);
          this.showSnackBar(`Authentication failed with status code: ${response.status}`, 'error');
        }
      } catch (error) {
        console.error('Error processing error response:', error);
      }
    }
  }

  private handleFailedAuthentication(response: HttpResponse<any>): void {
    console.error(`Authentication failed with status code: ${response.status}`);
    this.showSnackBar(`Authentication failed with status code: ${response.status}`, 'Login Denied');
  }

  private handleUndefinedResponse(): void {
    console.error('HTTP response is undefined.');
    this.showSnackBar('HTTP response is undefined.', 'error');
  }

  private handleHttpError(error: any): void {
    console.error('HTTP error:', error);

    if (error instanceof HttpErrorResponse) {
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      this.showSnackBar(`HTTP error: ${error.message}`, 'error');
    }
  }

  private showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: panelClass,
    });
  }

  ngOnInit(): void {}

   
}
