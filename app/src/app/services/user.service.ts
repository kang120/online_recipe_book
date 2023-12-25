import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../constants';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public checkNewUserValid(email: string, username: string): Observable<UserResponse> {
        const url: string = BASE_API_URL + '/api/user/verify_new_user';

        return this.http.post<UserResponse>(url, {
            email: email,
            username: username
        }, this.headers);
    }

    public addNewUser(email: string, username: string, password: string): Observable<UserResponse> {
        const url: string = BASE_API_URL + '/api/user';

        return this.http.post<UserResponse>(url, {
            email: email,
            username: username,
            password: password
        }, this.headers);
    }

    public checkEmailExist(email: string): Observable<UserResponse> {
        const url: string = BASE_API_URL + '/api/user/check_email_exist';

        return this.http.post<UserResponse>(url, email, this.headers);
    }

    public resetPassword(id: number, password: string): Observable<UserResponse> {
        const url: string = BASE_API_URL + `/api/user/reset_password/${id}`;

        return this.http.put<UserResponse>(url, password, this.headers);
    }

    public auth(identity: string, password: string): Observable<UserResponse> {
        const url: string = BASE_API_URL + '/api/user/auth';

        return this.http.post<UserResponse>(url, {
            identity: identity,
            password: password
        }, this.headers);
    }
}
