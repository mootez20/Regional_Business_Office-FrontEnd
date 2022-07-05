import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { City } from '../models';

@Injectable()
export class CityService {
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<City[]> {
    return this.httpClient.get<City[]>(`${environment.baseUrl}/cities`);
  }

  find(id: number): Observable<City> {
    return this.httpClient.get<City>(`${environment.baseUrl}/cities/${id}`);
  }
}
