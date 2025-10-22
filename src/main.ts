import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ),
  ],
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
