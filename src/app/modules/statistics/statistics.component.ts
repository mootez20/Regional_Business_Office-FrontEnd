import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartType, ChartDataset } from 'chart.js';
import { StatisticsService } from 'src/app/core/service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public loading = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [] },
    { data: [] },
    { data: [] },
    { data: [] },
  ];

  constructor(
    private statisticsService: StatisticsService,
    private translateService: TranslateService
  ) {
    this.statisticsService.getCityStatistics().subscribe((citiesStats) => {
      citiesStats.forEach((cityStats) => {
        this.barChartLabels.push(this.translateService.instant(`cities.${cityStats.name}`));
        this.barChartData[0].label =
          this.translateService.instant('statistics.events');
        this.barChartData[1].label =
          this.translateService.instant('statistics.users');
        this.barChartData[2].label =
          this.translateService.instant('statistics.tickets');
        this.barChartData[3].label = this.translateService.instant(
          'statistics.responses'
        );
        this.barChartData[0].data.push(cityStats.eventsCount);
        this.barChartData[1].data.push(cityStats.usersCount);
        this.barChartData[2].data.push(cityStats.ticketsCount);
        this.barChartData[3].data.push(cityStats.responsesCount);
      });
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
