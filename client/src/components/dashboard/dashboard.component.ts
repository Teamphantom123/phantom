import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
declare var $: any;
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import swal from 'sweetalert2';

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

  isForgotPassword: boolean = false;
  userId: any = '';
  showDummyPassword: any = false;

  loginForm = new FormGroup({
    _user: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  forgotPasswordForm = new FormGroup({
    _user: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
    ]),
  });

  signUpForm = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    ]),
    emailId: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[^\s@]+@[^\s@]+\.[^\s@]+/),
    ]),
    designation: new FormControl(null, [Validators.required]),
    govtIDNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
    ]),
  });

  className: string = '';
  message: any = null;
  header: any = null;
  onComponentLoad: boolean = true;
  onLoad: boolean = true;
  samePassword: boolean = true;
  _samePassword: boolean = true;

  isLoggedIn =
    sessionStorage.getItem('isAuthenticated') == 'true' ? true : false;

  ngOnInit(): void {}

  comparePassword() {
    this.onLoad = false;
    if (
      this.signUpForm.get('password')?.value ==
      this.signUpForm.get('confirmPassword')?.value
    )
      this.samePassword = true;
    else {
      this.signUpForm.get('confirmPassword')?.setErrors({ incorrect: true });
      this.samePassword = false;
    }
  }

  _comparePassword() {
    this.onLoad = false;
    if (
      this.forgotPasswordForm.get('password')?.value ==
      this.forgotPasswordForm.get('confirmPassword')?.value
    )
      this._samePassword = true;
    else {
      this.forgotPasswordForm
        .get('confirmPassword')
        ?.setErrors({ incorrect: true });
      this._samePassword = false;
    }
  }

  // login
  login() {
    try {
      this.spinnerService.show();
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.className = 'alert alert-success';
          this.header = 'Success';
          this.message = response.message;

          setTimeout(() => {
            this.className = '';
            this.onComponentLoad = true;
            this.header = null;
            this.message = null;
            $('#loginModal').modal('hide');
            this.loginForm.reset();
            this.router.navigate(['/inner-dashboard']);
          }, 1500);
          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(`Error [login]:  , ${JSON.stringify(err.error)}`);
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.showDummyPassword = false;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [login]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.showDummyPassword = false;
      this.spinnerService.hide();
    }
  }

  goToDashboard() {
    this.router.navigate(['/inner-dashboard']);
  }

  // Signup and create a user
  saveUser() {
    this.spinnerService.show();
    try {
      this.userService.saveUser([this.signUpForm.value]).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.className = 'alert alert-success';
          this.header = 'Success';
          this.message = response.message;

          setTimeout(() => {
            this.className = '';
            this.onComponentLoad = true;
            this.header = null;
            this.message = null;
            $('#signUpModal').modal('hide');
            this.signUpForm.reset();
          }, 1500);

          swal.fire({
            text: response.emailSent
              ? 'Email has been sent to admin for further approval. Thank You!'
              : 'Email failed to send for approval. Please contact administrator for more details.',
            icon: response.emailSent ? 'success' : 'error',
            showConfirmButton: false,
            timer: 4500,
          });

          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(`Error [saveUser]:  , ${JSON.stringify(err.error)}`);
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [saveUser]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.spinnerService.hide();
    }
  }

  onForgotPasswordSelection() {
    this.className = '';
    this.onComponentLoad = true;
    this.header = null;
    this.message = null;
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.isForgotPassword = true;
  }

  onBackToLoginSelection() {
    this.className = '';
    this.onComponentLoad = true;
    this.header = null;
    this.message = null;
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.isForgotPassword = false;
  }

  forgotPassword() {
    try {
      this.spinnerService.show();
      const __user = this.forgotPasswordForm.get('_user')?.value;
      // const query = `{$or: [{userName: '${__user}'},{emailId: '${__user}'}]}`;
      const query = `__user=${__user}`;
      let body = {
        password: this.forgotPasswordForm.get('password')?.value,
      };
      this.userService.forgotPassword(query, body).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.className = 'alert alert-success';
          this.header = 'Success';
          this.message = 'Password reset successful';

          setTimeout(() => {
            this.className = '';
            this.onComponentLoad = true;
            this.header = null;
            this.message = null;
            this.loginForm.reset();
            this.forgotPasswordForm.reset();
            this.isForgotPassword = false;
          }, 3000);

          swal.fire({
            text: response.emailSent
              ? 'Reset Password has been sent to your registered Email ID. Thank You!'
              : 'Reset Password failed to send to your registered Email ID. Please contact administrator for more details.',
            icon: response.emailSent ? 'success' : 'error',
            showConfirmButton: false,
            timer: 4500,
          });

          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(
            `Error [Forgot-Password]:  , ${JSON.stringify(err.error)}`
          );
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [Forgot-Password]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.spinnerService.hide();
    }
  }

  resetModal() {
    this.isForgotPassword = false;
    this.loginForm.reset();
    this.signUpForm.reset();
    this.forgotPasswordForm.reset();
    this.onLoad = true;
  }
}
