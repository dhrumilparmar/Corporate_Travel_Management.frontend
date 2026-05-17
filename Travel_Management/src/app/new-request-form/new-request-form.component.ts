// ✅ CORRECT — remove NavbarComponent and SidebarComponent
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface TravelRequest {
  destination: string;
  travelDates: string;
  businessPurpose: string;
  estimatedBudget: number | null;
  tripDetails: string;
}

@Component({
  selector: 'app-new-request-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
    // ✅ No NavbarComponent or SidebarComponent here
  ],
  templateUrl: './new-request-form.component.html',
  styleUrl: './new-request-form.component.scss'
})
export class NewRequestFormComponent {
  isSubmitting = false;

  request: TravelRequest = {
    destination: '',
    travelDates: '',
    businessPurpose: '',
    estimatedBudget: null,
    tripDetails: ''
  };

  purposeOptions: string[] = ['Client Meeting', 'Conference', 'Project Work', 'Training', 'Other'];

  saveDraft(): void {}

  submitRequest(): void {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }
}