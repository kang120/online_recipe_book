import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../constants';
import { Group } from '../interfaces/group';
import { GroupResponse } from '../interfaces/response/group-response';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }


    public createNewGroup(newGroup: Group): Observable<GroupResponse> {
        const url = BASE_API_URL + '/api/group';

        return this.http.post<GroupResponse>(url, newGroup, this.headers);
    }
}
