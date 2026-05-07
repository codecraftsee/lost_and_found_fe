import { FormControl } from "@angular/forms";

export interface ChangePasswordRequest {
  current_password: FormControl<string>;
  new_password: FormControl<string>;
}