import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategorieService {

  constructor(private httpClient: HttpClient) { }

  getCategorie(){
    return this.httpClient.get(`${environment.baseUrl}/categorie`);
  }


}
