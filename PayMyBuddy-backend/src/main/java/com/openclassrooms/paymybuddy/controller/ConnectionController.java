package com.openclassrooms.paymybuddy.controller;

import com.openclassrooms.paymybuddy.dto.ConnectionDTO;
import com.openclassrooms.paymybuddy.service.ConnectionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping
    ResponseEntity<String> addConnection(@Valid @RequestBody ConnectionDTO connectionDTO) {

        connectionService.addConnection(connectionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("New connection added.");

    }

}
