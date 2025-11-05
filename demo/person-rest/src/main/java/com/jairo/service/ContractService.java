package com.jairo.service;

import com.jairo.model.Contract;

public interface ContractService {
    Contract saveContract(Contract contract);
    Float[] quoteContract(Contract contract);
}