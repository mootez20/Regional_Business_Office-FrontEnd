import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact, User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/service/auth.service';
import { ContactService } from 'src/app/core/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public user: User = {} as User;
  public contact: Contact = {};
  public connectedUser = false;

  constructor(
    private authService: AuthService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.authService.isConnected.subscribe(
      (isConnected) => (this.connectedUser = isConnected)
    );
    this.authService.currentUser.subscribe((user) => (this.user = user));
  }

  send(form: NgForm) {
    if (form.valid) {
      this.contactService.save(this.contact).subscribe();
    }
  }
}
