import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private router: Router) {
        const userid: string | null = sessionStorage.getItem('userid');

        if (userid == null) {
            router.navigate(['/login']);
        }
    }
}
