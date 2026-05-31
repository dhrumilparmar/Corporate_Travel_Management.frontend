import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminServiceService } from '../../service/admin-service.service';

interface RequestHistoryRow {
  requestCode: string;
  employeeName: string;
  departmentName: string;
  budgetAmount: number;
  currency: string;
  policyViolation: boolean;
  policyStatus: string;
  managerApprovalStatus: string;
  status: string;
}

@Component({
  selector: 'app-request-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.scss'
})
export class RequestHistoryComponent implements OnInit {
  constructor(private adminService: AdminServiceService) {}

  isDarkMode = true;
  requests: RequestHistoryRow[] = [];
  totalLogs = 0;
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.getAllManagerApprovedReq();
  }

  getAllManagerApprovedReq(): void {
    this.adminService.getAllManagerApprovedReq().subscribe({
      next: (data) => {
        const responseData = Array.isArray(data) ? data : data ? [data] : [];

        console.log(responseData)

        this.requests = responseData.map((req: any) => ({
          requestCode: req.requestCode ?? 'N/A',
          employeeName: req.employeeName ?? 'N/A',
          departmentName: req.departmentName ?? 'N/A',
          budgetAmount: Number(req.budgetAmount ?? 0),
          currency: req.currency ?? 'N/A',
          policyViolation: Boolean(req.policyViolation),
          policyStatus: req.policyStatus ?? 'Unknown',
          managerApprovalStatus: req.managerApprovalStatus ?? 'Pending',
          status: req.status ?? 'Unknown'
        }));
        
        this.totalLogs = this.requests.length;
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Failed to load manager approved requests', error);
        this.requests = [];
        this.totalLogs = 0;
        this.currentPage = 1;
      }
    });
  }

  get paginatedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.requests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.requests.length / this.itemsPerPage);
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
    console.log('Filters cleared');
  }
}
