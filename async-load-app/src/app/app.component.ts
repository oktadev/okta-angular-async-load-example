import { Component, Inject, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'async-load-app';

  public isAuthenticated$!: Observable<boolean>;

  constructor(private router: Router, private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect().then(
      _ => this.router.navigate(['/profile'])
    );
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
