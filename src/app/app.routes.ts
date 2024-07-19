import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {PasswordConfirmationComponent} from "./password-confirmation/password-confirmation.component";
import {MoviePlayerComponent} from "./movie-player/movie-player.component";

export const routes: Routes = [
    {path: "auth", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "password-reset", component: PasswordResetComponent},
    {path: "movie/:id", component: MoviePlayerComponent},
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {path: "password_confirm/:uidb64/:token", component: PasswordConfirmationComponent},


];
