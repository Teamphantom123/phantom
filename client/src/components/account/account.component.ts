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
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    emailId: new FormControl(null, [Validators.required]),
  });

  errorMessageOnUpdateUser: string = '';
  successMessageOnUpdateUser: string = '';
  alertHeadingOnUpdateUser: string = '';
  successOnUpdateUser: boolean = false;
  onLoadOnUpdateUser: boolean = true;

  ngOnInit() {
    this.getUserByQuery();
  }

  getUserByQuery() {
    this.spinnerService.show();
    try {
      this.userService
        .getUserbyQuery(`_id=${localStorage.getItem('userId')}`)
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
    this.onLoadOnUpdateUser = false;
    this.spinnerService.show();
    try {
      this.userService.updateUser(this.accountForm.value).subscribe(
        (response: any) => {
          this.successOnUpdateUser = true;
          this.alertHeadingOnUpdateUser = response.message;
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1500);

          setTimeout(() => {
            this.errorMessageOnUpdateUser = '';
            this.successMessageOnUpdateUser = '';
            this.alertHeadingOnUpdateUser = '';
            this.successOnUpdateUser = false;
            this.onLoadOnUpdateUser = true;
          }, 3000);
        },
        (err: any) => {
          console.error(`Error [saveUser]:  , ${JSON.stringify(err.error)}`);
          this.alertHeadingOnUpdateUser = err.error.message;
          this.errorMessageOnUpdateUser = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [saveUser]:  , ${JSON.stringify(err)}`);
      this.alertHeadingOnUpdateUser = err.error.message;
      this.errorMessageOnUpdateUser = err.error.body;
      this.spinnerService.hide();
    }
  }
}
