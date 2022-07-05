import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TicketService } from 'src/app/core/service/ticket.service';

import {
  User,
  Notification,
  Ticket,
  Event,
  Form,
  ToasterOptionData,
} from 'src/app/core/models';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { environment } from 'src/environments/environment';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/service/toaster.service';

enum ProfileTabEnum {
  Info = 1,
  Edit = 2,
  EditPassword = 3,
  Tickets = 4,
  Notifications = 5,
  Events = 6,
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user: User = {} as User;
  public notificationList: Notification[] = [];
  public ticketList: Ticket[] = [];
  public eventList: Event[] = [];

  public currentPassword = '';
  public newPassword = '';
  public confirmPassword = '';

  public currentTab: ProfileTabEnum = 1;

  public ProfileTabEnum = ProfileTabEnum;
  public STORAGE_URL = environment.storageUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private ticketService: TicketService,
    private eventService: EventService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      if (user.id) {
        this.notificationService
          .findAll(user.id)
          .subscribe((res) => (this.notificationList = res));
        this.ticketService
          .findAll(user.id)
          .subscribe((res) => (this.ticketList = res));
        this.loadEvents();
      }
    });
  }

  public loadEvents() {
    if (this.user.id) {
      this.eventService
        .getUserEvents(this.user.id)
        .subscribe((res) => (this.eventList = res));
    }
  }

  public save(userForm: NgForm): void {
        window.scroll(0, 0);

    if (userForm.valid && this.user.id)
      this.authService.update(this.user).subscribe((success)=>{
        if (success) window.location.reload();
      });
  }

  public changePassword(): void {
    if (this.newPassword && this.newPassword === this.confirmPassword) {
      this.authService
        .updatePassword(this.currentPassword, this.newPassword, this.user.id)
        .subscribe((success) => {
          this.showToaster(success);
          setTimeout(()=>{
            window.location.reload();
          },3500);
          
        });
    }
  }

  public selectImage(event: any): void {
    const fileList: FileList = event.target.files;
    const files = Object.values(fileList || {});
    const file: File = files[0];

    if (file) {
      this.authService.updateImage(file, this.user).subscribe();
    }
  }

  public openEventModal(event?: Event) {
    if (this.user && this.user.city) {
      const modalRef = this.modalService.open(EventDialogComponent, {
        size: 'lg',
        scrollable: true,
        centered: true,
        backdrop: 'static',
      });

      modalRef.componentInstance.event =
        event ||
        ({
          userId: this.user.id,
          cityId: this.user?.city?.id,
        } as Event);
      modalRef.componentInstance.editMode = !!event?.id;
      modalRef.result.then(() => {});
    } else {
      this.info();
    }
  }

  public deleteEvent(event?: Event) {
    this.eventService.delete(event).subscribe(() => this.loadEvents());
  }

  public createEventForm(event?: Event) {
    const modalRef = this.modalService.open(FormDialogComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.form = { eventId: event?.id } as Form;
    modalRef.result.then(() => {});   
  }

  public editForm(event?: Event) {
    this.router.navigate([`/form/${event?.form?.id}/build`]);
  }

  // @wissem
  private info(): void {
    const toasterOption: ToasterOptionData = {
      title: 'تذكير',
      params: { closeButton: true },
      message: 'الرجاء إختيار المدينة من الإستقبال',
    };

    this.toasterService.info(toasterOption);
  }

  // @wissem
  private showToaster(success: boolean): void {
    const toasterOption: ToasterOptionData = {
      title: success ? 'تم التغير  بنجاح' : ' فشل عملية تغير رقم السر !',
      params: { closeButton: true },
      message: success ? '' : 'الرجاء استخدام كلمة المرور الصحيحة ',
    };

    success
      ? this.toasterService.success(toasterOption)
      : this.toasterService.error(toasterOption);
  }
}
