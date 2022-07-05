import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models';

@Injectable()
export class AlbumService {
  constructor(private httpClient: HttpClient) {}

  getAlbumById(id: number): Observable<Album> {
    return this.httpClient
      .get<Album>(`${environment.baseUrl}/albums/${id}/details`)
      .pipe(map((album) => this.mapAlbum(album)));
  }

  getTopAlbums(cityId?: number): Observable<Album[]> {
    return this.httpClient
      .get<Album[]>(`${environment.baseUrl}/cities/${cityId}/top-albums`)
      .pipe(map((albums) => albums.map((album) => this.mapAlbum(album))));
  }

  getAlbums(cityId?: number): Observable<Album[]> {
    return this.httpClient
      .get<Album[]>(`${environment.baseUrl}/cities/${cityId}/albums`)
      .pipe(map((albums) => albums.map((album) => this.mapAlbum(album))));
  }

  private mapAlbum(album: Album): Album {
    album.createdAt = album.createdAt ? new Date(album.createdAt) : undefined;
    return album;
  }
}
