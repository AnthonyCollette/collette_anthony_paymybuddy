package com.openclassrooms.paymybuddy.service;

import com.openclassrooms.paymybuddy.dto.ConnectionDTO;
import com.openclassrooms.paymybuddy.model.User;
import com.openclassrooms.paymybuddy.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ConnectionService {

    private final UserRepository userRepository;

    public ConnectionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void addConnection(ConnectionDTO connectionDTO) {
        User targetUser = userRepository.findByEmail(connectionDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("No user with this email address was found."));

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new IllegalArgumentException("Current user not found."));

        if (currentUser.equals(targetUser)) {
            throw new IllegalArgumentException("You can not add yourself.");
        }

        if (!currentUser.getConnections().add(targetUser)) {
            throw new IllegalArgumentException("You are already in connection.");
        }

        userRepository.save(currentUser);

    }

}
