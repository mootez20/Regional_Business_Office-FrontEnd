import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { City, User } from 'src/app/core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public user: User = { city: {} as City };
  public confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    if (form.valid && this.user.password == this.confirmPassword)
      this.authService
        .register({ ...this.user, active: true })
        .subscribe(() => {
          this.router.navigate(['/login']);
          window.scroll(0, 0);

        });
  }
}
