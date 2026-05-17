import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,       // ✅ needed for <router-outlet>
    RouterLink,         // ✅ needed for [routerLink]
    RouterLinkActive    // ✅ needed for routerLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['']);
  }

  nav: { label: string; path: string ; icon: string}[] = [
    { label: 'My Requests', path: 'travel-requests',icon:'flight_takeoff' },
    { label: 'Create Request', path: 'new-request',icon:'add_circle' },
    { label: 'Expenses', path: 'expenses',icon:'receipt_long' },
    { label: 'Profile',path: 'profile',icon:'person'},

  ];


}