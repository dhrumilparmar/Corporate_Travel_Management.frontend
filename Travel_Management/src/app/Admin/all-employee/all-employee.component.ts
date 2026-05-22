import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminServiceService } from '../../service/admin-service.service';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AddEmployeeComponent} from '../add-employee-component/add-employee-component.component';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  manager: string;
  status: 'Active' | 'Out of Office' | 'On Leave';
  avatar?: string;
}

export interface Employee2 {
  id: string;
  emp_name: string;
  email: string;
  role: string;
  department: string;
  managerName: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatar?: string;
}
@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [CommonModule, FormsModule,
        RouterOutlet,       // ✅ needed for <router-outlet>
        RouterLink,         // ✅ needed for [routerLink]
        RouterLinkActive,
        AddEmployeeComponent
  ],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.scss'
})
export class AllEmployeeComponent {
// --- Component Properties ---
  searchQuery: string = '';
  selectedRole: string = 'All Roles';
  selectedManager: string = 'All Managers';
  currentPage: number = 1;
  itemsPerPage: number = 10;


  constructor(private adminService: AdminServiceService, private router: Router){}


  ngOnInit(){
    this.getEmployeesAll();
  }
employeesName:any[]=[];
  getEmployeesAll(){
    this.adminService.getAllEmployees().subscribe(data => {
      this.employeesName = data;
      console.log(this.employeesName);
      
      if (this.employeesName && this.employeesName.length > 0) {
        this.employee2 = this.employeesName.map((emp: any) => ({
          id: emp.employeeID,
          emp_name: emp.fullname,
          email: emp.email,
          department: emp.department?.departmentName || 'N/A',
          role: emp.role?.roleName || 'N/A',
          status: emp.status,
          managerName: emp.managerName || 'N/A',
          avatar: emp.avatarUrl || '' // Assuming the API provides an avatar URL
        }));
      }
    })
  }
  employee2:Employee2[] = [];


  // --- Getters for Filtering and Pagination ---

  get uniqueRoles(): string[] {
    return ['All Roles', ...Array.from(new Set(this.employee2.map(e => e.role)))];
  }

  get uniqueManagers(): string[] {
    return ['All Managers', ...Array.from(new Set(this.employee2.map(e => e.managerName)))];
  }

  get filteredEmployees(): Employee2[] {
    return this.employee2.filter(emp => {
      const matchesSearch = (emp.emp_name || '').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            (emp.email || '').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            (emp.id ? String(emp.id) : '').toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.selectedRole === 'All Roles' || emp.role === this.selectedRole;
      // const matchesManager = this.selectedManager === 'All Managers' || emp.manager === this.selectedManager;
      
      return matchesSearch && matchesRole; // && matchesManager;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get paginatedEmployees(): Employee2[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }

  // --- Methods ---

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-primary-fixed/30 text-primary';
      case 'Out of Office': return 'bg-surface-container text-on-surface-variant';
      case 'On Leave': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container text-on-surface-variant';
    }
  }

  getStatusDotClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-primary animate-pulse';
      case 'Out of Office': return 'bg-outline';
      case 'On Leave': return 'bg-error';
      default: return 'bg-outline';
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onExportCSV(): void {
    console.log('Exporting CSV...');
  }
  
  onAddEmployee(): void {
    console.log('Navigating to Add Employee...');
  }
  resetFilters(): void {
    this.searchQuery = '';
    this.selectedRole = 'All Roles';
    this.selectedManager = 'All Managers';
    this.currentPage = 1;
  }

  onUpdateEmployee(employeeID: any): void {
    console.log('Updating employee:', employeeID);
    // Fetch employee details, then navigate to the AddEmployee form with the employee data in navigation state
    this.adminService.getEmployeeById(employeeID).subscribe({
      next: (employee) => {
        console.log('Retrieved employee:', employee);
        this.router.navigate(['/admin/add-employee'], { state: { employee: employee, canUpdateEmployee: true } });
      },
      error: (error) => {
        console.error('Failed to retrieve employee:', error);
        // Fallback: still navigate but without full payload
        this.router.navigate(['/admin/add-employee'], { state: { employeeID: employeeID, canUpdateEmployee: true } });
      }
    });

    // Add your navigation or modal logic here
    // e.g., this.router.navigate(['/edit-employee', emp.id]);
  }

  onDeleteEmployee(emp: any): void {
    if (confirm(`Are you sure you want to delete ${emp.id}?`)) {
      this.adminService.deleteEmployee(emp.id).subscribe({
        next: (response) =>{
          console.log('Employee deleted successfully:', response);
          // Refresh the list after successful deletion
          this.getEmployeesAll();
        },
        error: (error) => {
          alert('Failed to delete employee: It May have some Travel Requests');
        }
      });
    }
  }
}
