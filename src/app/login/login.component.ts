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
  newUsername: string;
  newPassword: string;
  errorMessage: string;
  registrationMessage: string;


  constructor(private router: Router) { }
  onLogin() {
    const user = JSON.parse(localStorage.getItem(this.username));
    if (user && user.password === this.password) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials!';
    }
  }

  onRegister() {
    if (localStorage.getItem(this.newUsername)) {
      this.registrationMessage = 'Username already taken!';
    } else {
      const user = { username: this.newUsername, password: this.newPassword };
      localStorage.setItem(this.newUsername, JSON.stringify(user));
      this.registrationMessage = 'Registration successful! You can now log in.';
    }
  }
}
