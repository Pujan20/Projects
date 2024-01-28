// Example service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';  // Update the base URL

  constructor(private http: HttpClient) {}

  submitForm(formData: any) {
    return this.http.post(`${this.baseUrl}/submit`, formData);
  }
}
