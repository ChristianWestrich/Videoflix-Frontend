import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8000'

  constructor(private http: HttpClient, private router: Router) { }


  logUserIn(email: string, password: string) {
    const url = `${this.baseUrl}/login/`;
    return this.http.post(url, { email, password })
  }

  registerUser(email: string, password: string) {
    const url = `${this.baseUrl}/login/`;
    return this.http.post(url, { email, password });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  pwResetRequest(email: string) {
    const url = `${this.baseUrl}/pw_reset/`;
    return this.http.post(url, { email });
  }
}
