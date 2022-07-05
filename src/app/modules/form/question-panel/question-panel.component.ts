import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionNatureEnum, Question } from 'src/app/core/models';

@Component({
  selector: 'question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.scss'],
})
export class QuestionPanelComponent {
  @Input() question: Question = {} as Question;
  @Input() buildMode?: boolean;
  @Input() selected?: boolean;
  @Input() length = 1;

  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  public QuestionNatureEnum = QuestionNatureEnum;
}
