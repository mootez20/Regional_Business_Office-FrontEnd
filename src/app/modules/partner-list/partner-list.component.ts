import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/core/models';
import { PartnerService } from 'src/app/core/service/partner.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {  
  public partnerList: Partner[] = [];
  public total = 0;
  public page = 1;

  public STORAGE_URL = environment.storageUrl;

  constructor(    private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.findAll().subscribe((res) => { 
      this.partnerList = res;
      this.total = res.length;
    });
  }

}
