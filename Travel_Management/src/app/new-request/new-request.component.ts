import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class NewRequestComponent {
 requestForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.requestForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      purpose: ['', Validators.required],
      notes: ['']
    });
  }



nextStep(): void {
  if (this.requestForm.invalid) {
    this.requestForm.markAllAsTouched();
    return;
  }

  console.log('Proceed to next step:', this.requestForm.value);

  this.router.navigate(['/employee/new-request/budget-details'], {
    state: { requestData: this.requestForm.value }
  });
}
}
