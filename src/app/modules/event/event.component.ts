import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../core/service/auth.service';
import { EventService } from '../../core/service/event.service';
import { TicketService } from '../../core/service/ticket.service';

import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { Event, Ticket, User } from '../../core/models';
import { environment } from 'src/environments/environment';
import { FormService } from 'src/app/core/service/form.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  public event = {} as Event;
  public user = {} as User;
  public isConnected = false;
  public isNews = false;
  public lastOpenedCommentId = -1;

  private id?: number;

  STORAGE_URL = environment.storageUrl;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private ticketService: TicketService,
    private formService: FormService,
    private modalService: NgbModal
  ) {
    this.authService.currentUser.subscribe((user) => (this.user = user));
    this.authService.isConnected.subscribe(
      (isConnected) => (this.isConnected = isConnected)
    );
  }

  ngOnInit(): void {
    window.scroll(0, 250);
    this.id = this.activateRoute.snapshot.params['id'];
    this.isNews = this.activateRoute.snapshot.params['type'] === 'news';
    this.loadData();
  }

  public loadData(lastOpenedCommentId?: number): void {
    (this.isNews
      ? this.eventService.getNewsById(this.id)
      : this.eventService.getEventById(this.id)
    ).subscribe((res) => {
      this.event = res;
      this.event.comments?.forEach(
        (comment) => (comment.reply = comment.id === lastOpenedCommentId)
      );
    });
  }

  public bookTicket(): void {
    this.ticketService.find(this.event.id).subscribe((ticket) => {
      modalRef.componentInstance.unitPrice = this.event.price;
      modalRef.componentInstance.ticket =
        ticket ||
        ({
          eventId: this.event.id,
          userId: this.user.id,
          quantity: 1,
          price: this.event.price,
        } as Ticket);
      modalRef.result.then(() => {});
    });

    const modalRef = this.modalService.open(TicketDialogComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      backdrop: 'static',
    });
  }

  public createResponse(formId?: number, userId?:number) {
    this.formService
      .createResponse(formId, userId)
      .subscribe((responseId) =>
        this.router.navigate([`/form/${responseId}/response`])
      );
  }
}
