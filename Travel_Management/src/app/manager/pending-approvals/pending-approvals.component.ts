import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-approvals.component.html',
  styleUrl: './pending-approvals.component.scss'
})
export class PendingApprovalsComponent {
    selectedRequest = 0;
  isDarkMode = false;

  requests = [

    {
      id: '#TR-1025',
      status: 'Pending',
      traveler: 'Sarah Jenkins',
      role: 'Senior Product Manager',
      location: 'Singapore, SG',
      dates: 'Oct 22-25',
      purpose: 'Product launch event and regional team coordination',
      budget: '$3,850.00',
      policyStatus: 'Within Corporate Guidelines',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5VrRwNXLOKTrd48oa7xvRCvDjMsdf3PQUnDev_hEgQcJlDeLtKfmwlkSz1jm5Mh5LVCZYajQG9fbcuofJKXn8C1ChMHPR6lt4VQYe1GuDgMEC8Phy0rNuT1lyw4rgwSYgUUxsYcu-xOsm0EGB0rJO0v2dijuzFn9UDTSu3XbUhtmkZwjX9sCMgjiMq98OYDTaJzK7LaPDC3yJeAlTSB4QvM3mgvPVdgOEXYaEXKXNcPhmO8igHsdrSVFfS_ly1WseXUU-vGpHRY'
    },
    {
      id: '#TR-1028',
      status: 'Pending',
      traveler: 'Marcus Thorne',
      role: 'Account Executive',
      location: 'New York, USA',
      dates: 'Nov 02-08',
      purpose: 'Client onboarding and contract signing',
      budget: '$2,950.00',
      policyStatus: 'Within Corporate Guidelines',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGsKVZvKgjQ9UTkxlOjuCnKrDTpPWdwEt2QDEi77rs6am72jzFZGqcbh9isiavZp9efpOX8nzSEHmkX_4B4Lud4EX5RXmOz9qC5CxV0fFdrbpD4JbzzskTBQ3tG3KB4uygkaZb-uJOTq5jeosEXF_b7Rz0XeMLfd7paEPu3g2PsexakiLm1-nOkUktJkRExqkMPrgdok6TYH6_Vd0YZEwqECettjruChHQiZl76kjnRAfM2AB3UVab3JXjuqcRGCvkodeyXCY6Zhw'
    },
    {
      id: '#TR-1031',
      status: 'Pending',
      traveler: 'Elena Rodriguez',
      role: 'Marketing Director',
      location: 'Berlin, DE',
      dates: 'Nov 15-20',
      purpose: 'Marketing strategy workshop and team alignment',
      budget: '$3,200.00',
      policyStatus: 'Within Corporate Guidelines',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvXJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ'
    }
  ];

  selectRequest(index: number): void {
    this.selectedRequest = index;
  }

  approveRequest(): void {
    console.log('Request approved');
    // Add approval logic here
  }

  rejectRequest(): void {
    console.log('Request rejected');
    // Add rejection logic here
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}








