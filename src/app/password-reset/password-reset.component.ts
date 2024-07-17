import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {

  authService = inject(AuthService)

  constructor(private router: Router){}

  pwReset(form: NgForm) {
    this.authService.pwResetRequest(form.value.email).subscribe((response) => {
      
    })
  }

  goBack() {
    this.router.navigateByUrl("auth")
  }
}
