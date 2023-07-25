import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { UserService } from 'src/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userList: any = [];
  className = '';
  onComponentLoad: boolean = true;
  header: any = null;
  message: any = null;

  constructor(
    private router: Router,
    private spinnerService: NgxLoaderSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserByQuery();
  }

  getUserByQuery() {
    this.spinnerService.show();
    try {
      var query = ``;
      this.userService.getUserbyQuery(query).subscribe(
        (response: any) => {
          console.log(`User Data: ${JSON.stringify(response)}`);
          this.userList = response.body;
          this.userList = this.userList.filter(
            (user: any) => user.designation !== 'Admin'
          );
          console.log(`User List: ` + JSON.stringify(this.userList));
          this.spinnerService.hide();
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

  updateUserApprovalStatus(id: any, approvalStatus: any, emailId: any) {
    this.spinnerService.show();
    try {
      const query = `_id=${id}`;
      const body = { approvalStatus: approvalStatus, emailId: emailId };
      this.userService.updateUser(query, body).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.header = 'Success';
          this.message = `User access '${approvalStatus}' successful`;
          this.className = 'alert alert-success';

          // Email alert fadeout after 5 secs
          swal.fire({
            text: response.emailSent
              ? `Email has been sent to user on approval status saying '${approvalStatus}'. Thank you!`
              : `Email failed to send on approval status saying '${approvalStatus}'. Please contact administrator for more details.`,
            icon: response.emailSent ? 'success' : 'error',
            showConfirmButton: false,
            timer: 5000,
          });

          // Reset state after 8 secs
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
          console.error(
            `Error [approvalStatusUpdate]:  , ${JSON.stringify(err.error)}`
          );
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [approvalStatusUpdate]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.spinnerService.hide();
    }
  }

  updateGrantAdminAccess(id: any, grantAdminAccess: any, emailId: any) {
    this.spinnerService.show();
    try {
      const query = `_id=${id}`;
      const body = { isAdmin: grantAdminAccess, emailId: emailId };
      this.userService.updateUser(query, body).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.header = 'Success';
          this.message = `Admin access '${grantAdminAccess}' successful`;
          this.className = 'alert alert-success';

          // Email alert fadeout after 5 secs
          swal.fire({
            text: response.emailSent
              ? `Email has been sent to user on admin privileges status saying '${grantAdminAccess}'. Thank you!`
              : `Email failed to send on admin privileges status saying '${grantAdminAccess}'. Please contact administrator for more details.`,
            icon: response.emailSent ? 'success' : 'error',
            showConfirmButton: false,
            timer: 5000,
          });

          // Reset state after 8 secs
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
          console.error(
            `Error [approvalStatusUpdate]:  , ${JSON.stringify(err.error)}`
          );
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [approvalStatusUpdate]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.spinnerService.hide();
    }
  }
}
