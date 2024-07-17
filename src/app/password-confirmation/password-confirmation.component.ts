import {Component, inject} from '@angular/core';
import {FormsModule, NgForm,} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-confirmation',
  standalone: true,
    imports: [
        FormsModule,
        NgClass,
        CommonModule
    ],
  templateUrl: './password-confirmation.component.html',
  styleUrl: './password-confirmation.component.scss'
})



export class PasswordConfirmationComponent {

    passwordIsMatching: boolean = false
    authService = inject(AuthService)

    constructor(private route: ActivatedRoute) {
    }


    pwConfirm(form: NgForm) {
        const uidb64 = this.route.snapshot.paramMap.get('uidb64');
        const token = this.route.snapshot.paramMap.get('token');
        this.authService.pwConfirmRequest(uidb64,token,form.value.password).subscribe((response: any) => {

        })
    }

    checkPassword(password: string, confirmPassword: string): boolean {
        this.passwordIsMatching = password === confirmPassword;
        return this.passwordIsMatching;
    }
}
