package com.openclassrooms.paymybuddy.service;

import com.openclassrooms.paymybuddy.dto.LoginDTO;
import com.openclassrooms.paymybuddy.dto.RegisterDTO;
import com.openclassrooms.paymybuddy.model.User;
import com.openclassrooms.paymybuddy.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());

        if (user == null) {
            return false;
        }

        return passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
    }

    public boolean register(RegisterDTO registerDTO) {
        User existingUser = userRepository.findByEmail(registerDTO.getEmail());

        if (existingUser != null) {
            return false;
        }

        User newUser = new User();
        newUser.setEmail(registerDTO.getEmail());
        newUser.setUsername(registerDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        userRepository.save(newUser);

        return true;

    }

}
