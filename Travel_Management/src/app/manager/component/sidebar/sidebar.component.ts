import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { PendingApprovalsComponent } from '../../pending-approvals/pending-approvals.component';
import { RequestHistoryComponent } from '../../request-history/request-history.component';
import { ManagerProfileComponent } from '../../manager-profile/manager-profile.component';

@Component({
  selector: 'app-sidebar-manager',
  standalone: true,
  imports: [CommonModule, RouterModule,
    RequestHistoryComponent,
    ManagerProfileComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponentManager{
  constructor(private router: Router) {}

  goToLogin(): void {
    // Navigate back to create-request or previous step
    this.router.navigate(['']);
  }
}
