package io.agileintelligence.ppmtool.payload;

import javax.validation.constraints.NotBlank;

//Objekt zawierający username i password
public class LoginRequest {

    @NotBlank(message = "Email nie może być pusty")
    private String username;
    @NotBlank(message = "Hasło nie może być puste")
    private String password;

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
