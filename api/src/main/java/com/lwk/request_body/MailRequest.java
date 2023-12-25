package com.lwk.request_body;

public class MailRequest {
    private String to;
    private String mailCode;

    public void setTo(String to){
        this.to = to;
    }

    public String getTo(){
        return to;
    }

    public void setMailCode(String mailCode){
        this.mailCode = mailCode;
    }

    public String getMailCode(){
        return mailCode;
    }
}
