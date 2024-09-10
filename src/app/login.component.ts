import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  newUsername: string = '';
  newPassword: string = '';
  registrationMessage: string = '';
  registeredUsers: { username: string, password: string }[] = [];
  isRegistering: boolean = false;


  constructor(private router: Router) { }

  toggleRegister() {
    this.isRegistering = true;
    document.querySelector('.container')?.classList.add('register-mode');
  }

  toggleLogin() {
    this.isRegistering = false;
    document.querySelector('.container')?.classList.remove('register-mode');
  }

  onRegister() {
    if (this.newUsername && this.newPassword) {
      const existingUser = this.registeredUsers.find(u => u.username === this.newUsername);
      if (!existingUser) {
        this.registeredUsers.push({ username: this.newUsername, password: this.newPassword });
        this.registrationMessage = 'Registration successful!';
        alert(this.registrationMessage);
        this.newUsername = '';
        this.newPassword = '';
        this.toggleLogin(); // Automatically switch to login form after registration
      } else {
        alert('Username already exists!');
      }
    } else {
      alert('Please fill in both fields.');
    }
  }


  onLogin() {
    // Simple login check
    const user = this.registeredUsers.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      this.router.navigate(['/dashboard']);  // Navigate to dashboard after successful login
    } else {
      alert('Invalid credentials');
    }
  }

  switchMode(mode: string) {
    const container = document.querySelector('.container');
    if (mode === 'register') {
      container?.classList.add('register-mode');
    } else {
      container?.classList.remove('register-mode');
    }
  }
}
