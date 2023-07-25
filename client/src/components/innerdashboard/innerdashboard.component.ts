import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-innerdashboard',
  templateUrl: './innerdashboard.component.html',
  styleUrls: ['./innerdashboard.component.css'],
})
export class InnerdashboardComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('isAdmin') == 'true')
      this.router.navigate(['/admin-dashboard']);
    else this.router.navigate(['/user-dashboard']);
  }
}
