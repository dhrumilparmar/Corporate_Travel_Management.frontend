import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
interface TravelRequest {
  id: string;
  destination: string;
  dates: string;
  status: 'Draft' | 'Submitted' | 'Manager Approved' | 'Finance Approved' | 'Rejected';
}

@Component({
  selector: 'app-travel-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class TravelRequestsComponent {
  travelRequests: TravelRequest[] = [
    { id: 'TR-9821', destination: 'London, UK', dates: 'May 12 - May 18', status: 'Draft' },
    { id: 'TR-9805', destination: 'Tokyo, Japan', dates: 'Jun 04 - Jun 10', status: 'Submitted' },
    { id: 'TR-9788', destination: 'Paris, France', dates: 'Apr 20 - Apr 25', status: 'Manager Approved' },
    { id: 'TR-9750', destination: 'New York, USA', dates: 'Mar 15 - Mar 18', status: 'Finance Approved' },
    { id: 'TR-9712', destination: 'Berlin, Germany', dates: 'Feb 10 - Feb 14', status: 'Rejected' }
  ];

  constructor(private router: Router) {}

  onNewRequest(): void {
    this.router.navigate(['/create-request']);
  }

  onViewRequest(id: string): void {
    console.log('View request:', id);
  }

  onEditRequest(id: string): void {
    console.log('Edit request:', id);
  }

  onDeleteRequest(id: string): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.travelRequests = this.travelRequests.filter(req => req.id !== id);
    }
  }

  getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Draft': '#e0e3e5',
    'Submitted': '#cfe5ff',
    'Manager Approved': '#d6e3ff',
    'Finance Approved': '#dcfce7',
    'Rejected': '#ffdad6'
  };
  return colors[status] || '#e0e3e5';
}

getTextColor(status: string): string {
  const colors: Record<string, string> = {
    'Draft': '#43474e',
    'Submitted': '#001d34',
    'Manager Approved': '#2d476f',
    'Finance Approved': '#166534',
    'Rejected': '#93000a'
  };
  return colors[status] || '#191c1e';
}

  goBackToNewRequest(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['/employee/new-request']);
  }
}
