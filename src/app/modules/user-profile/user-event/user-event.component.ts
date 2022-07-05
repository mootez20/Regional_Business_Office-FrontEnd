import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event, EventNatureEnum } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss'],
})
export class UserEventComponent {
  @Input() event = {} as Event;
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() createForm = new EventEmitter<void>();
  @Output() editForm = new EventEmitter<void>();

  public EventNatureEnum = EventNatureEnum;
  public STORAGE_URL = environment.storageUrl;
}
