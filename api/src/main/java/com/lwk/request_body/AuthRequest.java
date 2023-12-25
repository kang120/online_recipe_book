package com.lwk.request_body;

public class AuthRequest {
    private String identity;
    private String password;

    public void setIdentity(String identity){
        this.identity = identity;
    }

    public String getIdentity(){
        return identity;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return password;
    }
}
