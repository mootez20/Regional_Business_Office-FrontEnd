import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { FormComponent } from './form.component';
import { OptionComponent } from './option/option.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { QuestionPanelComponent } from './question-panel/question-panel.component';

@NgModule({
  declarations: [
    FormComponent,
    QuestionPanelComponent,
    OptionComponent,
    QuestionDialogComponent,
  ],
  imports: [CommonModule, FormsModule, NgbModule, SharedModule],
  providers: [],
  entryComponents: [QuestionDialogComponent],
})
export class FormModule {}
