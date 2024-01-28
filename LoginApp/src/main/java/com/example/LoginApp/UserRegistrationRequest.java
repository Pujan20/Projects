package com.example.LoginApp;

public class UserRegistrationRequest {

    private String username;
    private String password;

    // Add constructors, getters, and setters

    public UserRegistrationRequest() {
    }

    public UserRegistrationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and setters...

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
