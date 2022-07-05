import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityStats } from '../models/city-stats.model';

@Injectable()
export class StatisticsService {
  constructor(private httpClient: HttpClient) {}

  public getCityStatistics(): Observable<CityStats[]> {
    return this.httpClient.get<CityStats[]>(
      `${environment.baseUrl}/statistics`
    );
  }
}
