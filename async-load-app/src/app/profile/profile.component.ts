import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p>You're logged in!
      <span *ngIf="name$ | async as name">
        Welcome, {{name}}
      </span>
    </p>
  </div>
  `,
})
export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;
  constructor(private oktaAuthStateService: OktaAuthStateService) { }

  public ngOnInit(): void {
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }
}