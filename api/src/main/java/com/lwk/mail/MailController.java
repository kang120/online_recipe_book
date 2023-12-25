package com.lwk.mail;

import com.lwk.request_body.MailRequest;
import com.lwk.response_body.MailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail/send_mail")
@CrossOrigin
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping
    public MailResponse sendEmail(@RequestBody MailRequest mailRequest) {
        return mailService.sendEmail(mailRequest);
    }
}
