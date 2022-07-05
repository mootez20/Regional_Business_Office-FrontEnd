import { Event } from './event.model';

export interface Ticket {
  id?: number;
  userId?: number;
  eventId?: number;
  price: number;
  quantity: number;
  createdAt?: Date;
  event: Event;
}
