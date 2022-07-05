import { EventService } from 'src/app/core/service/event.service';
import { Component, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/core/models';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  public eventList: Event[] = [];
  public total = 0;
  public page = 1;
  public isNewsList = false;
  public fiveNewsList: any;

  public STORAGE_URL = environment.storageUrl;
  @Output() lastNews: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.isNewsList = params['news'] === 'news';
      const city = this.authService.user?.city;
      (this.isNewsList
        ? this.eventService.getNews(city?.id)
        : this.eventService.getEvents(city?.id)
      ).subscribe((res) => {
        this.eventList = res;
        this.total = res.length;
        if (this.isNewsList && this.total > 6) this.lastNews = true;
        // console.log(this.total);
      });
    });
  }

  pageChanged(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }

  public searchLastNews() {
    this.eventService.getLast5News().subscribe((res) => {
      this.eventList = res;
      // this.page = 1;
    });
  }
}
