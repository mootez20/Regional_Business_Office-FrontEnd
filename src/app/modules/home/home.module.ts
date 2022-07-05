import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PartnerService } from 'src/app/core/service/partner.service';

import { PartnersComponent } from './partners/partners.component';
import { InfosComponent } from './infos/infos.component';
import { ResearchComponent } from './research/research.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { AlbumsComponent } from './albums/albums.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeComponent,
    PartnersComponent,
    InfosComponent,
    ResearchComponent,
    EventsComponent,
    NewsComponent,
    AlbumsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    TranslateModule,
    NgxSpinnerModule,
  ],
  providers: [PartnerService],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
