import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Event, EventNatureEnum } from 'src/app/core/models';
import { EventService } from 'src/app/core/service/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDialogComponent {
  public event = {} as Event;
  public editMode = true;
  public EventNatureEnum = EventNatureEnum;

  public STORAGE_URL = environment.storageUrl;
  private pipe = new DatePipe('en-US');

  constructor(
    private activeModal: NgbActiveModal,
    private eventService: EventService
  ) {}

  public save(form: NgForm) {
    // if (form.valid) {
    (!this.editMode
      ? this.eventService.create(this.event)
      : this.eventService.update(this.event)
    ).subscribe((_) => this.close());
    // }
  }

  public selectImage(_event: any): void {
    const fileList: FileList = _event.target.files;
    const files = Object.values(fileList || {});
    const file: File = files[0];
    if (file) {
      this.eventService.updateImage(file, this.event).subscribe((image) => {
        this.event.image = image.replace('public/', '');
      });
    }
  }

  public startedAtChanged(date: string) {
    this.event.startedAt = new Date(date);
  }
  public endedAtChanged(date: string) {
    this.event.endedAt = new Date(date);
  }

  public toString(date?: Date) {
    return this.pipe.transform(date || new Date(), 'yyyy-MM-dd') || '';
  }

  public close() {
    this.activeModal.dismiss();
  }
}
