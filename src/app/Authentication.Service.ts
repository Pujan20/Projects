// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  authenticateUser(credentials: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/api/authenticate', credentials)
      .pipe(
        tap((response) => {
          if (response && response.message === 'Authentication successful!') {
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  signOut(): void {
    // Implement your sign-out logic

    // Assuming you want to set isAuthenticated to false on sign-out
    this.isAuthenticatedSubject.next(false);
  }
}
