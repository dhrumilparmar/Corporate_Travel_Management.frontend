import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdminServiceService} from '../service/admin-service.service';
interface BudgetSummary {
  subtotal: number;
  contingency: number;
  total: number;
}

@Component({
  selector: 'app-travel-request',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './travel-request-new.component.html',
  styleUrls: ['./travel-request-new.component.scss']
})
export class TravelRequestComponent implements OnInit {
  travelForm!: FormGroup;
  budgetSummary: BudgetSummary = {
    subtotal: 0,
    contingency: 0,
    total: 0
  };
  isEdit = false;
  editingTravelReqID?: number;
  TravelOptions = [
    { key: 1, value: 'Road' },
    { key: 2, value: 'Train' }
  ];
  
  businessPurposes = [
    'Client Meeting',
    'Internal Workshop',
    'Conference / Event',
    'Product Launch',
    'Audit / Compliance'
  ];


  constructor(private fb: FormBuilder, private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.initializeForms();
    this.setupBudgetCalculation();


    //navigated from my-requests component with travel request data
    const navState: any = history.state || {};
    if (navState && navState.travelRequest) {
      const tr = navState.travelRequest;
      this.isEdit = !!navState.isEdit;
      this.editingTravelReqID = tr.travelReqID;
      this.travelForm.patchValue({
        employeeID: Number(tr.employeeID) || this.employeeID,
        destination: tr.destination || '',
        startTravel: tr.startTravel || '',
        endTravel: tr.endTravel || '',
        purpose: tr.purpose || '',
        justification: tr.justification || '',
        status: tr.status || this.defaultStatus,
        transportID: tr.transportID || '',
        travelAmount: tr.budget?.travelAmount ?? tr.travelAmount ?? 0,
        accommodationAmount: tr.budget?.accommodationAmount ?? tr.accommodationAmount ?? 0,
        localTransportAmount: tr.budget?.localTransportAmount ?? tr.localTransportAmount ?? 0,
        mealsAmount: tr.budget?.mealsAmount ?? tr.mealsAmount ?? 0
      });
    }
  }
  defaultStatus = 'DRAFT';
  employeeID = Number(localStorage.getItem('employeeId'));
  initializeForms(): void {
    this.travelForm = this.fb.group({
      // Trip details
      employeeID: [this.employeeID, Validators.required],
      destination: ['', Validators.required],
      startTravel: ['', Validators.required],
      endTravel: ['', Validators.required],
      purpose: ['', Validators.required],
      justification: ['', Validators.required],
      status:[this.defaultStatus, Validators.required],
      transportID: ['', Validators.required],
      // Budget items
      travelAmount: [0, [Validators.min(0)]],
      accommodationAmount: [0, [Validators.min(0)]],
      localTransportAmount: [0, [Validators.min(0)]],
      mealsAmount: [0, [Validators.min(0)]]
    });
  }

  setupBudgetCalculation(): void {
    this.travelForm.valueChanges.subscribe(() => {
      this.calculateBudget();
    });
  }

  calculateBudget(): void {
    const values = this.travelForm.value;
    const subtotal = 
      (parseFloat(values.travelAmount) || 0) +
      (parseFloat(values.accommodationAmount) || 0) +
      (parseFloat(values.localTransportAmount) || 0) +
      (parseFloat(values.mealsAmount) || 0);

    const contingency = subtotal * 0.05;
    const total = subtotal + contingency;

    this.budgetSummary = {
      subtotal,
      contingency,
      total
    };
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }





  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.travelForm.reset();
    }
  }

// Make sure your form data structure matches what backend expects
onSaveAsDraft() {
    if (this.travelForm.invalid) {
        console.warn('Form is invalid. Please fill in all required fields before saving as draft.');
        return;
    }

    const formData = this.travelForm.value;
    
    // Create the DTO in the exact format your backend expects
    const travelRequestDto = {
        destination: formData.destination,
        startTravel: formData.startTravel,
        endTravel: formData.endTravel,
        purpose: formData.purpose,
        justification: formData.justification,
        status: formData.status || 'DRAFT',
        employeeID: formData.employeeID,
        transportID: formData.transportID,
        budget: {
            travelAmount: formData.travelAmount || 0,
            accommodationAmount: formData.accommodationAmount || 0,
            localTransportAmount: formData.localTransportAmount || 0,
            mealsAmount: formData.mealsAmount || 0
        }
    };

    console.log('Sending travel request:', travelRequestDto); // Debug log

    this.adminService.createTravelReq(travelRequestDto).subscribe({
        next: (response) => {
            console.log('Travel request created successfully:', response);
            console.log('Travel request saved as draft successfully!');
            // Handle success
        },
        error: (err) => {
            console.error('Failed to save travel request as draft:', err);
            console.log('Failed to save travel request. Please check all required fields.');
        }
    });
}

  onSubmit(): void {
    if (this.travelForm.invalid) {
      alert('Please fill in all required trip details.');
      return;
    }

    const values = this.travelForm.value;
    
    const basePayload = {
      destination: values.destination,
      startTravel: values.startTravel,
      endTravel: values.endTravel,
      purpose: values.purpose,
      justification: values.justification,
      employeeID: values.employeeID,
      transportID: values.transportID,
      budget: {
        travelAmount: values.travelAmount || 0,
        accommodationAmount: values.accommodationAmount || 0,
        localTransportAmount: values.localTransportAmount || 0,
        mealsAmount: values.mealsAmount || 0
      }
    };

    if (this.isEdit) {
      // Update existing request
      const payload = { ...basePayload, status: values.status, travelReqID: this.editingTravelReqID };
      console.log('Updating travel request:', payload);
      this.adminService.updateTravelReq(payload).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          alert('Travel request updated successfully!');
          this.travelForm.reset({ status: this.defaultStatus });
          this.isEdit = false;
          this.editingTravelReqID = undefined;
        },
        error: (err) => {
          console.error('Failed to update travel request:', err);
        }
      });
      return;
    }

    const travelFormdata = {
      ...basePayload,
      status: 'Submitted'
    };
    console.log('form submitted:', travelFormdata);
    this.adminService.createTravelReq(travelFormdata).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        console.log('Travel request created successfully!');
        this.travelForm.reset({ status: 'Active' });
      },
      error: (err) => {
        console.error('Failed to create travel request:', err);
      }
    });


    


  }

}
