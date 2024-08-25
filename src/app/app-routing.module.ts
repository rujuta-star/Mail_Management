import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mail', component: MailComponent },
  { path: '', redirectTo: '/mail', pathMatch: 'full' },
  { path: 'mail', component: MailComponent },
  { path: 'mail/:id', component: MailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };                                                                                                        