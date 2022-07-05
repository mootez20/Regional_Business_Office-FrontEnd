import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Comment, Event } from '../models';

import { environment } from 'src/environments/environment';

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getTopNews(cityId?: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${environment.baseUrl}/cities/${cityId}/top-news`)
      .pipe(map((events) => events.map((event) => this.mapEvent(event))));
  }

  public getTopEvents(cityId?: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${environment.baseUrl}/cities/${cityId}/top-events`)
      .pipe(map((events) => events.map((event) => this.mapEvent(event))));
  }

  public getEvents(cityId?: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${environment.baseUrl}/cities/${cityId}/events`)
      .pipe(map((events) => events.map((event) => this.mapEvent(event))));
  }

  public getNews(cityId?: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${environment.baseUrl}/cities/${cityId}/news`)
      .pipe(map((events) => events.map((event) => this.mapEvent(event))));
  }

  public getLast5News(){
    return this.httpClient.get<Event[]>(`${environment.baseUrl}/lastFiveNews`);
  }


  public getEventById(id?: number): Observable<Event> {
    return this.httpClient
      .get<Event>(`${environment.baseUrl}/events/${id}/details`)
      .pipe(map((event) => this.mapEvent(event)));
  }

  public getNewsById(id?: number): Observable<Event> {
    return this.httpClient
      .get<Event>(`${environment.baseUrl}/news/${id}`)
      .pipe(map((event) => this.mapEvent(event)));
  }

  public getUserEvents(userId?: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${environment.baseUrl}/users/${userId}/events`)
      .pipe(map((events) => events.map((event) => this.mapEvent(event))));
  }

  private mapEvent(event: Event): Event {
    event.createdAt = event.createdAt ? new Date(event.createdAt) : undefined;
    event.startedAt = event.startedAt ? new Date(event.startedAt) : undefined;
    event.endedAt = event.endedAt ? new Date(event.endedAt) : undefined;
    event.comments?.map((comment) => this.mapComment(comment));

    return event;
  }

  private mapComment(comment: Comment): Comment {
    comment.createdAt = comment.createdAt
      ? new Date(comment.createdAt)
      : undefined;
    return comment;
  }

  public create(event: Event): Observable<boolean> {
    return this.httpClient
      .post(`${environment.baseUrl}/events`, event)
      .pipe(map(() => true));
  }

  public update(event: Event): Observable<boolean> {
    return this.httpClient
      .post(`${environment.baseUrl}/events/edit`, event)
      .pipe(map(() => true));
  }

  public updateImage(file: File, event: Event): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('eventId', `${event.id}`);
    return this.httpClient
      .post<{ image: string }>(`${environment.baseUrl}/events/image`, {})
      .pipe(map(({ image }) => image));
  }

  public delete(event?: Event): Observable<boolean> {
    return this.httpClient
      .delete(`${environment.baseUrl}/events/${event?.id}`)
      .pipe(map(() => true));
  }
}
