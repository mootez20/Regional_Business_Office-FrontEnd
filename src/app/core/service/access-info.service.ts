import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccessInfoService {
  constructor(private httpClient: HttpClient) {}

  getInfos() {
    return this.httpClient.get<any[]>(`${environment.baseUrl}/access-info`);
  }
}
