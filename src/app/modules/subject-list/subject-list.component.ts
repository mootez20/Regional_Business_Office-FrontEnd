import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/core/models';
import { AuthService } from 'src/app/core/service/auth.service';
import { SubjectService } from 'src/app/core/service/subject.service';
declare var $: any;

@Component({
  selector: 'subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent implements OnInit {
  public subjectList: Subject[] = [];
  public total = 0;
  public page = 1;

  constructor(
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
      this.subjectService.getSubjects().subscribe((res) => {
        this.subjectList = res;
        this.total = res.length;
      })
  }

  pageChanged(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }

}
