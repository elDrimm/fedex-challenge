import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { User } from "@shared/models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = `${environment.api.baseUrl}/users`;

  constructor(
    private readonly _http: HttpClient
  ) { }

  addUser(user: User): Observable<User> {
    return this._http.post<User>(this.url, user);
  }
}
