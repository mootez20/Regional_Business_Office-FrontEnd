import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import {
  Form,
  FormNatureEnum,
  Option,
  Question,
  QuestionNatureEnum,
} from 'src/app/core/models';
import { FormService } from 'src/app/core/service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public form: Form = {} as Form;
  public selectedQuestion?: number;
  public buildMode = false;

  public FormNatureEnum = FormNatureEnum;
  private id: number;

  constructor(
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private formService: FormService,
    private location: Location,
    private translateService: TranslateService
  ) {
    this.id = +this.router.snapshot.params['id'];
    this.buildMode = this.router.snapshot.params['nature'] === 'build';
    this.formService.find(this.id).subscribe((res) => (this.form = res));
  }

  public editQuestion(question: Question): void {
    this.selectedQuestion = question.id;
    const modalRef = this.modalService.open(QuestionDialogComponent, {
      size: 'lg',
      // backdropClass: 'light-backdrop',
      scrollable: true,
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.question = question;
    modalRef.result.then(() => {});
  }

  public deleteQuestion(id?: number): void {
    this.form.questions = (this.form.questions || []).filter(
      (question) => question.id != id
    );
    if (this.form.id) {
      this.formService.deleteQuestion(id).subscribe();
    }
  }

  public addNewQuestion(rank: number): void {
    this.form.questions?.push({
      name: this.translateService.instant('form.question', { rank }),
      mandatory: false,
      nature: QuestionNatureEnum.ShortText,
      options: [
        {
          name: this.translateService.instant('form.option', { rank: 1 }),
          text: '',
        },
      ],
    });
  }

  public saveResponse(): void {
    const answers: Option[] = [];
    this.form.questions?.forEach((question) =>
      question?.options.forEach((option) => answers.push(option))
    );
    this.formService
      .saveResponse(answers)
      .subscribe(() => this.location.back());
  }

  public saveForm(): void {
    this.formService.save(this.form).subscribe(() => this.location.back());
  }
}
