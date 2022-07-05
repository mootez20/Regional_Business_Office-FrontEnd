import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { ToasterService } from 'src/app/core/service/toaster.service';
import { ToasterOptionData } from 'src/app/core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public email = '';

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService, private toasterService: ToasterService) {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    if (form.valid) {
      this.authService.forgetPassword(this.email).subscribe(
        (res: any) => {
          this.showToaster(true, res.message)
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => this.showToaster(false, error.message)
      );
    }
  }

  private showToaster(success: boolean, message: string): void {
    const toasterOption: ToasterOptionData = {
      title: this.translateService.instant(message),
      params: { closeButton: true },
    };

    success
      ? this.toasterService.success(toasterOption)
      : this.toasterService.error(toasterOption);
  }
}
