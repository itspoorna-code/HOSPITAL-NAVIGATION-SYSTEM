import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selectedRole: string = '';
  email: string = '';
  password: string = '';

  // Predefined list of credentials
  private storedCredentials = [
    { email: 'admin1@example.com', password: 'password1' },
    { email: 'admin2@example.com', password: 'password2' },
    { email: 'admin3@example.com', password: 'password3' },
  ];

  constructor(private router: Router) {}

  onSubmit() {
    if (this.selectedRole === 'admin') {
      // Check if email and password match any of the stored credentials
      const validUser = this.storedCredentials.find(
        (user) => user.email === this.email && user.password === this.password
      );

      if (validUser) {
        console.log('You are logged in as an Admin');
        this.router.navigate(['/admin']);
      } else {
        alert('Enter correct admin credentials');
      }
    } else {
      alert('Please select a role to proceed!');
    }
  }

  onGuest() {
    this.router.navigate(['/user']);
    alert('You are logged in as a Guest');
  }

  // Email validation method
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
