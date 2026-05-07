import { Form, FormControl } from "@angular/forms";

export interface RegisterResponse {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}