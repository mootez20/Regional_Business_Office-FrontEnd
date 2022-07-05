import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Option, Question, QuestionNatureEnum } from 'src/app/core/models';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionDialogComponent implements OnInit {
  public question = {} as Question;
  public initialQuestion = {} as Question;
  public submitted = false;

  public QuestionNatureEnum = QuestionNatureEnum;

  constructor(
    private activeModal: NgbActiveModal,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initialQuestion = { ...this.question };
  }

  public save(form: NgForm) {
    if (form.valid) {
      this.close();
    }
  }

  public natureChanged() {
    this.question.options = [
      {
        name: this.translateService.instant('form.option', { rank: 1 }),
        text: '',
        value: 0,
        checked: false,
        optionList: '',
        answerList: '',
      },
    ];
  }

  public optionsChanged(optionList: string) {
    this.question.options[0].optionList = optionList;
    this.question.options[0].subOptions = optionList
      ? optionList
          .split('__')
          .map((name) => ({ name, checked: false } as Option))
      : [];
  }

  public addOption(rank: number): void {
    this.question.options.push({
      name: this.translateService.instant('form.option', { rank }),
      checked: false,
      text: '',
      value: 0,
      answerList: '',
    });
  }

  public deleteOption(id?: number) {
    this.question.options = this.question.options.filter(
      (option) => option.id != id
    );
  }

  public cancel(): void {
    this.close();
    this.reset();
  }

  private close(): void {
    this.activeModal.dismiss();
  }

  private reset(): void {
    this.question.mandatory = this.initialQuestion.mandatory;
    this.question.name = this.initialQuestion.name;
    this.question.nature = this.initialQuestion.nature;
    this.question.options = this.initialQuestion.options;
  }
}
