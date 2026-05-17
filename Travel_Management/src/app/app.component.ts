import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {NewRequestFormComponent} from './new-request-form/new-request-form.component';
import { SidebarComponentManager } from './manager/component/sidebar/sidebar.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
          CommonModule,
          LoginComponent,
          SidebarComponent,
          SidebarComponentManager,
          NewRequestFormComponent
          
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Travel_Management';
  isLoginPage = false;
}
