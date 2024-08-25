import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../mail/mail.service';  
import { DatePipe } from '@angular/common'; 
import { NgForm } from '@angular/forms';

interface Mail {
  id: number; 
  name: string;
  email: string;
  mailType: string;
  detail: string;
  date: string;
  tabType?: string;
  image?: string;
  selected?: boolean;

  
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  emails: Mail[] = [];
  filteredEmails: Mail[] = [];
  currentTab: string = 'Inbox';

  unreadEmailsCount: number = 0; 
  calculateUnreadEmailsCount() {
    this.unreadEmailsCount = this.emails.filter(email => email.tabType === 'Inbox' && !email.selected).length;
  }
  private nextId: number = 10; 
 
  constructor(private router: Router,private mailService: MailService, ) {
    const state = window.history.state;
    if (state && state.updatedMail !== undefined && state.index !== undefined) {
      this.updateEmail(state.index, state.updatedMail);
    } else if (state && state.newMail !== undefined) {
      this.addNewMail(state.newMail);
    }
    
    this.filterMessages(this.currentTab);
    this.calculateUnreadEmailsCount(); // Calculate initially
  }

  sendMail(emailForm: any) {
    // Create a new email object based on form data
    const newMail: Mail = {
      id: this.emails.length + 1, // Generate a new ID
      name: emailForm.name, // Assume form control name is 'name'
      email: emailForm.email, // Assume form control name is 'email'
      mailType: emailForm.mailType || 'Personal', // Default mail type
      detail: emailForm.detail, // Assume form control name is 'detail'
      date: new Date().toLocaleDateString('en-GB'), // Format date as day-month-year
      tabType: 'Sent', // Mark it as a sent email
      image: emailForm.image || 'assets/images/default.png' // Default image if not provided
    };
  
    // Add the new email to the service
    this.mailService.addMail(newMail);
  
    // Refresh the 'Sent' tab to show the new email
    this.filterMessages('Sent');
    
  }
  
  
  ngOnInit() {
    const state = window.history.state;
    this.emails = this.mailService.getMailObj();
    
    if (state && state.updatedMail !== undefined && state.index !== undefined) {
      this.updateEmail(state.index, state.updatedMail);
    } else if (state && state.newMail !== undefined) {
      this.addNewMail(state.newMail);
    }
    
    this.filterMessages(this.currentTab);
    this.calculateUnreadEmailsCount(); // Calculate initially
  }

  toggleStar(email: any) {
    email.starred = !email.starred;
  }
  filterMessages(tabType: string) {
    this.currentTab = tabType;
    this.filteredEmails = this.emails.filter(email => email.tabType === tabType);
    console.log('Filtered emails for tab', tabType, ':', this.filteredEmails); // Debugging
    this.calculateUnreadEmailsCount(); // Recalculate when filtering
  }

  addMail() {
    this.router.navigate(['/mail'], { state: { index: null } });
  }
  

  deleteMail(index: number) {
    const emailToDelete = this.filteredEmails[index];
    console.log('Attempting to delete email:', emailToDelete); // Debugging

    // Remove the email from the filtered list
    this.filteredEmails.splice(index, 1);
    console.log('Filtered emails after deletion:', this.filteredEmails); // Debugging

    // Check if email is already in Deleted tab
    const emailInDeletedTab = this.emails.find(
      email => email.id === emailToDelete.id && email.tabType === 'Deleted'
    );

    if (!emailInDeletedTab) {
      // Update the email’s tabType to 'Deleted' and add to the main list
      emailToDelete.tabType = 'Deleted';
      this.emails = this.emails.filter(email => email.id !== emailToDelete.id); // Remove from original list
      this.emails.push(emailToDelete);
      console.log('Added email to Deleted tab:', emailToDelete); // Debugging
    } else {
      console.log('Email is already in Deleted tab:', emailInDeletedTab); // Debugging
    }

    // Refresh the view to reflect changes
    this.filterMessages(this.currentTab);
    this.calculateUnreadEmailsCount(); // Recalculate after deletion
  }

  editMail(index: number) {
    this.router.navigate(['/mail'], { state: { email: this.emails[index], index: index } });
  }
  addNewMail(newMail: Mail) {
    // Check for existing mail to avoid duplicates
    const existingMail = this.emails.find(
      email => email.email === newMail.email && email.tabType === newMail.tabType
    );
    if (!existingMail) {
      this.emails.push(newMail);
      this.filterMessages(this.currentTab);
      this.calculateUnreadEmailsCount(); // Recalculate after addition
    }
  }
  updateEmail(index: number | null, updatedMail: Mail) {
    if (index === null) {
      // Add new mail (with unique ID)
      updatedMail.id = this.nextId++;
      this.emails.push(updatedMail);
      console.log('Added new mail:', updatedMail); // Debugging
    } else {
      // Update existing mail
      this.emails[index] = updatedMail;
      console.log('Updated mail:', updatedMail); // Debugging
    }
  
   
    this.filterMessages(this.currentTab);
    this.calculateUnreadEmailsCount(); // Recalculate after update
  }
  
  // sentEmails: any[] = []; // Store sent emails

  // onSendEmail(form: NgForm) {
  //   if (form.invalid) return;

  //   const { to, subject, text } = form.value;
    
  //   this.emailService.sendEmail(to, subject, text).subscribe(
  //     response => {
  //       console.log('Email sent successfully!', response);
  //       this.addToSentEmails({ to, subject, text, date: new Date() }); // Add to sent emails
  //       form.reset();
  //     },
  //     error => {
  //       console.error('Error sending email:', error);
  //     }
  //   );
  // }

  // addToSentEmails(email: Mail) {
  //   this.sentEmails.push(email);
  //   this.mailService.setMailObj([...this.emails, email]); // Update mail service
  //   this.filterMessages('Sent'); // Refresh 'Sent' tab
  // }

  

  // cancelEmail() {
  //   this.showEmailForm = false;
  // }
  
}
