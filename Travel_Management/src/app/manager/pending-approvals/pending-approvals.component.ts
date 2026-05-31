import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../service/admin-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pending-approvals.component.html',
  styleUrl: './pending-approvals.component.scss'
})
export class PendingApprovalsComponent {
  selectedRequest = 0;
  isDarkMode = false;

  ALlrequests: any[] = [];
  hasNoRequests: boolean = true;
  currentManagerID = Number(localStorage.getItem('employeeId')) ;

  // Add this property to store the detailed request data
  detailedRequests: any[] = [];

  constructor(private router: Router, private adminService: AdminServiceService) {}

  ngOnInit() {
    this.getAllReqView();
  }

  getAllReqView() {
    this.adminService.getTravelReqView(this.currentManagerID).subscribe((data) => {
      this.ALlrequests = data;
      console.log('Raw data:', this.ALlrequests);
      
      if (this.ALlrequests && this.ALlrequests.length > 0) {
        this.hasNoRequests = false;
        // Map for the list view (cards)
        this.ALlrequests = this.ALlrequests.map((req: any) => ({
          ...req, // Retains all original properties from the API (like employeeId)
          id: req.requestCode,
          status: "Pending", // You might want to map actual status
          traveler: req.employeeName,
          role: req.employeeRole || 'Employee', // Fallback if role is not available
          location: req.destination,
          startDate: this.formatDate(req.startDate),
          endDate: this.formatDate(req.endDate),
          purpose: req.justification,
          budget: req.TotalBudget ? `$${req.TotalBudget.toFixed(2)}` : '$0.00',
          policyStatus: req.policyViolation ? 'Policy Violation' : 'Within Corporate Guidelines',
          image: this.getDefaultImage(), // You can implement logic to get actual images
          TravelReqId: req.travelReqId || req.TravelReqId, // Handles casing differences
          employeeId: req.employeeId || req.empoloyeeID // Fallbacks for employeeId
        }));
        
        // Also store the detailed data for the detail view
        this.detailedRequests = [...this.ALlrequests];
        
        // Set first request as selected by default
        this.selectedRequest = 0;
      } else {
        this.hasNoRequests = true;
        this.detailedRequests = [];
      }
    });
  }

  // Format date helper method
  formatDate(date: any): string {
    if (!date) return '';
    
    try {
      // Handle different date formats
      if (typeof date === 'string') {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      } else if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      }
      return date.toString();
    } catch (e) {
      return date.toString();
    }
  }

  // Get default image helper method
  getDefaultImage(): string {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5VrRwNXLOKTrd48oa7xvRCvDjMsdf3PQUnDev_hEgQcJlDeLtKfmwlkSz1jm5Mh5LVCZYajQG9fbcuofJKXn8C1ChMHPR6lt4VQYe1GuDgMEC8Phy0rNuT1lyw4rgwSYgUUxsYcu-xOsm0EGB0rJO0v2dijuzFn9UDTSu3XbUhtmkZwjX9sCMgjiMq98OYDTaJzK7LaPDC3yJeAlTSB4QvM3mgvPVdgOEXYaEXKXNcPhmO8igHsdrSVFfS_ly1WseXUU-vGpHRY';
  }

  selectRequest(index: number): void {
    this.selectedRequest = index;
    console.log('Selected request:', index);
  }

  approveRequest(form: NgForm): void {
     const selectedRequest = this.ALlrequests[this.selectedRequest];

  const payload = {

    remarks: form.value.comments,

    travelReqID: selectedRequest.travel_reqid,

    employeeid: selectedRequest.employeeid,

    approverID: this.currentManagerID,

    action: "APPROVED"
  };

  console.log('Form Data:', payload);

  this.adminService.approveRequest(payload).subscribe({
    next: (response) => {
      console.log('Approval successful:', response);
      this.getAllReqView();
    },
    error: (err) => {
      console.log("request rejected", err)
    }
  })

  

    // Add approval logic here
    // this.adminService.approveRequest(selectedRequestId).subscribe(...);
  }

  rejectRequest(form: NgForm): void {
    const selectedRequest = this.ALlrequests[this.selectedRequest];
    console.log('Rejecting request:', selectedRequest?.TravelReqId);

    const payload = {
    remarks: form.value.comments,

    travelReqID: selectedRequest.travel_reqid,

    employeeid: selectedRequest.employeeid,

    approverID: this.currentManagerID,

    action: "REJECTED"
    };

      this.adminService.approveRequest(payload).subscribe({
    next: (response) => {
      console.log('Approval successful:', response);
      this.getAllReqView();
    },
    error: (err) => {
      console.log("request rejected", err)
    }
  })

    console.log('Form Data:', payload);


    // Add rejection logic here
    // this.adminService.rejectRequest(selectedRequestId).subscribe(...);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  // Helper method to get travel dates in format "Oct 22 - Oct 25"
  getTravelDates(request: any): string {
    if (!request || !request.startDate || !request.endDate) {
      return 'Dates not available';
    }
    return `${request.startDate} - ${request.endDate}`;
  }

// approvalComment: string = '';

//   submitApproval(action: string): void {

//   const selectedRequest = this.detailedRequests[this.selectedRequest];

//   if (!selectedRequest) {
//     console.error('No request selected');
//     return;
//   }

//   const payload = {
//     requestId: selectedRequest.id,
//     comment: this.approvalComment,
//     status: action
//   };

//   console.log('Submitting Approval Payload:', payload);

//   // Service call will go here later
//   // this.adminService.updateApproval(payload).subscribe({
//   //   next: (response) => {
//   //     console.log('Success', response);
//   //   },
//   //   error: (err) => {
//   //     console.error('Error', err);
//   //   }
//   // });

// }
}