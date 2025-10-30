import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment';
import { App } from './app/app';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(AppRoutingModule, FormsModule, ReactiveFormsModule),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
