import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private httpClient: HttpClient) {}

  getDocument(id: number) {
    return this.httpClient.get(`${environment.baseUrl}/categoriedocument/${id}`);
  }
}
