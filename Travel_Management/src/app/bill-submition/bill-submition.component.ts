import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';

interface ExpenseEntry {
  date: string;
  categoryID: number;
  description: string;
  amount: number;
  receipt?: boolean;
  employeeId: number
}
@Component({
  selector: 'app-bill-submition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bill-submition.component.html',
  styleUrl: './bill-submition.component.scss'
})
export class BillSubmitionComponent implements OnInit {
  totalExpenses = 4290.45;
  reimbursementProgress = 75;
  requestId: string | null = null;
  
  pendingExpenses: ExpenseEntry[] = [];

  categoryLabels: Record<number, string> = {
    1: 'Travel & Airfare',
    2: 'Food & Dining',
    3: 'Hotel & Lodging',
    4: 'Miscellaneous'
  };

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminServiceService) {}
  employeeID = Number(localStorage.getItem('employeeId')) ;
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.requestId = (idParam && idParam !== 'null') ? idParam : null;
    const employeeIdParam = this.route.snapshot.paramMap.get('employeeId');
    if (employeeIdParam) {
      // this.employeeID = parseInt(employeeIdParam, 10);
    }
    console.log(`BillSubmitionComponent loaded for request ID: ${this.requestId}`);
  }

  private buildExpenseEntry(formValue: any): ExpenseEntry {
    return {
      date: formValue.date,
      categoryID: parseInt(formValue.category, 10),
      description: formValue.description,
      amount: Number(formValue.amount),
      receipt: formValue.receipt || false,
      employeeId: this.employeeID,


    };
  }

  private buildExpensePayload(expense: ExpenseEntry): any {
    return {
      travelReqId: this.requestId ? parseInt(this.requestId, 10) : null,
      expenseDate: expense.date,
      categoryId: expense.categoryID,
      description: expense.description,
      amount: expense.amount,
      receiptFile: expense.receipt || null
    };
  }

  getCategoryLabel(categoryID: number): string {
    return this.categoryLabels[categoryID] ?? 'Unknown';
  }

  saveExpense(form: NgForm): void {
    if (form.invalid) return;

    const payload = this.buildExpensePayload(this.buildExpenseEntry(form.value));

    // this.adminService.saveExpenseById(payload).subscribe({
    //   next: (response) => {
    //     console.log('Expense saved successfully:', response);
    //   },
    //   error: (error) => {
    //     console.error('Failed to save expense:', error);
    //   }
    // });
  }

  onAddExpense(form: NgForm): void {
    if (form.invalid) return;

    const newExpense = this.buildExpenseEntry(form.value);
    this.pendingExpenses.push(newExpense);
    console.log('Expense added to pending submission:', newExpense);
    form.resetForm();
  }

  onSubmitReport(): void {
    console.log(this.pendingExpenses);
    if (!this.pendingExpenses.length) {
      alert('No expenses to submit. Please add at least one expense before submitting.');
      return;
    }

    if (!this.requestId) {
      alert('Error: Travel Request ID is missing. Cannot submit expenses.');
      return;
    }

    // Build payload matching backend DTO: ExpenseCreateRequest
    const payload = {
      travelRequestId: this.requestId ? parseInt(this.requestId, 10) : null,
      employeeId: this.employeeID,
      expenses: this.pendingExpenses.map(expense => ({
        amount: expense.amount,
        categoryId: expense.categoryID,
        date: expense.date,
        description: expense.description,
        receipt: expense.receipt || false
      }))
    };

    this.adminService.saveExpenseById(payload).subscribe({
      next: (response) => {
        console.log('Expense report submitted successfully:', response);
        alert('Expense report submitted successfully!');
        this.pendingExpenses = [];
      },
      error: (error) => {
        console.error('Failed to submit expense report:', error);
        alert('Unable to submit report. Please try again.');
      }
    });
  }

  onViewReceipt(index: number): void {
    console.log('Viewing receipt:', index);
  }
  triggerUpload(){
    console.log('Upload triggered');
  }
}
