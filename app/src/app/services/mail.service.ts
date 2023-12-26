import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../constants';
import { MailResponse } from '../interfaces/response/mail-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MailService {

    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public sendVerificationEmail(email: string): Observable<MailResponse> {
        const url: string = BASE_API_URL + '/api/mail/send_mail';

        return this.http.post<MailResponse>(url, {
            to: email,
            mailCode: 'verification'
        }, this.headers);
    }

    public sendResetPasswordEmail(email: string): Observable<MailResponse> {
        const url: string = BASE_API_URL + '/api/mail/send_mail';

        return this.http.post<MailResponse>(url, {
            to: email,
            mailCode: 'reset_password'
        }, this.headers);
    }
}
