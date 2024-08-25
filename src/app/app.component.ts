import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mail-app-studentname';
}
// // mail.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-mail',
//   templateUrl: './mail.component.html',
//   styleUrls: ['./mail.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class MailComponent { }