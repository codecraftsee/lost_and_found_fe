import { Component,DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.page.html',
})
export class LoginPage {
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
      email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      password: new FormControl('', {validators: [Validators.required], nonNullable: true})
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.payload = this.form.getRawValue();

    this.auth.login(this.payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res.access_token);
        this.auth.saveToken(res.access_token);
        this.loading = false;
        this.router.navigate(['/']); 
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