import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  post(recordData: any): Observable<any> {
    return this.http.post(this.apiUrl, recordData);
  }

  update(recordId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${recordId}`, updatedData);
  }

  delete(recordId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${recordId}`);
  }
}