import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  // Get a feedbackQ
  getFeedbackbyQuery(query: any): Observable<any> {
    console.log(`feedBack Q: ${JSON.stringify(query)}`);
    return this.http.get(url.domainurl + `feedbacks?${query}`);
  }

  postComments(feedBackObj: any): Observable<any> {
    console.log(`feedBack Obj: ${JSON.stringify(feedBackObj)}`);
    return this.http.post(url.domainurl + `feedbacks/comments`, feedBackObj);
  }

}
