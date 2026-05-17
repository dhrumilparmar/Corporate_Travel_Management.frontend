import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponentFinance } from '../sidebar/sidebar.component'; // Adjust path if needed

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponentFinance],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}