import { Component, ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss'],
    encapsulation: ViewEncapsulation.None // Important for styles to apply
})
export class BudgetDetailsComponent {
  budgetForm: FormGroup;
  subtotal: number = 0;
  contingency: number = 0;
  total: number = 0;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.budgetForm = this.fb.group({
      flights: ['', [Validators.required, Validators.min(0)]],
      accommodation: ['', [Validators.required, Validators.min(0)]],
      transport: ['', [Validators.required, Validators.min(0)]],
      meals: ['', [Validators.required, Validators.min(0)]]
    });

    this.calculateTotal();
  }

  calculateTotal(): void {
    const flights = parseFloat(this.budgetForm.get('flights')?.value) || 0;
    const accommodation = parseFloat(this.budgetForm.get('accommodation')?.value) || 0;
    const transport = parseFloat(this.budgetForm.get('transport')?.value) || 0;
    const meals = parseFloat(this.budgetForm.get('meals')?.value) || 0;

    this.subtotal = flights + accommodation + transport + meals;
    this.contingency = this.subtotal * 0.05; // 5% contingency
    this.total = this.subtotal + this.contingency;
  }

  onSubmit(): void {
    if (this.budgetForm.valid && this.total > 0) {
      console.log('Budget Submitted!', {
        ...this.budgetForm.value,
        totalEstimated: this.total
      });
      // Add API call logic here
      alert('Budget request submitted successfully!');
    } else {
      this.budgetForm.markAllAsTouched();
    }
  }

  goBack(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['/employee/new-request']);
    console.log('Back button clicked');
  }

  // Handle file selection
  onFileSelected(files: FileList): void {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
}