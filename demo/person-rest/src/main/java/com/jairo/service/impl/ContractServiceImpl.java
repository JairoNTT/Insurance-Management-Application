package com.jairo.service.impl;

import com.jairo.model.*;
import com.jairo.repository.ContractRepository;
import com.jairo.repository.InsuredObjectRepository;
import com.jairo.repository.PersonRepository;
import com.jairo.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceImpl implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private InsuredObjectRepository insuredObjectRepository;

    @Override
    public Contract saveContract(Contract contract) {
        if (!"".equalsIgnoreCase(contract.getContractNumber()) &&
            contract.getGrossPremium() >= 0 &&
            !"".equalsIgnoreCase(contract.getPaymentFrequency()) &&
            !"".equalsIgnoreCase(contract.getStartDate()) &&
            !"".equalsIgnoreCase(contract.getEndDate()) &&
            !"".equalsIgnoreCase(contract.getContractState()) &&
            personRepository.existsByIdNumber(contract.getPerson().getIdNumber()) &&
            !contractRepository.existsByContractNumber(contract.getContractNumber())) {
                insuredObjectRepository.save(contract.getInsuredObject());
                return contractRepository.save(contract);
        }
        return new Contract();
    }

    @Override
    public Float[] quoteContract(Contract contract) {
        float price = 100f;
        InsuredObject insuredObject = contract.getInsuredObject();
        if (insuredObject instanceof Car obj) {
            String plate = obj.getRegistrationNumber();
            char c = plate.charAt(plate.length() - 3);
            if (c >= 'A' && c <= 'Z') {
                if (c <= 'G') price += 50;
            }
            else price += 100;
            if (obj.getBrand().equals("bmw") || obj.getBrand().equals("mercedes")) price += 100;
            if (obj.getColor().equals("red")) price += 100;
            else if (obj.getColor().equals("blue")) price += 50;
            if (obj.getPower() > 350) price += 250;
            if (obj.getPower() > 250) price += 100;
            if (obj.getPower() > 150) price += 100;
            if (obj.getPower() > 50) price += 100;
        }
        else if (insuredObject instanceof House obj) {
            if (obj.getBuildingType().equals("house")) price += 100;
            else if (obj.getBuildingType().equals("villa")) price += 200;
            if (obj.getInsideArea() > 100) price += 50;
            if (obj.getInsideArea() > 200) price += 100;
            if (obj.getInsideArea() > 300) price += 150;
            if (obj.getOutsideArea() > 50) price += 50;
            if (obj.getOutsideArea() > 100) price += 150;
            if (obj.getContentValue() > 5000) price += 100;
            if (obj.getContentValue() > 20000) price += 200;
            if (obj.getContentValue() > 50000) price += 200;
        }
        else if (insuredObject instanceof Life obj) {
            if (obj.getRiskType().equals("medium")) price += 50;
            else if (obj.getRiskType().equals("high")) price += 100;
            if (obj.getDiseaseLevel().equals("medium")) price += 50;
            else if (obj.getDiseaseLevel().equals("high")) price += 150;
        }
        float ran = (float) Math.random() * 0.4f + 0.3f;
        return new Float[]{price, price * (ran + 1f), price * (ran + 2f)};
    }
}
