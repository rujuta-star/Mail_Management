
import { Injectable } from '@angular/core';export interface Mail {
    id: number;
    name: string;
    email: string;
    mailType: string;
    detail: string;
    date: string;
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class MailService {
    private mailObj: Mail[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', mailType: 'Work', detail: 'Details here', date: '2023-01-01' }
      // ... more mail objects
    ];
    private idGenerator: number = this.mailObj.length ? Math.max(...this.mailObj.map(mail => mail.id)) + 1 : 1;
  
    getMails(): Mail[] {
      return this.mailObj;
    }
  
    getMailById(id: number): Mail | undefined {
      return this.mailObj.find(mail => mail.id === id);
    }
  
    addMail(mail: Mail): void {
      mail.id = this.idGenerator++;
      this.mailObj.push(mail);
    }
  
    updateMail(id: number, updatedMail: Mail): void {
      const index = this.mailObj.findIndex(mail => mail.id === id);
      if (index !== -1) {
        this.mailObj[index] = updatedMail;
      }
    }
  
    deleteMail(id: number): void {
      this.mailObj = this.mailObj.filter(mail => mail.id !== id);
    }
  }
  