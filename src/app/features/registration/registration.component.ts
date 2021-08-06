import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  Registration = 'Registration';
  submit = 'submit';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showEye = true;
  aSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeVisability() {
    this.showEye = !this.showEye;
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.authService.register(this.form.value).subscribe(
      (data) => {
        console.log('data: ', data);
        this.router.navigate(['/login']);
        this.form.reset();
      },
      (err) => {
        console.log('err: ', err);
        this.form.enable();
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
