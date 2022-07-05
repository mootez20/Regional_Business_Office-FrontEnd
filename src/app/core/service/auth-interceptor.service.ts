import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Dictionary } from 'lodash';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = environment.baseUrl;
    const authenticateRequired = ![
      `${baseUrl}/register`,
      `${baseUrl}/login`,
      `${baseUrl}/events`,
    ].includes(req.url);
    return next.handle(this.setHeaders(req, authenticateRequired));
  }

  private setHeaders<T>(
    req: HttpRequest<T>,
    authenticateRequired: boolean,
  ): HttpRequest<T> {
    let headers: Dictionary<string> = {
      'Access-Control-Allow-Origin': '*',
      Authorization: authenticateRequired
        ? 'Bearer ' + this.authService.token
        : '',
    };
    return req.clone({ setHeaders: headers });
  }
}
