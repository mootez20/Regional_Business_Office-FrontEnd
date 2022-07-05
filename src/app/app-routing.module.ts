import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { AboutComponent } from './modules/about/about.component';
import { AccessInformationComponent } from './modules/access-information/access-information.component';
import { AlbumComponent } from './modules/album/album.component';
import { AlbumListComponent } from './modules/album-list/album-list.component';
import { ContactComponent } from './modules/contact/contact.component';
import { EventListComponent } from './modules/event-list/event-list.component';
import { ServiceListComponent } from './modules/service-list/service-list.component';
import { PartnerListComponent } from './modules/partner-list/partner-list.component';
import { SubjectListComponent } from './modules/subject-list/subject-list.component';
import { EventComponent } from './modules/event/event.component';
import { StaffComponent } from './modules/staff/staff.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { RegisterComponent } from './modules/entry/register/register.component';
import { LoginComponent } from './modules/entry/login/login.component';
import { ForgotPasswordComponent } from './modules/entry/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/entry/reset-password/reset-password.component';
import { HomeComponent } from './modules/home/home.component';
import { FormComponent } from './modules/form/form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'form/:id/:nature', component: FormComponent },
  { path: 'event-list/:news', component: EventListComponent },
  { path: 'event/:type/:id', component: EventComponent },
  { path: 'album-list', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'subject-list', component: SubjectListComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'access-info', component: AccessInformationComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'partner-list', component: PartnerListComponent },
  { path: 'documents', component: DocumentsComponent },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
