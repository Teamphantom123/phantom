import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url } from '../../src/config/constants';
import { query } from '@angular/animations';

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
          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem(
            'isAdmin',
            data.user.isAdmin == 'GRANTED' ? 'true' : 'false'
          );
          sessionStorage.setItem('userId', data.user._id);
        } else sessionStorage.setItem('isAuthenticated', 'false');
        return data;
      })
    );
  }

  updateUser(query: any, userData: any): Observable<any> {
    console.log(`userData: ${JSON.stringify(userData)}`);
    return this.http.put(url.domainurl + `users?${query}`, userData);
  }

  forgotPassword(query: any, body: any): Observable<any> {
    console.log(`userData: ${JSON.stringify(query)}`);
    return this.http.put(url.domainurl + `users?${query}`, body);
  }
}
