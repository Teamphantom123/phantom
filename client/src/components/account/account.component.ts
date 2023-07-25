import { Component } from '@angular/core';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { UserService } from 'src/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  fullName: string = '';
  emailId: any = '';

  constructor(
    private spinnerService: NgxLoaderSpinnerService,
    private userService: UserService
  ) {}

  accountForm = new FormGroup({
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
  });

  className: string = '';
  header: any = null;
  message: any = null;
  onComponentLoad: boolean = true;

  ngOnInit() {
    this.getUserByQuery();
  }

  getUserByQuery() {
    this.spinnerService.show();
    try {
      this.userService
        .getUserbyQuery(`_id=${sessionStorage.getItem('userId')}`)
        .subscribe(
          (response: any) => {
            console.log(`User Data: ${JSON.stringify(response)}`);
            this.accountForm.patchValue({
              firstName: response.body[0].firstName,
              lastName: response.body[0].lastName,
              emailId: response.body[0].emailId,
              mobile: response.body[0].mobile,
            });
            this.fullName =
              response.body[0].firstName + ' ' + response.body[0].lastName;
            this.emailId = response.body[0].emailId;
          },
          (err: any) => {
            console.error(`Error [getUser]:  , ${JSON.stringify(err.error)}`);
            this.spinnerService.hide();
          }
        );
    } catch (err: any) {
      console.error(`Error [getUser]:  , ${JSON.stringify(err)}`);
      this.spinnerService.hide();
    }
  }

  updateUser() {
    this.spinnerService.show();
    try {
      const query = `_id=${sessionStorage.getItem('userId')}`;
      this.userService.updateUser(query, this.accountForm.value).subscribe(
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
          }, 8000);

          this.getUserByQuery();
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
}
