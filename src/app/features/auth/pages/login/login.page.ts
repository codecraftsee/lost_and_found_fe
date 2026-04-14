import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/buttons/button.component';
import { InputComponent } from '../../../../shared/ui/inputs/inputs.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ButtonComponent, InputComponent],
  templateUrl: './login.page.html',
})
export class LoginPage {
  onSubmit() {
    // Handle login logic here
  }
}
