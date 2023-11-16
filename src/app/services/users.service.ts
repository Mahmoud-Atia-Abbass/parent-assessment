import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserProfileRequestModel, CreateUserProfileResponseModel, UsersResponseModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(this.apiUrl);
  }

  createUser(profile: CreateUserProfileRequestModel): Observable<CreateUserProfileResponseModel> {
    return this.http.post<CreateUserProfileResponseModel>(this.apiUrl, { profile });
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  editUser(profile: CreateUserProfileRequestModel): Observable<CreateUserProfileResponseModel> {
    const url = `${this.apiUrl}/${profile.id}`;
    const { name, job } = { ...profile };
    return this.http.put<CreateUserProfileResponseModel>(url, { name, job });
  }

}
