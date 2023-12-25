package com.lwk.response_body;

public class MailResponse {
    private String result;
    private String message;
    private String data;

    public MailResponse(String result, String message, String data){
        this.result = result;
        this.message = message;
        this.data = data;
    }

    public void setResult(String result){
        this.result = result;
    }

    public String getResult(){
        return result;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getMessage(){
        return message;
    }

    public void setData(String data){
        this.data = data;
    }

    public String getData(){
        return data;
    }
}
