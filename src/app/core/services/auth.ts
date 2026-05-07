import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AUTH_BASE_URL } from '../../shared/constants/api/api.constants';
import { AuthRoutes } from '../../shared/constants/auth/routes/routes.constants';
import { ACCESS_TOKEN } from '../../shared/constants/auth/token/token.constant';
import { RegisterRequest } from '../models/auth/registe-request.dto';
import { LoginRequest } from '../models/auth/login-request.dto';
import { ChangePasswordRequest } from '../models/auth/changePassword-request.dto';
import { RegisterResponse } from '../models/auth/register-response.dto';
import { LoginResponse } from '../models/auth/login-response.dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${AUTH_BASE_URL}/${AuthRoutes.REGISTER}`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${AUTH_BASE_URL}/${AuthRoutes.LOGIN}`,
      data
    ).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
      })
    );
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${AUTH_BASE_URL}/${AuthRoutes.CHANGE_PASSWORD}`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}