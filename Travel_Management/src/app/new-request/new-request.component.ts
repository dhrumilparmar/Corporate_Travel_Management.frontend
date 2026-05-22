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

    onSubmit(): void {
    if (this.requestForm.invalid) {
      // this.errorMessage = "Please fill all required fields correctly.";
      return;
    }

    //     const requestData = this.requestForm.value;
    // // this.adminService.createEmployee(employeeData);
    // console.log('Form Submitted (Service disabled):', requestData);
    // this.adminService.createTravelReq(requestData).subscribe({
    //   next: (response) => {
    //     // We have to use optional chaining ?. or bracket notation because
    //     // TypeScript doesn't know for sure if 'fullName' exists on the 'any' type.
    //     this.successMessage = `Employee "${response?.fullName}" created successfully!`;
    //     this.employeeForm.reset({ status: 'Active' });
    //   },
    //   error: (err) => {
    //     this.errorMessage = 'Failed to create employee. Please try again.';
    //   }
    // });
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
