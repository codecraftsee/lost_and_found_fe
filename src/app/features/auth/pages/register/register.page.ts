import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/buttons/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './register.page.html',
})
export class RegisterPage {
  onRegister() {
    // Implement registration logic here
  }
}
