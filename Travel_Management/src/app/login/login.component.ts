import { Component } from '@angular/core';
import { AdminServiceService } from '../service/admin-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


    loginData: any = {
    userEmail: '',
    password: ''
  };

  errorMessage = '';

    constructor(private router: Router, private adminService: AdminServiceService) {}
  

    login(): void {
      this.adminService.login(this.loginData).subscribe({
        next: (response) => {
          this.adminService.saveLoginData(response);
          console.log(response);

          // Redirect based on role
          const role = response.role;
          if (role === 'EMPLOYEE') {
            this.router.navigate(['/employee']);
          } else if (role === 'MANAGER') {
            this.router.navigate(['/manager']);
          } else if (role === 'FINANCE') {
            this.router.navigate(['/finance']);
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Invalid email or password';
        }
      });
    }

}
