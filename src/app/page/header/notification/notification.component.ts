import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Notification,
  NotificationTypeEnum,
} from 'src/app/core/models/notification.model';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DateUtils } from '../../../modules/shared/date-utils';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements AfterViewInit {
  @Input() notification = {} as Notification;

  public duration = '';
  public NotificationTypeEnum = NotificationTypeEnum;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngAfterViewInit(): void {
    this.duration = DateUtils.duration(this.notification.createdAt);
  }

  public checkNotification(): void {
    this.notification.checked = true;
    this.notificationService
      .check(this.notification.id)
      .subscribe(() =>
        this.router.navigate([`/single_event/${this.notification.event?.id}`])
      );
  }
}
