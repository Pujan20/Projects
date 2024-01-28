import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../Authentication.Service'; // Update with the correct path
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class NavBarComponent implements OnInit {
  isAuthenticated: boolean = false;

  loginAction(): void {
    // Assume your authentication logic here, setting isAuthenticated to true when successful

    // Navigate to the dashboard or any other page
    this.router.navigate(['/dashboard']);
    this.isAuthenticated = true;
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      console.log('Is Authenticated:', isAuthenticated);
      this.isAuthenticated = isAuthenticated;
      
    });
  }

  
}
