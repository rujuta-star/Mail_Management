import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MailService {
  private mailObj = [
    { id: 1 , name: 'Sneha Reddy', email: 'sneha@example.com', mailType: 'Work', detail: 'Just a reminder that the project deadline is approaching. Please ensure all tasks are completed by end of the week.', date: '1-08-2024', tabType: 'Inbox',starred: false,image: 'assets/images/user7.jpeg'  },
    { id: 2, name: 'Ravi Kumar', email: 'ravi@example.com', mailType: 'Business', detail: 'Attached is the quarterly report for review. Let me know if you have any questions or need further details.', date: '2-08-2024', tabType: 'Inbox',image: 'assets/images/user4.png'  },
    { id: 3, name: 'Hanna Sharma', email: 'hanna@example.com', mailType: 'Friend', detail: 'Hey! It’s been a while. Let’s catch up over coffee this weekend. Let me know what works for you!', date: '3-08-2024', tabType: 'Inbox',image: 'assets/images/user11.jpeg'  },
    { id: 4, name: 'Ananya Desai', email: 'ananya@example.com', mailType: 'Work', detail: 'The project is on track for completion. Please review the latest report attached.', date: '4-08-2024', tabType: 'Inbox',image: 'assets/images/user2.jpeg'  },
    { id: 5, name: 'Harry Callum', email: 'harry@example.com', mailType: 'Work', detail: 'Please review the attached report for details.', date: '5-08-2024', tabType: 'Inbox',image: 'assets/images/user8.jpeg'  },
    { id: 6, name: 'Vikram Singh', email: 'vikram@example.com', mailType: 'Important', detail: 'We need to update the system urgently due to a critical issue. Please follow the instructions sent earlier.', date: '6-08-2024', tabType: 'Inbox',image: 'assets/images/user5.jpeg'  },
    { id: 7, name: 'Rahul modi', email: 'rahul@example.com', mailType: 'Business', detail: 'The meeting is scheduled for tomorrow at 2 PM. Please confirm your availability.', date: '7-08-2024', tabType: 'Inbox',image: 'assets/images/user10.jpeg' },
    { id: 8, name: 'Priya Mehta', email: 'priya@example.com', mailType: 'Friend', detail: 'Let’s meet up this weekend. How about Saturday afternoon?', date: '8-08-2024', tabType: 'Inbox',image: 'assets/images/user1.png'},
    { id: 9, name: 'Amit Joshi', email: 'amit@example.com', mailType: 'Important', detail: 'Immediate attention needed for the attached document. Please review and respond by end of day.', date: '9-08-2024', tabType: 'Inbox',image: 'assets/images/user9.jpg' },
     // Spam Emails
     { id: 10, name: 'Rakesh Mukhrji', email:'rakesh@example.com', mailType: 'Spam', detail: 'You have won a prize! Click here to claim it.', date: '10-08-2024', tabType: 'Spam', image: 'assets/images/user9.jpg' },
     { id: 11, name: 'Sakshi awachar', email: 'sakshi@example.com', mailType: 'Spam', detail: 'Get rich quickly with this amazing scheme!', date: '11-08-2024', tabType: 'Spam', image: 'assets/images/user6.jpeg' },
     { id: 12, name: 'Rashmi Desai', email: 'rashmi@example.com', mailType: 'Spam', detail: 'Your account has been compromised. Click here to secure it.', date: '12-08-2024', tabType: 'Spam', image: 'assets/images/user3.png' },
     // Add example sent emails
     { id: 13, name: 'Genelia Smith', email: 'Genelia@example.com', mailType: 'Work', detail: 'Meeting notes attached.', date: '20-08-2024', tabType: 'Sent', image: 'assets/images/user2.jpeg' },
     { id: 14, name: 'Bob Johnson', email: 'bob@example.com', mailType: 'Business', detail: 'Please review the attached proposal.', date: '21-08-2024', tabType: 'Sent', image: 'assets/images/user9.jpg'  },

  ];
  getUnreadEmailsCount(): number {
    return this.mailObj.filter(mail => mail.tabType === 'Inbox').length;
  }


  private idGenerator: number = this.mailObj.length > 0 ? Math.max(...this.mailObj.map(mail => mail.id)) + 1 : 1;
  private updatedID: number = 0;

 
  // Get all mails (including Inbox, Spam, etc.)
  getMailObj() {
    return this.mailObj;
  }

  // Get only Inbox emails
  getInboxEmails() {
    return this.mailObj.filter(mail => mail.tabType === 'Inbox');
  }

  // Get only Spam emails
  getSpamEmails() {
    return this.mailObj.filter(mail => mail.tabType === 'Spam');
  }

  getUpdatedID() {
    return this.updatedID;
  }

  addMail(mail: any) {
    mail.id = this.idGenerator++;
    this.mailObj.push(mail);
  }

  updateMail(mail: any) {
    const index = this.mailObj.findIndex(m => m.id === mail.id);
    if (index !== -1) {
      this.mailObj[index] = mail;
      this.updatedID = mail.id;
    }
  }

  deleteMail(id: number) {
    this.mailObj = this.mailObj.filter(mail => mail.id !== id);
  }

  setMailObj(mails: any[]) {
    this.mailObj = mails; 
   
  }

  // public sentEmails = [];

  // constructor() {
  //   // Initialize sentEmails array with filtered 'Sent' tab emails
  //   this.sentEmails = this.mailObj.filter(mail => mail.tabType === 'Sent');
  // }
}
