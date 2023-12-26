package com.lwk.response_body;

public class Response {
    private String result;
    private String message;

    public Response(){}

    public Response(String result, String message){
        this.result = result;
        this.message = message;
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
}
