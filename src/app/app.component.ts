import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('ar');
    this.authService.currentUser.subscribe((user) =>
      this.translateService.use(user?.languageKey || 'ar')
    );
  }
}
