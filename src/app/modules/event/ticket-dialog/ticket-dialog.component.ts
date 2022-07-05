import { NgForm } from '@angular/forms';
import { Ticket } from './../../../core/models/ticket.model';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/core/service/ticket.service';
import { ToasterOptionData } from 'src/app/core/models';
import { ToasterService } from 'src/app/core/service/toaster.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss'],
})
export class TicketDialogComponent {
  public unitPrice: number = 0;
  public ticket: Ticket = {} as Ticket;
  public quantities = [...Array(20).keys()];

  constructor(
    private activeModal: NgbActiveModal,
    private ticketService: TicketService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {}

  public save(form: NgForm) {
    if (form.valid) {
      (!this.ticket.id
        ? this.ticketService.create(this.ticket)
        : this.ticketService.update(this.ticket)
      ).subscribe((success) => {
        this.showToaster(success, !!this.ticket.id);
        if (success) {
          this.close();
        }
      });
    }
  }

  public close() {
    this.activeModal.dismiss();
  }

  private showToaster(success: boolean, editMode?: boolean): void {
    const toasterOption: ToasterOptionData = {
      title: success ? 'Success' : 'Error',
      params: { closeButton: true },
      message: this.translateService.instant(
        success
          ? editMode
            ? 'messages.updateTicket'
            : 'messages.createTicket'
          : 'messages.error'
      ),
    };

    success
      ? this.toasterService.success(toasterOption)
      : this.toasterService.error(toasterOption);
  }
}
