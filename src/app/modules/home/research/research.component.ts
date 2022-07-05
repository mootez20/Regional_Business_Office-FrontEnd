import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { City } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
})
export class ResearchComponent implements OnInit {
  @Input() set _selectedCity(city: City) {
    this.selectedCity = city;
    setTimeout(() => {
      this.selectedCity =  this.cityList.find((_city) => _city?.id === city.id);
      this.currentCity = this.selectedCity ;  
    }, 3000); // @mootez
  }
  @Input() cityList: City[] = [];
  @Input() images: String[] = [];
  @Input() name?: string;
  @Input() id?: number;
  @Output() cityChanged = new EventEmitter<City>();

  public selectedCity?: City;
  public currentCity?: City;

  public tunisiaImages = [
    'cities/tunisia-1.jpg',
    'cities/tunisia-2.jpg',
    'cities/tunisia-3.jpg',
    'cities/tunisia-4.jpg',
    'cities/tunisia-5.jpg',
    'cities/tunisia-6.jpg',
    'cities/tunisia-7.jpg',
    'cities/tunisia-8.jpg',
    'cities/tunisia-9.jpg',
    'cities/tunisia-10.jpg',
  ];
  public STORAGE_URL = environment.storageUrl;

  constructor() {}

  ngOnInit(): void {
  }

  public selectCity(city?: City) {
    this.cityChanged.emit(city);
    window.scrollTo(0, 0);
  }
}
