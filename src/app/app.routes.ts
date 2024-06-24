import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "pw-reset", component: PasswordResetComponent},
    {path: "movie/:id", component: MovieDetailComponent},


];
