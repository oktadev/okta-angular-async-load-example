import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthConfig } from './auth-config';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      deps: [OktaAuthConfig],
      useFactory: (oktaConfig: OktaAuthConfig) => ({oktaAuth: new OktaAuth({...oktaConfig.config, redirectUri: window.location.origin + '/login/callback'})})
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
