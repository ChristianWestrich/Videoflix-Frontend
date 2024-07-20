import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule, NgClass } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: "app-password-confirmation",
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule, FooterComponent],
  templateUrl: "./password-confirmation.component.html",
  styleUrl: "./password-confirmation.component.scss",
})
export class PasswordConfirmationComponent {
  error: boolean = false;
  success: boolean = false;
  passwordIsMatching: boolean = false;
  authService = inject(AuthService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  pwConfirm(form: NgForm) {
    const uidb64 = this.route.snapshot.paramMap.get("uidb64");
    const token = this.route.snapshot.paramMap.get("token");
    this.authService
      .pwConfirmRequest(uidb64, token, form.value.confirmPassword)
      .pipe(
        tap((response) => {
          if (response.status !== 200) {
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          } else {
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.router.navigateByUrl("auth");
            }, 3000);
          }
        }),
        catchError((error) => {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
          console.error(error);
          throw error;
        }),
      )
      .subscribe((response) => {});
  }

  checkPassword(password: string, confirmPassword: string): boolean {
    this.passwordIsMatching = password === confirmPassword;
    return this.passwordIsMatching;
  }
}
