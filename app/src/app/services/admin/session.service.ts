import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../constants';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/interfaces/admin/admin';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json'
        })
    };

    private userid: number = -1;

    constructor(private http: HttpClient) { }

    authenticate(username: string, password: string): Observable<number> {
        const url: string = BASE_API_URL + '/api/admin/auth';

        return this.http.post<number>(url, {
            username: username,
            password: password
        }, this.headers);
    }

    setSessionUserId(userid: number): void {
        this.userid = userid;
    }

    getSessionUserId(): number {
        return this.userid;
    }
}
