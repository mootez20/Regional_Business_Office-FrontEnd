import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubscriptionService {
  constructor(private httpClient: HttpClient) {}

  create(email: string): Observable<boolean> {
    return this.httpClient
      .post(`${environment.baseUrl}/subscriptions`, { email })
      .pipe(map(() => true));
  }
}
