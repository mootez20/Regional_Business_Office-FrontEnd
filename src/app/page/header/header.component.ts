import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from 'src/app/core/service/auth.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { User, Language, Notification } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user = {} as User;
  public notifications: Notification[] = [];
  public connectedUser = false;
  public showNotification = false;
  public news = false;
  public currentRoute = '';

  public languages: Language[] = [
    { name: 'page.languages.english', key: 'en' },
    { name: 'page.languages.french', key: 'fr' },
    { name: 'page.languages.arabic', key: 'ar' },
  ];

  public STORAGE_URL = environment.storageUrl;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => (this.currentRoute = this.router.url));
    this.authService.currentUser.subscribe((user) => {
      this.connectedUser = !!user.id;
      this.user = user;
      if (this.connectedUser) {
        this.notificationService.findAll(user.id).subscribe((res) => {
          this.notifications = res;
          this.news = this.notifications.some(
            (notification) => !notification.checked
          );
        });
      }
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public check(id?: number): void {
    this.notificationService.check(id).subscribe();
  }

  public selectLanguage(language: Language) {
    this.user.languageKey = language.key;
    // console.log('home => ', this.user);   
    localStorage.setItem('user', JSON.stringify(this.user));
    this.translateService.use(language.key);
  }

  public toggleDropdown(id: string, open: boolean): void {
    setTimeout(() => {
      const cssClass = open ? 'dropdown open' : 'dropdown';
      document.getElementById(id)?.setAttribute('class', cssClass);
    }, 0);
  }
}
