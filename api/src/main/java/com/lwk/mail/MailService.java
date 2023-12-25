package com.lwk.mail;

import com.lwk.request_body.MailRequest;
import com.lwk.response_body.MailResponse;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public MailResponse sendEmail(MailRequest mailRequest) {
        try {
            String to = mailRequest.getTo();
            String mailCode = mailRequest.getMailCode();

            if (mailCode.equals("verification")) {
                String verificationCode = getRandomVerificationCode();

                return sendVerificationEmail(to, verificationCode);
            } else if(mailCode.equals("reset_password")){
                String verificationCode = getRandomVerificationCode();

                return sendVerificationEmail(to, verificationCode);
            } else {
                return new MailResponse("error", "Invalid mail code", "");
            }
        } catch (Exception ex) {
            return new MailResponse("error", ex.toString(), "");
        }
    }

    public MailResponse sendVerificationEmail(String to, String verificationCode) throws Exception{
        String subject = "Verification";
        String body = "Your verification code is ";

        body = body + "*" + verificationCode + "*";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);

        javaMailSender.send(message);

        return new MailResponse("success", "Email sent successfully!", verificationCode);
    }

    public MailResponse sendResetPasswordEmail(String to, String verificationCode) throws Exception{
        String subject = "Reset Password";
        String body = "Your reset password token is ";

        body = body + "*" + verificationCode + "*";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);

        javaMailSender.send(message);

        return new MailResponse("success", "Email sent successfully!", verificationCode);
    }

    public String getRandomVerificationCode(){
        int min = 100000;
        int max = 999999;

        Random random = new Random();
        int randomSixDigits = random.nextInt((max - min) + 1) + min;

        return String.valueOf(randomSixDigits);
    }
}
