import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/service/auth.service';
import { City, ToasterOptionData, User } from '../../../core/models';
import { ToasterService } from '../../../core/service/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user: User = { city: {} as City };

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  submit(form: NgForm) {
    if (form.valid)
      this.authService.login(this.user).subscribe((success) => {
        this.showToaster(success);
        if (success) {
          this.router.navigate(['/']);
          window.scroll(0, 0);
        }
      });
  }

  private showToaster(success: boolean): void {
    const toasterOption: ToasterOptionData = {
      title: success ? 'تسجيل الدخول بنجاح' : 'فشل عملية الدخول!',
      params: { closeButton: true },
      message: success
        ? ''
        : 'الرجاء استخدام اسم المستخدم وكلمة المرور الصحيحين',
    };

    success
      ? this.toasterService.success(toasterOption)
      : this.toasterService.error(toasterOption);
  }
}
