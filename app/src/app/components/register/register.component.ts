import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/helper/validator';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    registerForm!: FormGroup;
    registerFormSubmitted: boolean = false;

    isVerifying: boolean = false;
    verificationForm!: FormGroup;
    verificationFormSubmitted: boolean = false;

    errorMessage: string = '';

    verificationEmail: string = 'leeweikang1220@gmail.com';
    verificationCode!: string;

    resendEnable: boolean = true;
    resendCountdown: number = 59;
    resendInterval: any;

    constructor(private formBuilder: FormBuilder, private mailService: MailService, private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            password: ['', [Validators.required]],
            confirmedPassword: ['', Validators.required]
        }, {
            validator: passwordMatchValidator
        })

        this.verificationForm = this.formBuilder.group({
            verificationCode: ['', [Validators.required]],
        })
    }

    onRegisterFormSubmit() {
        this.registerFormSubmitted = true;

        if (!this.registerForm.valid) {
            return;
        }

        const email = this.registerForm.controls['email'].value;
        const username = this.registerForm.controls['username'].value;

        this.userService.checkNewUserValid(email, username).subscribe(res => {
            if (res.result == 'success') {
                this.errorMessage = '';
                this.verificationEmail = email;
                this.isVerifying = true;

                this.sendEmail();
            } else {
                this.errorMessage = res.message;
            }
        })
    }

    onVerificationFormSubmit() {
        this.verificationFormSubmitted = true;

        if (!this.verificationForm.valid) {
            return;
        }

        const inputCode = this.verificationForm.controls['verificationCode'].value;

        if (inputCode == this.verificationCode) {
            this.errorMessage = '';
            const email = this.registerForm.controls['email'].value;
            const username = this.registerForm.controls['username'].value;
            const password = this.registerForm.controls['password'].value;

            this.userService.addNewUser(email, username, password).subscribe(res => {
                if (res.result == 'success') {
                    const message = 'Successfully create account';

                    this.router.navigate(['/login'], { queryParams: { message } })
                }
            })
        } else {
            this.errorMessage = 'Invalid code'
        }
    }

    sendEmail() {
        this.mailService.sendVerificationEmail(this.verificationEmail).subscribe(res => {
            if (res.result == 'success') {
                this.verificationCode = res.data;
            }
        })
    }

    onResend() {
        this.sendEmail();

        this.resendEnable = false;

        this.resendInterval = setInterval(() => {
            this.resendCountdown -= 1;

            if (this.resendCountdown == 0) {
                this.resendEnable = true;
                clearInterval(this.resendInterval);
            }
        }, 1000)
    }

    reset() {
        this.errorMessage = '';
        this.isVerifying = false;
    }

    getRange(n: number): number[] {
        return Array.from({ length: n }, (_, index) => index + 1);
    }
}
