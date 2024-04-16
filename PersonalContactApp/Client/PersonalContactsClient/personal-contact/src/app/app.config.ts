import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { contactReducer } from './store/reducers/contact.reducer';
import { ContactEffects } from './store/effects/contact.effects';
import {provideAnimations} from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEffects([ContactEffects]),
    provideHttpClient(),
    provideStore({contacts: contactReducer},),
    provideAnimations(),
    
      
  ],
   
};
