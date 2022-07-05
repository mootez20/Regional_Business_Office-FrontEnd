import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";

import { HomeModule } from './modules/home/home.module';
import { EntryModule } from './modules/entry/entry.module';
import { FormModule } from './modules/form/form.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';

import { TicketService } from './core/service/ticket.service';
import { ToasterService } from './core/service/toaster.service';
import { AlbumService } from './core/service/album.service';
import { EventService } from './core/service/event.service';
import { CityService } from './core/service/city.service';
import { AccessInfoService } from './core/service/access-info.service';
import { ServiceService } from './core/service/service.service';
import { SubscriptionService } from './core/service/subscription.service';
import { ContactService } from './core/service/contact.service';
import { AuthInterceptor } from './core/service/auth-interceptor.service';
import { NotificationService } from './core/service/notification.service';
import { SubjectService } from './core/service/subject.service';
import { CommentService } from './core/service/comment.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { TicketDialogComponent } from './modules/event/ticket-dialog/ticket-dialog.component';
import { EventListComponent } from './modules/event-list/event-list.component';
import { EventComponent } from './modules/event/event.component';
import { AlbumListComponent } from './modules/album-list/album-list.component';
import { AlbumComponent } from './modules/album/album.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { AboutComponent } from './modules/about/about.component';
import { StaffComponent } from './modules/staff/staff.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ServiceListComponent } from './modules/service-list/service-list.component';
import { SubjectListComponent } from './modules/subject-list/subject-list.component';
import { AccessInformationComponent } from './modules/access-information/access-information.component';
import { PartnerListComponent } from './modules/partner-list/partner-list.component';
import { NotificationComponent } from './page/header/notification/notification.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { TicketComponent } from './modules/user-profile/ticket/ticket.component';
import { UserNotificationComponent } from './modules/user-profile/user-notification/user-notification.component';
import { UserEventComponent } from './modules/user-profile/user-event/user-event.component';
import { EventDialogComponent } from './modules/user-profile/event-dialog/event-dialog.component';
import { FormDialogComponent } from './modules/user-profile/form-dialog/form-dialog.component';
import { FormService } from './core/service/form.service';
import { StatisticsService } from './core/service/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventListComponent,
    EventComponent,
    AlbumListComponent,
    AlbumComponent,
    UserProfileComponent,
    AboutComponent,
    StaffComponent,
    StatisticsComponent,
    ContactComponent,
    ServiceListComponent,
    SubjectListComponent,
    SubjectComponent,
    AccessInformationComponent,
    PartnerListComponent,
    TicketDialogComponent,
    NotificationComponent,
    DocumentsComponent,
    TicketComponent,
    UserNotificationComponent,
    UserEventComponent,
    EventDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HomeModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    EntryModule,
    FormModule,
    AppRoutingModule,
    SharedModule,
    NgChartsModule,
    NgbToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-left',
    }),
  ],
  providers: [
    ToasterService,
    AlbumService,
    EventService,
    CityService,
    SubjectService,
    TicketService,
    ServiceService,
    NotificationService,
    AccessInfoService,
    SubscriptionService,
    ContactService,
    CommentService,
    FormService,
    StatisticsService,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TicketDialogComponent,
    EventDialogComponent,
    FormDialogComponent,
  ],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
