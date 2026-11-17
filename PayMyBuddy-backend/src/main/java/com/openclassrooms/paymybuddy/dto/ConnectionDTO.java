package com.openclassrooms.paymybuddy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConnectionDTO {

    @NotBlank(message = "Email address is empty.")
    @Email(message = "Invalid email address.")
    private String email;

}
