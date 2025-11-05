package com.jairo.controller;

import com.jairo.api.ContractApi;
import com.jairo.model.Contract;
import com.jairo.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractController implements ContractApi {
    @Autowired
    private ContractService contractService;

    @Override
    public ResponseEntity<Contract> saveContract(Contract contract) {
        return ResponseEntity.ok(contractService.saveContract(contract));
    }

    @Override
    public ResponseEntity<Float[]> quoteContract(Contract contract) {
        return ResponseEntity.ok(contractService.quoteContract(contract));
    }
}
