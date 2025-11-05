package com.jairo.repository;

import com.jairo.model.Contract;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Integer> {
    boolean existsByContractNumber(String contractNumber);
}