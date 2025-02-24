import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with your Flask backend URL

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }
  

  generateMap(requestData: { department: string; point: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate_map`, requestData);
  }
}
