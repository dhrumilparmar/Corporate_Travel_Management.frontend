import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ExpenseEntry {
  date: string;
  category: 'Dining' | 'Travel' | 'Hotel' | 'Miscellaneous';
  description: string;
  amount: number;
  receipt?: boolean;
}
@Component({
  selector: 'app-bill-submition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-submition.component.html',
  styleUrl: './bill-submition.component.scss'
})
export class BillSubmitionComponent {
  totalExpenses = 4290.45;
  reimbursementProgress = 75;
  
  pendingExpenses: ExpenseEntry[] = [
    { date: 'Oct 14, 2023', category: 'Dining', description: 'Business dinner at Sushi Saito', amount: 450.00, receipt: true },
    { date: 'Oct 12, 2023', category: 'Travel', description: 'Narita Express Transfer', amount: 28.50, receipt: true },
    { date: 'Oct 12, 2023', category: 'Hotel', description: 'Park Hyatt Tokyo (Deposit)', amount: 1200.00, receipt: true }
  ];

  constructor(private router: Router) {}

  onAddExpense(): void {
    console.log('Expense added');
  }

  onSubmitReport(): void {
    console.log('Report submitted');
    alert('Expense report submitted successfully!');
  }

  onViewReceipt(index: number): void {
    console.log('Viewing receipt:', index);
  }
  triggerUpload(){
    console.log('Upload triggered');
  }
}


