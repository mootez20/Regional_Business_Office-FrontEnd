import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partner } from '../models';

@Injectable()
export class PartnerService {
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Partner[]> {
    return this.httpClient.get<Partner[]>(`${environment.baseUrl}/partners`);
  }
}
