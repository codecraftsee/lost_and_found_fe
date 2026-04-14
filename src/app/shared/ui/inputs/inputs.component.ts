import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inputs.component.html',
})
export class InputComponent {
  @Input() variant: 'primary' = 'primary';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder = '';
}
