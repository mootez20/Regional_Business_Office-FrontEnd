import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { Ticket } from './../models/ticket.model';
import { environment } from 'src/environments/environment';
import { Event } from '../models';

@Injectable()
export class TicketService {
  constructor(private httpClient: HttpClient) {}

  find(eventId?: number): Observable<Ticket> {
    return this.httpClient
      .get<Ticket>(`${environment.baseUrl}/tickets/${eventId}/details`)
      .pipe(map((ticket) => this.mapTicket(ticket)));
  }

  create(ticket: Ticket): Observable<boolean> {
    return this.httpClient.post(`${environment.baseUrl}/tickets`, ticket).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  update(ticket: Ticket): Observable<boolean> {
    return this.httpClient
      .put(`${environment.baseUrl}/tickets/${ticket.id}`, ticket)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  findAll(userId?: number): Observable<Ticket[]> {
    return this.httpClient
      .get<Ticket[]>(`${environment.baseUrl}/users/${userId}/tickets`)
      .pipe(map((tickets) => tickets.map((ticket) => this.mapTicket(ticket))));
  }

  private mapTicket(ticket: Ticket): Ticket {
    if (ticket) {
      ticket.createdAt = ticket.createdAt
        ? new Date(ticket.createdAt)
        : undefined;
      ticket.event = this.mapEvent(ticket.event);
    }
    return ticket;
  }

  private mapEvent(event: Event): Event {
    event.createdAt = event.createdAt ? new Date(event.createdAt) : undefined;
    event.startedAt = event.startedAt ? new Date(event.startedAt) : undefined;
    event.endedAt = event.endedAt ? new Date(event.endedAt) : undefined;

    return event;
  }
}
