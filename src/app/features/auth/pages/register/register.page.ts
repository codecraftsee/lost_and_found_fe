import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { AuthRoutes } from '../../../../shared/constants/auth/routes/routes.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.page.html',
})
export class RegisterPage {
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
      full_name: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)], nonNullable: true})
    });
  }

  onRegister() {
    console.log('RegisterPage loaded');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.payload = this.form.getRawValue();
    this.auth.register(this.payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.auth.login(this.payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        this.loading = false;
        this.router.navigate([`../${AuthRoutes.LOGIN}`]);
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
