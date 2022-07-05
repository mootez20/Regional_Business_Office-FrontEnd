import { Component, Input } from '@angular/core';
import { Option, QuestionNatureEnum } from 'src/app/core/models';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() name: string = 'option';
  @Input() option: Option = {} as Option;
  @Input() nature = QuestionNatureEnum.ShortText;

  public QuestionNatureEnum = QuestionNatureEnum;

  public selectChanged(selectedOption: Option, multi?: boolean) {
    if (multi) {
      const answers = this.option.answerList?.split(',');
      this.option.answerList;
    } else {
      this.option.answerList = selectedOption?.name || undefined;
    }
  }
}
