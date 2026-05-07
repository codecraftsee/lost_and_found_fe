import { FormControl } from "@angular/forms";

export interface LoginRequest {
  email: FormControl<string>;
  password: FormControl<string>;
}