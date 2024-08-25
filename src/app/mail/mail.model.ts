// mail.model.ts

export interface Mail {
  id: number; // Ensure this is present
  name: string;
  email: string;
  mailType: string;
  detail: string;
  date: string;
  tabType?: string;
  image?: string;
  selected?: boolean;
}
  // mail.module.ts (if you have a feature module)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
; // Import your component

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule here
  ],
  exports: [
   
  ]
})
export class MailModule { }
