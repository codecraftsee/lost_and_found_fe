import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink],
  templateUrl: './reset-password.page.html',
})
export class ResetPasswordPage {
  onSubmit() {
    // Handle form submission logic here
  }
}
