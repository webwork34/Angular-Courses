import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './../../shared/user';
import { NgForm } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submit = 'submit';
  Login = 'Login';
  user: User = new User();
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showEye = true;
  aSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeVisability() {
    this.showEye = !this.showEye;
  }

  onSubmit(loginForm: NgForm) {
    this.aSub = this.authService.login(this.user).subscribe(
      (data) => {
        // console.log('data: ', data);
        this.router.navigate(['/courses']);
        loginForm.reset();
      },
      (err) => {
        console.log('err: ', err);
      }
    );

    loginForm.reset();
  }

  goToRegister() {
    this.router.navigate(['/registration']);
  }
}
