import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url } from '../../src/config/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Create a new user
  saveUser(userData: any): Observable<any> {
    console.log(`userData: ${JSON.stringify(userData)}`);
    return this.http.post(url.domainurl + `users`, userData);
  }

  // Get a user
  getUserbyQuery(query: any): Observable<any> {
    console.log(`userData: ${JSON.stringify(query)}`);
    return this.http.get(url.domainurl + `users?${query}`);
  }

  //Login
  login(loginData: any): Observable<any> {
    console.log(`loginData: ${JSON.stringify(loginData)}`);
    return this.http.post(url.domainurl + `auth/login`, loginData).pipe(
      map((data: any) => {
        if (data['message'] == 'Login successful') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem(
            'isAdmin',
            loginData.userName == 'admin' ? 'true' : 'false'
          );
          localStorage.setItem('userId', data.user._id);
        } else localStorage.setItem('isAuthenticated', 'false');
        return data;
      })
    );
  }

  updateUser(userData: any): Observable<any> {
    console.log(`userData: ${JSON.stringify(userData)}`);
    return this.http.put(
      url.domainurl + `users/${localStorage.getItem('userId')}`,
      userData
    );
  }
}
