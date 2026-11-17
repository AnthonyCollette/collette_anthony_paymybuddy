package com.openclassrooms.paymybuddy.service;

import com.openclassrooms.paymybuddy.dto.UserDTO;
import com.openclassrooms.paymybuddy.model.User;
import com.openclassrooms.paymybuddy.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("No user with this email address was found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }

    public void updateUser(String email, UserDTO userDTO) {
        User currentUser = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("No user with this email address was found"));

        currentUser.setUsername(userDTO.getUsername());

        if (!currentUser.getEmail().equals(userDTO.getEmail()) && userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already used");
        }

        currentUser.setEmail(userDTO.getEmail());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            currentUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        userRepository.save(currentUser);
    }

}
