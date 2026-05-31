import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {AdminServiceService} from '../service/admin-service.service';
interface TravelRequest {
  id: string;
  destination: string;
  dates: string;
  status: 'Draft' | 'Submitted' | 'Manager Approved' | 'Finance Approved' | 'Rejected';
  purpose: string;
  travelReqID: number;

}

@Component({
  selector: 'app-travel-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class TravelRequestsComponent {

  employeesTravelReq:any[]=[];

  current_employeeID=59;
  constructor(private router: Router,  private adminService: AdminServiceService) {}

    ngOnInit(){
      this.getAlltrReq();
  }

  getAlltrReq(){
    this.adminService.getTravelRequests(this.current_employeeID).subscribe((data) => {
      this.employeesTravelReq = data;
      console.log(this.employeesTravelReq);

            if (this.employeesTravelReq && this.employeesTravelReq.length > 0) {
        this.travelRequests = this.employeesTravelReq.map((emp: any) => ({
          id: emp.requestCode,
          destination: emp.destination,          
          dates: emp.startTravel,
          status: emp.status,
          purpose: emp.purpose,
          travelReqID: emp.travelReqID,
        }));
      }
    });
  } 
    travelRequests: TravelRequest[] = [
    // { id: 'TR-9821', destination: 'London, UK', dates: 'May 12 - May 18', status: 'Draft' }
  ];


  onNewRequest(): void {
    this.router.navigate(['/create-request']);
  }

  onViewRequest(id: number): void {
    
    console.log('View request:', id);
  }

  onEditRequest(request: any): void {
    console.log('Edit request:', request);
    // Navigate to the new-request form with the full request object
    this.router.navigate(['/employee/new-request'], { state: { travelRequest: request, isEdit: true } });
  }

  onDeleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.travelRequests = this.travelRequests.filter(req => req.travelReqID !== id);
      this.adminService.deleteTravelReq(id).subscribe({
        next: (response: any) => {
          console.log('Travel Request deleted successfully:', response);
          // Refresh the list after successful deletion
          this.getAlltrReq();
        },
        error: (error: any) => {
          console.error('Failed to delete Travel Request:', error);
        }
      });
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

  isEditable(status?: string): boolean {
    if (!status) return false;
    return status.toLowerCase() === 'draft';
  }

  canDelete(status?: string): boolean {
    if (!status) return false;
    return status.toLowerCase() === 'draft';
  }

  goBackToNewRequest(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['/employee/new-request']);
  }
}
