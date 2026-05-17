import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

// Interface for a single request for strong typing
export interface FinanceRequest {
  id: string;
  employee: {
    name: string;
    initials: string;
    department: string;
    avatarColor: string; // e.g., 'bg-primary-fixed', 'bg-secondary-fixed'
    textColor: string; // e.g., 'text-on-primary-fixed', 'text-on-secondary-fixed'
  };
  amount: {
    value: number;
    currency: string;
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

  // Mock data for the table
  requests: FinanceRequest[] = [
    {
      id: '#TR-1042',
      employee: {
        name: 'Jonathan Sterling',
        initials: 'JS',
        department: 'Strategic Operations',
        avatarColor: 'bg-primary-fixed',
        textColor: 'text-on-primary-fixed'
      },
      amount: { value: 4250.00, currency: 'USD' },
      policy: { isCompliant: true, text: 'Within Policy' },
      managerApproved: true,
    },
    {
      id: '#TR-1045',
      employee: {
        name: 'Elena Aris',
        initials: 'EA',
        department: 'Global Sales',
        avatarColor: 'bg-secondary-fixed',
        textColor: 'text-on-secondary-fixed'
      },
      amount: { value: 12800.00, currency: 'USD' },
      policy: { isCompliant: false, text: '⚠️ Policy Violation' },
      managerApproved: true,
    },
    {
      id: '#TR-1048',
      employee: {
        name: 'Marcus Kael',
        initials: 'MK',
        department: 'Product Design',
        avatarColor: 'bg-tertiary-fixed',
        textColor: 'text-on-tertiary-fixed'
      },
      amount: { value: 1120.50, currency: 'USD' },
      policy: { isCompliant: true, text: 'Within Policy' },
      managerApproved: true,
    },
    {
      id: '#TR-1051',
      employee: {
        name: 'Lucia Hemmingway',
        initials: 'LH',
        department: 'Executive Suite',
        avatarColor: 'bg-primary-fixed-dim',
        textColor: 'text-on-primary-fixed'
      },
      amount: { value: 8900.00, currency: 'USD' },
      policy: { isCompliant: true, text: 'Within Policy' },
      managerApproved: true,
    },
  ];

  // --- Component Methods ---

  approveRequest(requestId: string): void {
    console.log(`Approving request: ${requestId}`);
    // In a real app, you would call a service to update the backend
    // and then remove the item from the local 'requests' array.
  }

  rejectRequest(requestId: string): void {
    console.log(`Rejecting request: ${requestId}`);
    // Similar to approve, call a service and update the local state.
  }
}
