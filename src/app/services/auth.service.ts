import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://127.0.0.1:8000'


  constructor(private http: HttpClient, private router: Router) { }


  logUserIn(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = {"username": email.toLowerCase(), "password": password};
    return this.http.post(url, body, httpOptions).pipe(tap((response: any) => { localStorage.setItem('token', response.token)}))
  }

  registerUser(email: string, password: string, username: string) {
    const url = `${this.baseUrl}/register/`;
    email = email.toLowerCase()
    return this.http.post(url, { "email":email,"password":password,"username":email, "first_name": username  });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  pwResetRequest(email: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'}),
      observe: 'response' as const
    };
    const url = `${this.baseUrl}/password_reset/`;
    return this.http.post(url, { email }, httpOptions );
  }

  pwConfirmRequest( uidb64: string | null,
        token: string | null,
        newPassword: string,
  ) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'}),
      observe: 'response' as const
    };
    if (uidb64) {
      uidb64 = uidb64.split('=')[1];
    }
    if (token) {
      token = token.split('=')[1];
    }
      const url = `${this.baseUrl}/password_confirm/${uidb64}/${token}/`;
      return this.http.post(url, { "new_password": newPassword }, httpOptions);
    }
}

