import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import { City, Event } from 'src/app/core/models';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  @Input() selectedCity?: City;
  @Input() eventList: Event[] = [];
  @Input() cityList: City[] = [];

  @Output() cityChanged = new EventEmitter<City>();

  public currentCity?: City;

  STORAGE_URL = environment.storageUrl;

  constructor() {}

  ngOnInit(): void {
    this.currentCity = this.cityList.find((city) => city.id === 1);
  }

  getEvents(): void {}
}
