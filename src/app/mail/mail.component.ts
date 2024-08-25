import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MailService } from '../mail/mail.service';

interface Mail {
  name: string;
  email: string;
  mailType: string;
  detail: string;
  date: string;
  tabType: string;
  image?: string;
}
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MailComponent implements OnInit {
  mail = { name: '', email: '', mailType: '', detail: '', date: '', tabType: '' }; // Ensure 'email' is included
  mailTypes = ['Work', 'Business', 'Friend', 'Important'];
  index: number | null = null;
  selectedMail: any = {}; // Object to hold the mail being edited
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit() {
    const state = window.history.state;
    if (state && state.email) {
      this.mail = state.email;
      this.index = state.index;
    }
  }
  saveMail() {
    if (!this.mail.tabType) {
      this.mail.tabType = 'Inbox';
    }
    // if (this.mail && !this.mail.image) {
    //   this.mail.image = 'assets/images/default-user.png'; // Default image if none is provided
    // }


    // Navigate back to the dashboard with the updated mail
    this.router.navigate(['/dashboard'], { state: { updatedMail: this.mail, index: this.index } });

  }
  
  cancel() {
    // Simply go back to the previous page without saving changes
    this.location.back();
  }
  editMail(mail: any) {
    this.router.navigate(['/edit-mail', mail.id]);
    this.selectedMail = { ...mail };
  }


}