import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomePage } from './features/home/page/home.page';
import { ResetPasswordPage } from './features/auth/pages/reset-password/reset-password.page';

export const routes: Routes = [
    {
      path: '',
      component: HomePage
    },
    {
    path: 'auth',
    component: AuthLayoutComponent, 
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'reset-password', component: ResetPasswordPage }
    ]
  }
];
