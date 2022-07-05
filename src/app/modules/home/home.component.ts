import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';

import { AlbumService } from '../../core/service/album.service';
import { AuthService } from '../../core/service/auth.service';
import { CityService } from '../../core/service/city.service';
import { EventService } from '../../core/service/event.service';
import { PartnerService } from '../../core/service/partner.service';
import { Album, City, Event, Partner, User } from '../../core/models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user = {} as User;
  public cityList: City[] = [];
  public newsList: Event[] = [];
  public eventList: Event[] = [];
  public albumList: Album[] = [];
  public partnerList: Partner[] = [];

  public loading = true;

  public defaultCity = {} as City;

  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private eventService: EventService,
    private albumService: AlbumService,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    this.partnerService.findAll().subscribe((res) => (this.partnerList = res)),
      this.cityService.findAll().subscribe((res) => (this.cityList = res)),
      this.authService.currentUser.subscribe((user) => {
        this.user = user;
        this.user.city = user.city && { ...user.city };
        this.cityChanged(user?.city, true);
      });
  }

  public cityChanged(city?: City, firstTime?: boolean): void {
    this.user.city = city;
    if (!firstTime) {
      this.authService.update(this.user).subscribe();
    }
    // console.log('home => ', this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    zip(this.eventService
      .getTopNews(this.user?.city?.id), this.eventService
      .getTopEvents(this.user?.city?.id), this.albumService
      .getTopAlbums(this.user?.city?.id)).subscribe(([newsList, eventList, albumList]) => {
        this.newsList = newsList;
        this.eventList = eventList;
        this.albumList = albumList;
        if(newsList && eventList && albumList) {
          this.loading = false;
        }
      });
  }

  public loadEvents(city?: City) {
    this.eventService
      .getTopEvents(city?.id)
      .subscribe((res) => (this.eventList = res));
  }
}
