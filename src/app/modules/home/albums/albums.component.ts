import { Component, Input } from '@angular/core';
import { Album, City } from 'src/app/core/models';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {
  @Input() selectedCity?: City;
  @Input() albumList: Album[] = [];

  public STORAGE_URL = environment.storageUrl;

  constructor() {}
}
