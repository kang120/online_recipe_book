import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/admin/session.service';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
    isLogin: boolean = false;

    constructor(private sessionService: SessionService, private router: Router) {
        const userid = sessionStorage.getItem('userid');

        if (userid === undefined || userid === null) {
            this.router.navigate(['/admin/login']);
        } else {
            this.isLogin = true;
        }
    }

    logout(): void {
        sessionStorage.removeItem('userid');

        this.router.navigate(['/admin/login']);
    }
}
