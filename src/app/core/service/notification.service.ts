import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Notification } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  findAll(userId?: number): Observable<Notification[]> {
    return this.httpClient
      .get<Notification[]>(
        `${environment.baseUrl}/users/${userId}/notifications`
      )
      .pipe(
        map((notifications) =>
          notifications.map((notification) =>
            this.mapNotification(notification)
          )
        )
      );
  }

  check(id?: number): Observable<boolean> {
    return this.httpClient
      .put(`${environment.baseUrl}/notifications/${id}/check`, {})
      .pipe(map(() => true));
  }

  private mapNotification(notification: Notification): Notification {
    notification.createdAt = notification.createdAt
      ? new Date(notification.createdAt)
      : undefined;
    return notification;
  }
}
