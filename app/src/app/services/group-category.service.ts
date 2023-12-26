import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupCategory } from '../interfaces/group-category';
import { BASE_API_URL } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class GroupCategoryService {

    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json'
        })
    }


    constructor(private http: HttpClient) { }


    public getAllGroupCategory(): Observable<GroupCategory[]> {
        const url = BASE_API_URL + '/api/group_category';

        return this.http.get<GroupCategory[]>(url);
    }
}
