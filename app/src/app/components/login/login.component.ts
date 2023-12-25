import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm!: FormGroup;
    submitted: boolean = false;

    message: string = '';
    errorMessage: string = '';

    constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['message'] != undefined) {
                this.message = params['message'];
            }
        })

        this.loginForm = this.formBuilder.group({
            identity: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onSubmit() {
        this.submitted = true;

        if (!this.loginForm.valid) {
            return;
        }

        const identity = this.loginForm.controls['identity'].value;
        const password = this.loginForm.controls['password'].value;

        this.userService.auth(identity, password).subscribe(res => {
            if (res.result == 'success') {
                this.message = '';
                this.errorMessage = '';

                sessionStorage.setItem('userid', res.data);
                this.router.navigate(['/']);
            } else {
                this.message = '';
                this.errorMessage = res.message;
            }
        })
    }
}
