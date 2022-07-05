import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() ticket = {} as Ticket;

  public STORAGE_URL = environment.storageUrl;
}
