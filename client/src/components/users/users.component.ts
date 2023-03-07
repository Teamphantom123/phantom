import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userList: any = [];

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
      this.userService
        .getUserbyQuery(`_id=${localStorage.getItem('userId')}`)
        .subscribe(
          (response: any) => {
            console.log(`User Data: ${JSON.stringify(response)}`);
            this.userList = response.body;
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
}
