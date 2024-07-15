import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient, private router: Router) { }


  logUserIn(email: string, password: string) {
    const url = `${this.baseUrl}/auth/`;
    return this.http.post(url, { username: email, password: password })
  }

  registerUser(email: string, password: string, username: string) {
    const url = `${this.baseUrl}/register/`;
    console.log(username, password, email);
    return this.http.post(url, { email:email,password:password,username:username  });
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
