import { Component, inject, signal } from "@angular/core";
import {  FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  signInSig = signal(false);
  authService = inject(AuthService);
  registrationComplete: boolean = false
  registrationError: boolean = false
  passwordIsMatching: boolean = false

  constructor(private router: Router) {}

  login(form: NgForm) {
    this.authService.logUserIn(form.value.email, form.value.password).subscribe((response) => {
      this.router.navigateByUrl('home')
    });
  }

  forgotPw() {
    this.router.navigateByUrl("password-reset");
  }

  SignIn() {
    this.signInSig.set(true);
  }

  goBackToLogin() {
    this.signInSig.set(false);
  }

  onSignIn(form: NgForm) {
    this.authService.registerUser(form.value.userEmail, form.value.userPassword, form.value.userName).subscribe((response) => {
      this.registrationComplete = true
      setTimeout(() => {
        this.signInSig.set(false)
        this.registrationComplete = false;
      }, 5000);
    },error => {
      this.registrationError = true})
  }

  checkPassword(password: string, confirmPassword: string): boolean {
    this.passwordIsMatching = password === confirmPassword;
    return this.passwordIsMatching;
  }
}
