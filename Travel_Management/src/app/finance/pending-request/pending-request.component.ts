import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AdminServiceService } from '../../service/admin-service.service';
import { Router } from '@angular/router';

// Interface for a single request for strong typing
export interface FinanceRequest {
  id: string;
  trID: number;
  employeeid: number;
  employee: {
    name: string;
    initials: string;
    department: string;
    avatarColor: string; // e.g., 'bg-primary-fixed', 'bg-secondary-fixed'
    textColor: string; // e.g., 'text-on-primary-fixed', 'text-on-secondary-fixed'
  };
  budget: {
    amount: number;
  };
  policy: {
    isCompliant: boolean;
    text: string;
  };
  managerApproved: boolean;
}
@Component({
  selector: 'app-pending-request',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pending-request.component.html',
  styleUrl: './pending-request.component.scss'
})
export class PendingRequestComponentFinance {

  // --- Component Properties ---
  pendingRequestCount = 14;
  totalValue = 158420.00;
  avgProcessingTime = '4.2h';
  highValueCount = 3;
  currentPage = 1;
  currentFinanceID = 60;

  requests: FinanceRequest[] = []; 
    constructor(private router: Router, private adminService: AdminServiceService) {}

  ngOnInit(): void{

    this.getAllRequest();
  }

  getAllRequest(): void{
    this.adminService.getAllManagerApprovedReq().subscribe({
      next: (data) => {
        console.log('Finance view - All requests:', data);
        this.requests = data.map((req: any)=> ({
          id: req.requestCode,
          trID: req.travelReqId || req.travelReqID || req.travel_reqid || req.TravelReqId || req.id,
          employeeid: req.employeeid,
          employee: {
            name: req.employeeName,
            initials: req.employeeName.split(' ').map((n: string) => n[0]).join(''), // Get initials from name
            department: req.departmentName,
            avatarColor: 'bg-primary-fixed',
            textColor: 'text-on-primary-fixed'

          },
          budget: {
            amount: req.budgetAmount,
            currency: req.currency || '$'
          },
          policy: {
            isCompliant: !req.policyViolation,
            text: req.policyViolation ? 'Policy Violation' : 'Within Policy'
          },
          managerApproved: req.managerApprovalStatus === 'Manager Approved'
        }))

      
      },
      error: (error) => {
        console.error('Failed to load requests for finance view', error);
      }

    })
  }

  private buildFinanceActionPayload(travelReqID: number, action: 'APPROVED' | 'REJECTED') {
    const selectedRequest = this.requests.find(req => req.trID === travelReqID);
    return {
      travelReqID,
      approverID: this.currentFinanceID,
      action,
      employeeid: selectedRequest ? selectedRequest.employeeid : 0
    };
  }

  // --- Component Methods ---

  approveRequest(travelReqID: number): void {
    const payload = this.buildFinanceActionPayload(travelReqID, 'APPROVED');

    console.log('Posting finance approval payload:', payload);

    this.adminService.processFinanceRequest(payload).subscribe({
      next: (response) => {
        console.log('Request approved successfully:', response);
        this.getAllRequest();
      },
      error: (error) => {
        console.error('Failed to approve request:', error);
      }
    });
  }

  rejectRequest(travelReqID: number): void {
    const payload = this.buildFinanceActionPayload(travelReqID, 'REJECTED');

    console.log('Posting finance rejection payload:', payload);

    this.adminService.processFinanceRequest(payload).subscribe({
      next: (response) => {
        console.log('Request rejected successfully:', response);
        this.getAllRequest();
      },
      error: (error) => {
        console.error('Failed to reject request:', error);
      }
    });
  }
}
