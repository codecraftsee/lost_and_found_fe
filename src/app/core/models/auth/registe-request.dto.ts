import { FormControl } from "@angular/forms";

export interface RegisterRequest {
  full_name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}