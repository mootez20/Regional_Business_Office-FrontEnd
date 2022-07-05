import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { SubscriptionService } from '../../../core/service/subscription.service';
import { ContactService } from '../../../core/service/contact.service';
import { Contact } from '../../../core/models';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  @Input() hasCalendar = false;
  @Input() lastNews = false;
  @Output() searchLastNews = new EventEmitter<void>();

  public email = '';
  public contact: Contact = {};

  constructor(
    private subscriptionService: SubscriptionService,
    private contactService: ContactService
  ) {}

  subscribe() {
    this.subscriptionService.create(this.email).subscribe((res) => {
      this.email = '';
      // @Wissem
      Swal.fire({ text: 'تم الإرسال بنجاح ', icon: 'success' });
    });
  }

  submit(form: NgForm) {
    if (form) {
      this.contactService.save(this.contact).subscribe();
    }
  }
}
