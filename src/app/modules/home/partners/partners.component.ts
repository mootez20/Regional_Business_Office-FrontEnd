import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Partner } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent {
  @Input() partnerList: Partner[] = [];
  // @Input() set loading(_loading: boolean) {
  //   if(!_loading) {
  //     this.spinner.hide();
  //   }
  // }


  public STORAGE_URL = environment.storageUrl;
  // constructor(private spinner: NgxSpinnerService) {    
  //   this.spinner.show();
  // }
}
