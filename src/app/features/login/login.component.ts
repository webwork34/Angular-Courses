import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/user';
import { NgForm } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Login = 'Login';

  user: User = new User();

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showEye = true;

  constructor() {}

  ngOnInit(): void {}

  changeVisability() {
    this.showEye = !this.showEye;
  }

  onSubmit(loginForm: NgForm) {
    console.log(this.user);
    loginForm.reset();
  }
}
