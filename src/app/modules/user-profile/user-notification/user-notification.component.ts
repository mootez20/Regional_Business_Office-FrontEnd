import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notification, NotificationTypeEnum } from 'src/app/core/models';
import { DateUtils } from '../../shared/date-utils';

@Component({
  selector: 'user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss'],
})
export class UserNotificationComponent implements AfterViewInit {
  @Input() notification = {} as Notification;
  public duration = '';
  public NotificationTypeEnum = NotificationTypeEnum;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.duration = DateUtils.duration(this.notification.createdAt);
  }

  public navigateTo() {
    this.router.navigate([`/single_event/${this.notification.event?.id}`]);
  }
}
