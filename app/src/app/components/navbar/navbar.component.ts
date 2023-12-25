import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    isAuth: boolean = false;

    faBars = faBars;

    constructor(private router: Router) {
        const userid: string | null = sessionStorage.getItem('userid');

        if (userid != null) {
            this.isAuth = true;
        }
    }

    logout() {
        sessionStorage.removeItem('userid');

        this.router.navigate(['/login']);
    }

    toggleNavbar() {
        const navbarCollapse = document.getElementById('navbarCollapse');

        if (navbarCollapse?.classList.contains('hidden')) {
            navbarCollapse.classList.replace('hidden', 'block');
        } else {
            navbarCollapse?.classList.replace('block', 'hidden');
        }
    }
}
