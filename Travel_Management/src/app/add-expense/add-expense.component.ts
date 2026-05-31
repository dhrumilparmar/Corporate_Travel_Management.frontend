
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';
interface TravelRequest {
  id: string | number;
  destination: string;
  purpose: string;
  imageUrl: string;
  imageAlt: string;
  startDate: Date;
  endDate: Date;
  daysUntilTrip: number;
  budget: number;
  status: 'approved' | 'pending' | 'completed';
  isUrgent?: boolean;
  reqID: string;

}

interface DashboardStats {
  activeTrips: number;
  totalBudget: number;
}

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {
  stats: DashboardStats = {
    activeTrips: 3,
    totalBudget: 14500
  };

  travelRequests: TravelRequest[] = [];

    constructor(private router: Router, private adminService: AdminServiceService) {}
  ngOnInit(): void {
    this.calculateDaysUntilTrip();
    this.getAllFinTrExpense();

  }
employeeid = Number(localStorage.getItem('employeeId')) ;

  getAllFinTrExpense(): void{
    this.adminService.getAllFinanceApprovedExpense(this.employeeid).subscribe({
      next: (data: any[]) => {
        console.log("Finance view - All approved expenses:", data);
        if (data && Array.isArray(data)) {
          this.travelRequests = data.map(item => ({
            id: item.travelCode,
            reqID: item.travelReqID,
            destination: item.destination,
            purpose: 'Business Travel', // Default value since it's missing in API response
            imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop', // Default placeholder image
            imageAlt: `Travel to ${item.destination}`,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
            daysUntilTrip: 0, // Placeholder, will be properly calculated next
            budget: item.totalBudget,
            status: item.status === 'FINANCE_APPROVED' ? 'approved' : 'pending'
          }));
          this.calculateDaysUntilTrip();
        }
      },
      error: (err) => {
        console.error("Error fetching finance approved expenses:", err);
      }
    })
  }

  calculateDaysUntilTrip(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.travelRequests.forEach(request => {
      const tripDate = new Date(request.startDate);
      tripDate.setHours(0, 0, 0, 0);
      const diffTime = tripDate.getTime() - today.getTime();
      request.daysUntilTrip = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      request.isUrgent = request.daysUntilTrip <= 7;
    });
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  formatBudgetShort(amount: number): string {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  }

  formatDateRange(startDate: Date, endDate: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    return `${start} - ${end}`;
  }

  getDaysUntilTripText(days: number): string {
    if (days === 0) return 'TRIP TODAY';
    if (days === 1) return '1 DAY UNTIL TRIP';
    if (days < 0) return 'TRIP COMPLETED';
    return `${days} DAYS UNTIL TRIP`;
  }

  navigateToExpense(requestId: string | number): void {
    console.log(`Navigating to bill submission for request ID: ${requestId}`);
    this.router.navigate(['/employee/addBills', requestId]);
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  contactAgent(): void {
    console.log('Opening concierge support...');
    // Implement your contact agent logic here
    alert('Connecting you to our 24/7 concierge team...');
  }

  viewGuidelines(): void {
    console.log('Opening travel policy guidelines...');
    // Implement your guidelines view logic here
    this.router.navigate(['/travel-policy']);
  }

  onRowClick(event: Event, request: TravelRequest): void {
    const target = event.target as HTMLElement;
    // Don't trigger if clicking on button
    if (target.tagName !== 'BUTTON' && !target.closest('button')) {
      console.log('Row clicked:', request);
      // Optional: expand details or navigate
    }
  }
}