import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public password = '';
  public confirmPassword = '';
  private token = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.params['token'];
  }

  submit(form: NgForm) {
    if (form.valid && this.password === this.confirmPassword) {
      this.authService.resetPassword(this.token, this.password).subscribe();
    }
  }
}
