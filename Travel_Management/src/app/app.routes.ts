import { Routes } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NewRequestFormComponent } from './new-request-form/new-request-form.component';
import { TravelRequestsComponent } from './my-requests/my-requests.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponentManager } from './manager/component/sidebar/sidebar.component';
import { PendingApprovalsComponent } from './manager/pending-approvals/pending-approvals.component';
import { RequestHistoryComponent } from './manager/request-history/request-history.component';
import { ManagerProfileComponent } from './manager/manager-profile/manager-profile.component';
import { LayoutComponent } from './finance/layout/layout.component';
import { PendingRequestComponentFinance } from './finance/pending-request/pending-request.component';
import { ReportSnapshotComponent } from './finance/report-snapshots/report-snapshots.component';
import {ProfileFinanceComponent} from './finance/profile-finance/profile-finance.component';
import {RequestHistoryFinanceComponent} from './finance/request-history-finance/request-history-finance.component';
import {NewRequestComponent} from './new-request/new-request.component';
import { BillSubmitionComponent } from './bill-submition/bill-submition.component';
import { SidebarComponentFinance } from './finance/sidebar/sidebar.component';
import { AddEmployeeComponent } from './Admin/add-employee-component/add-employee-component.component';
import { AdminSidebarComponent } from './Admin/sidebar/sidebar.component';
import { AllEmployeeComponent } from './Admin/all-employee/all-employee.component';
import { TravelRequestComponent } from './travel-request-new/travel-request-new.component';
import {AddExpenseComponent} from './add-expense/add-expense.component';
export const routes: Routes = [
{
  path: 'employee',
  component: SidebarComponent,
  children: [
    { path: '', redirectTo: 'travel-requests', pathMatch: 'full' },
    { path: 'new-request', component: TravelRequestComponent },
    { path: 'new-request/budget-details', component: BudgetDetailsComponent },
    { path: 'travel-requests', component: TravelRequestsComponent },
    { path: 'expenses', component: AddExpenseComponent },
    { path: 'addBills/:id', component: BillSubmitionComponent },
    { path: 'profile', component: ProfileSectionComponent },
  ]
},
  { path: '', component: LoginComponent},

{
    path: 'manager',
    component: SidebarComponentManager,   
    children: [
      { path: '', redirectTo: 'pending-requests', pathMatch: 'full' }, // Default to pending requests
      { path: 'pending-requests', component: PendingApprovalsComponent },
      { path: 'requests-history', component: RequestHistoryComponent },
      { path: 'expenses', component: BudgetDetailsComponent },
      { path: 'manager-profile', component: ManagerProfileComponent }, // Lowercase kebab case for consistency
    ]
  },


    {
    path: 'finance',
    component: SidebarComponentFinance,
    children: [
      { path: '', redirectTo: 'pending-requests', pathMatch: 'full' },
      { path: 'pending-requests', component: PendingRequestComponentFinance},
      { path: 'report-snapshots', component: ReportSnapshotComponent },
      { path: 'profile-finance', component: ProfileFinanceComponent},
      { path: 'request-history-finance', component: RequestHistoryFinanceComponent}
    ]
  },

  {
    path: 'admin',
    component: AdminSidebarComponent,
    children: [
      { path: '', redirectTo: 'all-employees', pathMatch: 'full' },

      {path: 'add-employee', component: AddEmployeeComponent},
      {path: 'all-employees', component: AllEmployeeComponent}

    ]
    
  }


];