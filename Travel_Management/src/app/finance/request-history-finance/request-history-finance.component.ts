import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../service/admin-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-history-finance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-history-finance.component.html',
  styleUrl: './request-history-finance.component.scss'
})
export class RequestHistoryFinanceComponent {
isDarkMode = false;
    constructor(private router: Router, private adminService: AdminServiceService) {}
ngOnInit() {

  this.getAllRequest();
  // currentFinanceID: any = localStorage.getItem('financeId');

}
  currentFinanceID = 60; 
getAllRequest(): void{
  // Call the service to fetch all requests and assign to this.requests
  this.adminService.getAllFinanceApprovedReq(this.currentFinanceID).subscribe({
    next: (data) => {
      console.log('Finance view - All requests:', data);

      // Helper function to format date as DD-MMM (e.g., 25-May)
      const formatDateMonth = (dateString: string) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        const day = d.getDate().toString().padStart(2, '0');
        const month = d.toLocaleString('en-US', { month: 'short' });
        return `${day}-${month}`;
      };

      this.requests = data.map((item: any) => ({
        employee: {
          name: item.employeeName,
          title: item.department, // Using department in place of the title
          // Automatically generate an initials avatar based on the employee's name
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.employeeName)}&background=random`,
          travel: item.travelRequest
        },
        destination: {
          location: item.destination,
          dates: item.start_travel && item.end_travel ? `${formatDateMonth(item.start_travel)} to ${formatDateMonth(item.end_travel)}` : 'Dates TBA'
        },
        status: {
          label: item.status ? item.status.replace('_', ' ') : 'Approved', // e.g. changes "FINANCE_APPROVED" to "FINANCE APPROVED"
          type: item.status ? item.status.toLowerCase() : 'approved',
          date: item.approvedTime ? formatDateMonth(item.approvedTime) : 'N/A' 
        }
      }));
    },
    error: (err)=>{
      console.error('Error fetching finance approved requests:', err);
    }

  })

}

  currentPage = 1;
  itemsPerPage = 5;

  requests: any[] = [];
  searchTerm = '';
  statusFilter = '';

  get filteredRequests() {
    return this.requests.filter(request => {
      const matchesSearch = this.searchTerm 
        ? request.employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          request.destination.location.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
        
      const matchesStatus = this.statusFilter
        ? request.status.type === this.statusFilter.toLowerCase()
        : true;
        
      return matchesSearch && matchesStatus;
    });
  }

  get totalLogs() {
    return this.filteredRequests.length;
  }

  get paginatedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRequests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.currentPage = 1;
    console.log('Filters cleared');
  }
}
