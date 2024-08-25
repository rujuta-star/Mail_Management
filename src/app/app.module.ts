import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MailComponent } from './mail/mail.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

@NgModule({
  declarations: [
   
  ],

  
  imports: [
    BrowserModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
