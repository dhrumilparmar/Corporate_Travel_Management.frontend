import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../../service/admin-service.service';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './add-employee-component.component.html',
  styleUrl: './add-employee-component.component.scss'
})
export class AddEmployeeComponent implements OnInit {
 
  employeeForm: FormGroup;
  
  // Observables now hold arrays of 'any'
  departments$!: Observable<any[]>;
  roles$!: Observable<any[]>;
  managers$!: Observable<any[]>;

  successMessage: string | null = null;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService
  ) {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // CHANGE THESE to match your DTO keys
      departmentID: [null, Validators.required], // Use ID and initialize as null
      roleID: [null, Validators.required],       // Use ID and initialize as null
      managerID: [null],                         // Use ID and initialize as null
      status: ['Active', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.departments$ = this.adminService.getDepartments();
    // this.roles$ = this.adminService.getRoles();
    // this.managers$ = this.adminService.getManagers();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onCancel(): void{
    console.log("Form cancelled");
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.errorMessage = "Please fill all required fields correctly.";
      return;
    }

    // The 'employeeData' constant is created directly from the form value.
    // TypeScript infers its type, but it's not strongly typed against an interface.
    const employeeData = this.employeeForm.value;
    // this.adminService.createEmployee(employeeData);

 

    console.log('Form Submitted (Service disabled):', employeeData);
    this.adminService.createEmployee(employeeData).subscribe({
      next: (response) => {
        // We have to use optional chaining ?. or bracket notation because
        // TypeScript doesn't know for sure if 'fullName' exists on the 'any' type.
        this.successMessage = `Employee "${response?.fullName}" created successfully!`;
        this.employeeForm.reset({ status: 'Active' });
      },
      error: (err) => {
        this.errorMessage = 'Failed to create employee. Please try again.';
      }

      
    });
  }
}
