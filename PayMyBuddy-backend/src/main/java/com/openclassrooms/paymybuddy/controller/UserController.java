package com.openclassrooms.paymybuddy.controller;

import com.openclassrooms.paymybuddy.dto.UserDTO;
import com.openclassrooms.paymybuddy.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping
    public ResponseEntity<Void> updateUser(@Valid @RequestBody UserDTO userDTO, Principal principal) {

        userService.updateUser(principal.getName(), userDTO);
        return ResponseEntity.noContent().build();

    }

}
