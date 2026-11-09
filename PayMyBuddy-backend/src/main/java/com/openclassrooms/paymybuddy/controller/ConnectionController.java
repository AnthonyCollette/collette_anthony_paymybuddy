package com.openclassrooms.paymybuddy.controller;

import com.openclassrooms.paymybuddy.dto.ConnectionDTO;
import com.openclassrooms.paymybuddy.service.ConnectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/connection")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping
    ResponseEntity<String> addConnection(@RequestBody ConnectionDTO connectionDTO) {
        if (connectionDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email address is empty.");
        }

        boolean connectionSuccess = connectionService.addConnection(connectionDTO);

        if (!connectionSuccess) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email address does not exist.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("New connection added.");

    }

}
