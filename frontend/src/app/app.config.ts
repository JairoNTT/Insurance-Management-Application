import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { PersonService } from '../services/person.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NavigatorService } from '../services/navigator.service';
import { LoginService } from '../services/login.service';
import { ContractService } from '../services/contract.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    ApiService,
    PersonService,
    NavigatorService,
    LoginService,
    ContractService,
    provideAnimations()
  ]
};
