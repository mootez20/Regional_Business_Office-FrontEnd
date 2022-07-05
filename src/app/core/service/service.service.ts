import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable()
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${environment.baseUrl}/services`);
  }

  getSingleServiceById(id: number) {
    return this.httpClient.get(`${environment.baseUrl}/service/${id}`);
  }
}
