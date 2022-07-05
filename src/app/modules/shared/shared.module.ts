import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageTitleComponent } from './page-title/page-title.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalFooterComponent } from './modal/modal-footer/modal-footer.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NumberComponent } from './number/number.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const components = [
  PageTitleComponent,
  CommentsComponent,
  CommentComponent,
  SideBarComponent,
  ModalHeaderComponent,
  ModalFooterComponent,
  InputComponent,
  ButtonComponent,
  LabelComponent,
  CheckboxComponent,
  NumberComponent,
  CalendarComponent,
];

@NgModule({
  declarations: components,
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: components,
  providers: [],
  entryComponents: [],
})
export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
