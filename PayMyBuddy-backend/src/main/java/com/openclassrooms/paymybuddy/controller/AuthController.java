package com.openclassrooms.paymybuddy.controller;

import com.openclassrooms.paymybuddy.config.SecurityConfig;
import com.openclassrooms.paymybuddy.dto.LoginDTO;
import com.openclassrooms.paymybuddy.dto.RegisterDTO;
import com.openclassrooms.paymybuddy.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/auth")
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterDTO registerDTO) {

        authService.register(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PostMapping("/login")
    ResponseEntity<String> login(@Valid @RequestBody LoginDTO loginDTO) {
        String token = authService.login(loginDTO);

        ResponseCookie cookie = ResponseCookie.from(SecurityConfig.COOKIE_NAME, token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login successful.");
    }

    @PostMapping("/logout")
    ResponseEntity<String> logout() {
        ResponseCookie cookie = ResponseCookie.from(SecurityConfig.COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out.");
    }

}
