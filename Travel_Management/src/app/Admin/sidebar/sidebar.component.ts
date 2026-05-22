import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,       // ✅ needed for <router-outlet>
    RouterLink,         // ✅ needed for [routerLink]
    RouterLinkActive    // ✅ needed for routerLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class AdminSidebarComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['']);
  }

  nav: { label: string; path: string ; icon: string}[] = [
    { label: 'Create Employee', path: 'add-employee',icon:'person_add' },
    { label: 'All Employee', path: 'all-employees',icon:'people' },
    { label: 'Expenses', path: 'expenses',icon:'receipt_long' },
    { label: 'Profile',path: 'profile',icon:'person'},
  ];
}