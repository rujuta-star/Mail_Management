import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    // provideRouter(AppRoutingModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(CommonModule),
    provideRouter(routes),
    importProvidersFrom(RouterModule)
  ]
});
