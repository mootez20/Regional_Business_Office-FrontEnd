import { Event } from './event.model';

export interface Notification {
  id?: number;
  title: string;
  description: string;
  type: NotificationTypeEnum;
  checked: boolean;
  createdAt?: Date;
  event?: Event;
}

export enum NotificationTypeEnum {
  News = 'News',
  Event = 'Event',
}
