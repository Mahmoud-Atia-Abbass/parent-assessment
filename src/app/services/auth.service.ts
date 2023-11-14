import { LoginCredentials } from './../models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient) { }

  login(loginCredentials: LoginCredentials): Observable<any> {
    const { userName: email, password } = { ...loginCredentials };

    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, { email, password });
  }

}
