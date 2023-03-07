import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
declare var $: any;
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private spinnerService: NgxLoaderSpinnerService,
    private router: Router,
    private userService: UserService
  ) {}

  loginForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signUpForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    emailId: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  errorMessage: string = '';
  successMessage: string = '';
  alertHeading: string = '';
  success: boolean = false;

  errorMessageOnsignUp: string = '';
  successMessageOnsignUp: string = '';
  alertHeadingOnsignUp: string = '';
  successOnsignUp: boolean = false;

  onLoad: boolean = true;
  onLoadOnsignUp: boolean = true;

  isLoggedIn = localStorage.getItem('isAuthenticated') == 'true' ? true : false;

  ngOnInit(): void {}

  // login
  login() {
    this.onLoad = false;
    try {
      this.spinnerService.show();
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.success = true;
          this.alertHeading = response.message;

          setTimeout(() => {
            this.errorMessage = '';
            this.successMessage = '';
            this.alertHeading = '';
            this.success = false;
            this.onLoad = true;
          }, 3000);

          setTimeout(() => {
            $('#loginModal').modal('hide');
            this.loginForm.reset()
            this.router.navigate(['/inner-dashboard']);
            this.spinnerService.hide();
          }, 1500);
        },
        (err: any) => {
          console.error(`Error [login]:  , ${JSON.stringify(err.error)}`);
          this.alertHeading = err.error.message;
          this.errorMessage = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [login]:  , ${JSON.stringify(err)}`);
      this.alertHeading = err.error.message;
      this.errorMessage = err.error.body;
      this.spinnerService.hide();
    }
  }

  goToDashboard() {
    this.router.navigate(['/inner-dashboard']);
  }

  // Signup and create a user
  saveUser() {
    this.onLoadOnsignUp = false;
    this.spinnerService.show();
    try {
      this.userService.saveUser([this.signUpForm.value]).subscribe(
        (response: any) => {
          this.successOnsignUp = true;
          this.alertHeadingOnsignUp = response.message;

          setTimeout(() => {
            this.errorMessageOnsignUp = '';
            this.successMessageOnsignUp = '';
            this.alertHeadingOnsignUp = '';
            this.successOnsignUp = false;
            this.onLoadOnsignUp = true;
          }, 3000);

          setTimeout(() => {
            $('#signUpModal').modal('hide');
            this.signUpForm.reset();
            this.spinnerService.hide();
          }, 1500);
        },
        (err: any) => {
          console.error(`Error [saveUser]:  , ${JSON.stringify(err.error)}`);
          this.alertHeadingOnsignUp = err.error.message;
          this.errorMessageOnsignUp = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [saveUser]:  , ${JSON.stringify(err)}`);
      this.alertHeadingOnsignUp = err.error.message;
      this.errorMessageOnsignUp = err.error.body;
      this.spinnerService.hide();
    }
  }
}
