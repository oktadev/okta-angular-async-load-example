import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { OktaAuthConfig } from './app/auth-config';

if (environment.production) {
  enableProdMode();
}

fetch('http://localhost:3000/config').then(async res => {
  const authConfig = new OktaAuthConfig(await res.json());

  platformBrowserDynamic([
    { provide: OktaAuthConfig, useValue: authConfig }
  ]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
})
