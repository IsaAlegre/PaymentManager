import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { AppRoutingModule } from './app/app-routing-module';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(AppRoutingModule),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
}).catch((err) => console.error(err));