import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/service/auth.service';
import { SubjectService } from 'src/app/core/service/subject.service';

@Component({
  selector: 'subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {
  public subject = {} as Subject;
  public user = {} as User;
  private id?: number;

  constructor(
    private authService: AuthService,
    private subjectService: SubjectService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => (this.user = res));
    this.id = this.router.snapshot.params['id'];
    this.loadData();
  }

  public loadData(lastOpenedCommentId?: number): void {
    this.subjectService.getSubjectById(this.id).subscribe((res) => {
      this.subject = res;
      this.subject.comments?.forEach(
        (comment) => (comment.reply = comment.id === lastOpenedCommentId)
      );
    });
  }
}
