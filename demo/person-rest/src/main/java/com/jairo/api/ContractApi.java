package com.jairo.api;

import com.jairo.model.Contract;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200"})
public interface ContractApi {
    @PostMapping("api/contract/save")
    ResponseEntity<Contract> saveContract(@RequestBody Contract contract);

    @PostMapping("api/contract/quote")
    ResponseEntity<Float[]> quoteContract(@RequestBody Contract contract);
}