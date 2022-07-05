import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { City, Event } from 'src/app/core/models';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  @Input() selectedCity?: City;
  @Input() newsList: Event[] = [];

  public STORAGE_URL = environment.storageUrl;

  constructor() {}
}
