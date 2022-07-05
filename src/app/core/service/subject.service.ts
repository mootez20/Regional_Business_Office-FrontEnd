import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, Subject } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubjectService {
  constructor(private httpClient: HttpClient) {}

  getSubjectById(id?: number): Observable<Subject> {
    return this.httpClient.get<Subject>(
      `${environment.baseUrl}/subjects/${id}/details`
    );
  }

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${environment.baseUrl}/subjects`);
  }

  private mapSubject(subject: Subject): Subject {
    subject.createdAt = subject.createdAt
      ? new Date(subject.createdAt)
      : undefined;
    subject.comments?.map((comment) => this.mapComment(comment));

    return subject;
  }

  private mapComment(comment: Comment): Comment {
    comment.createdAt = comment.createdAt
      ? new Date(comment.createdAt)
      : undefined;
    return comment;
  }
}
