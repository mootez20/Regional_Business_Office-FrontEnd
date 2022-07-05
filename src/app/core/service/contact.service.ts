import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models';

@Injectable()
export class ContactService {
  private api = 'mailThis.to/mooteznabli2019@gmail.com';

  constructor(private httpClient: HttpClient) {}

  public save(contact: Contact): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/contact`, {
      contact,
    });
  }
}
