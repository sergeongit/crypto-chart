import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() symbolChange = new EventEmitter<{ crypto1: string, crypto2: string }>();

  errorMessage: string = '';

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    crypto1: ['', Validators.required],
    crypto2: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.valid) {
      const {crypto1, crypto2} = this.form.value;
      this.symbolChange.emit({crypto1, crypto2});
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid cryptocurrency symbols. Please try again.';
    }
  }
}
