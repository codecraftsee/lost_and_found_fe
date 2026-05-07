import { Component,DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUTH_ROUTE, AuthRoutes } from '../../../../shared/constants/auth/routes/routes.constants';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './reset-password.page.html',
})
export class ResetPasswordPage {
  destroyRef = inject(DestroyRef);
  form: FormGroup;
  loading = false;
  errorMsg = '';
  payload : any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      current_password: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      new_password: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    });
  }
  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.payload = this.form.getRawValue();

    this.auth.changePassword(this.payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([`/${AUTH_ROUTE}/${AuthRoutes.LOGIN}`]);
      },
      error: (err) => {
        switch (err.status) {
          case 400:
            this.errorMsg = 'Invalid email or password.';
            break;
          case 401:
            this.errorMsg = 'Unauthorized. Please check your credentials.';
            break;
          case 409:
            this.errorMsg = 'Conflict. This email is already in use.';
            break;
          case 500:
            this.errorMsg = 'Server error. Please try again later.';
            break;
          default:
            this.errorMsg = 'An unexpected error occurred. Please try again.';
        }
        this.loading = false;
      }
    });

  }
}
