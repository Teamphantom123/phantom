import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private spinnerService: NgxLoaderSpinnerService,
    private userService: UserService
  ) {}

  currentPage: string = '';
  isAdmin = localStorage.getItem('isAdmin');
  fullName: string = '';
  

  ngOnInit() {
    this.currentPage = this.router.url;
    this.getUserByQuery();
  }

  //Route to desired screen
  routePage(pageToRoute: any) {
    this.router.navigate([`/${pageToRoute}`]);
  }

  //Logout
  logout() {
    this.router.navigate([`/`]);
    localStorage.setItem('isAuthenticated', 'false');
  }

  getUserByQuery() {
    this.spinnerService.show();
    try {
      this.userService
        .getUserbyQuery(`_id=${localStorage.getItem('userId')}`)
        .subscribe(
          (response: any) => {
            console.log(`User Data: ${JSON.stringify(response)}`);
            this.fullName =
              response.body[0].firstName + ' ' + response.body[0].lastName;
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
