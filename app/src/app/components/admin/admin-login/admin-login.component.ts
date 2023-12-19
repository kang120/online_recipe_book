import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/admin/session.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    loginForm!: FormGroup;
    submitted: boolean = false;
    errorMessage: string = "";

    constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onSubmit() {
        this.submitted = true;

        if (!this.loginForm.valid) {
            return;
        }

        const username: string = this.loginForm.controls['username'].value;
        const password: string = this.loginForm.controls['password'].value;

        this.sessionService.authenticate(username, password).subscribe(res => {
            if (res == -1) {
                this.errorMessage = "Invalid login"
            } else {
                sessionStorage.setItem('userid', res.toString());

                this.router.navigate(['/admin']);
            }
        });
    }
}
