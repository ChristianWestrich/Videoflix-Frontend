import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, tap } from "rxjs/operators";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: "app-password-reset",
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: "./password-reset.component.html",
  styleUrl: "./password-reset.component.scss",
})
export class PasswordResetComponent {
  error: boolean = false;
  success: boolean = false;
  authService = inject(AuthService);

  constructor(private router: Router) {}

  pwReset(form: NgForm) {
    this.authService
      .pwResetRequest(form.value.email)
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

  goBack() {
    this.router.navigateByUrl("auth");
  }
}
