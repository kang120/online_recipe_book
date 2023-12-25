package com.lwk.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

    private String email;
	private String username;
	private String password;

    public User(){}

	public User(Long id, String email, String username, String password) {
		this.id = id;
        this.email = email;
		this.username = username;
		this.password = password;
	}

    public User(String email, String username, String password){
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User(String email, String username){
        this.email = email;
        this.username = username;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}
}
