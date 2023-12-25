import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/helper/validator';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

    emailForm!: FormGroup;
    emailFormSubmitted: boolean = false;

    isVerifying: boolean = false;
    verificationForm!: FormGroup;
    verificationFormSubmitted: boolean = false;

    isResetting: boolean = false;
    resetForm!: FormGroup;
    resetFormSubmitted: boolean = false;

    errorMessage: string = '';

    resetEmail: string = 'leeweikang1220@gmail.com';
    resetId!: number;
    verificationCode: string = '';

    resendEnable: boolean = true;
    resendCountdown: number = 59;
    resendInterval: any;


    constructor(private formBuilder: FormBuilder, private mailService: MailService, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        })

        this.verificationForm = this.formBuilder.group({
            verificationCode: ['', [Validators.required]],
        })

        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            confirmedPassword: ['', Validators.required]
        }, {
            validator: passwordMatchValidator
        })
    }

    onEmailFormSubmit() {
        this.emailFormSubmitted = true;

        if (!this.emailForm.valid) {
            return;
        }

        const email = this.emailForm.controls['email'].value;

        this.userService.checkEmailExist(email).subscribe(res => {
            if (res.result == 'success') {
                this.errorMessage = '';
                this.resetEmail = email;
                this.resetId = Number(res.data);
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
            this.isVerifying = false;
            this.isResetting = true;

            // reset password
        } else {
            this.errorMessage = 'Invalid code'
        }
    }

    onResetFormSubmit() {
        this.resetFormSubmitted = true;

        if (!this.resetForm.valid) {
            return;
        }

        const password = this.resetForm.controls['password'].value;

        this.userService.resetPassword(this.resetId, password).subscribe(res => {
            if (res.result == 'success') {
                const message = 'Successfully reset password';

                this.router.navigate(['/login'], { queryParams: { message } })
            }
        })
    }

    sendEmail() {
        this.mailService.sendResetPasswordEmail(this.resetEmail).subscribe(res => {
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
        this.errorMessage = ''
        this.isVerifying = false;
    }
}
