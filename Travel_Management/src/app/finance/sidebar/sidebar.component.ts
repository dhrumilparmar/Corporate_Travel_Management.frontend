import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, // 2. Add CommonModule here
    RouterOutlet,       
    RouterLink,         
    RouterLinkActive    
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponentFinance {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['']);
  }

}