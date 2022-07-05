import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { City } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private tokenSubject: BehaviorSubject<string>;
  private isConnectedSubject;

  constructor(private httpClient: HttpClient) {
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token');  
    const user = userJson ? JSON.parse(userJson) : {};  
    console.log('user =>', user);
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.isConnectedSubject = new BehaviorSubject(!!user.id);
    this.tokenSubject = new BehaviorSubject<string>(token || '');
  }

  public get currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public get isConnected(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }

  public get user(): User {
    return this.currentUserSubject.value;
  }

  public get token(): string {
    return this.tokenSubject.value;
  }

  public login(user: User): Observable<boolean> {
    return this.httpClient
      .post<{ token: string; user: User }>(`${environment.baseUrl}/login`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        map(({ token, user }) => {
          this.currentUserSubject.next(user);
          this.isConnectedSubject.next(!!user);
          this.tokenSubject.next(token);
          console.log('login =>', user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          return !!user;
        }),
        catchError(() => of(false))
      );
  }

  public register(request: any): Observable<boolean> {
    return this.httpClient
      .post<void>(`${environment.baseUrl}/register`, request)
      .pipe(map(() => true));
  }

  public update(user: User): Observable<boolean> {
    const { city, ...request } = user;
    request.cityId = city?.id;
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${user.id}`, request)
      .pipe(
        map((user) => {
          console.log('update => ', this.user);  
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        })
      );
  }

  public updatePassword(
    currentPassword: string,
    newPassword: string,
    id?: number
  ): Observable<boolean> {
    return this.httpClient
      .post<{ message: string }>(`${environment.baseUrl}/users/edit-password`, {
        id,
        currentPassword,
        newPassword,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }


  public updateImage(file: File, user: User): Observable<boolean> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('userId', `${user.id}`);
    return this.httpClient
      .post<{ image: string }>(`${environment.baseUrl}/users/image`, formData)
      .pipe(
        map((result) => {
          const _user: User = {
            ...user,
            image: result.image,
          };

          console.log('updateImage => ', this.user);   
          localStorage.setItem('user', JSON.stringify(_user));
          this.currentUserSubject.next(_user);

          return true;
        })
      );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next({ city: {} as City } as User);
  }

  public forgetPassword(email: string) {
    return this.httpClient.post(`${environment.baseUrl}/forget-password`, {
      email,
    });
  }

  public resetPassword(token: string, password: string) {
    return this.httpClient.post(`${environment.baseUrl}/reset-password`, {
      token,
      password,
    });
  }
}
