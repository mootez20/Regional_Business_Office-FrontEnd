import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceService } from 'src/app/core/service/service.service';
import { Service } from 'src/app/core/models/service.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  public STORAGE_URL = environment.storageUrl;

  public serviceList: Service[] = [];
  public total = 0;
  public page = 1;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getServices().subscribe((res) => {
      this.serviceList = res;
      this.total = res.length;
    });
  }
}
