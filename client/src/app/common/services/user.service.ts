import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../../environments/environment';
import { UpdateUser } from '../models/update-user';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  chosenDepartment = new EventEmitter();

  constructor(private readonly http: HttpClient) {
  }

  user: User;
  helper = new JwtHelperService();

  public takeUser: BehaviorSubject<User> = new BehaviorSubject({});

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users`, httpOptions);
  }

  getAllTeamLeads(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=teamlead`, httpOptions);
  }

  getUsersOfHr(): Observable<User[]> {
    const userId = this.getUserId();

    return this.http.get<User[]>(`${api}users?hr=${userId}`, httpOptions);
  }

  getAllHr(): Observable<any> {
    return this.http.get<any>(`${api}users?type=hr`, httpOptions);
  }

  getAllManagers(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=manager`, httpOptions);
  }

  getUser(id?: string, required?: boolean): Observable<User> {
    const userId = this.getUserId();

    return this.http.get<any>(`${api}users/${id || userId}`, httpOptions)
      .pipe(tap(res => {
          this.user = res;
          this.currentUser(required, this.user);
        })
      );
  }

  getUserId(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).id;
    }
  }

  getUserType(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).type;
    }
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: {id}
    };

    return this.http.delete(`${api}users/`, deleteOptions);
  }

  updateUser(user: User): Observable<any> {
    const updateUser = new UpdateUser();
    updateUser.mapUser(user);

    return this.http.put<User>(`${api}users`, updateUser, httpOptions);
  }

  getHeader(): any {
    return httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  postImage(avatar: File): Observable<object> {
    const id = this.getUserId();
    const fd = new FormData();
    fd.append('id', id);
    fd.append('avatar', avatar);

    return this.http.post(`${api}users/change_avatar`, fd);
  }

  checkProperty(property): object {
    if (property) {
      return property;
    }
  }

  currentUser(required: boolean, data: User): void {
    if (!required) {
      this.takeUser.next(data);
    }
  }

}
