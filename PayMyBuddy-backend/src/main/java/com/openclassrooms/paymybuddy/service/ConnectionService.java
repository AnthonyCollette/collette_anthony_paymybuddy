package com.openclassrooms.paymybuddy.service;

import com.openclassrooms.paymybuddy.dto.ConnectionDTO;
import com.openclassrooms.paymybuddy.model.User;
import com.openclassrooms.paymybuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ConnectionService {

    private final UserRepository userRepository;

    public ConnectionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean addConnection(ConnectionDTO connectionDTO) {
        User targetUser = userRepository.findByEmail(connectionDTO.getEmail());

        if (targetUser == null) {
            return false;
        }

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail);

        if (currentUser == null) {
            return false;
        }

        if (currentUser.equals(targetUser)) {
            return false;
        }

        currentUser.getConnections().add(targetUser);
        userRepository.save(currentUser);

        return true;

    }

}
