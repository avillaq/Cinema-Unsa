import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';

// Idioma español para las fechas
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes,withComponentInputBinding()), provideHttpClient(),  { provide: LOCALE_ID, useValue: 'es' }]
};



