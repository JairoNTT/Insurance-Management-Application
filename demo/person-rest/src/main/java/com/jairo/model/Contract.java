package com.jairo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contractdb")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String contractNumber;
    private Integer grossPremium;
    private String paymentFrequency;
    private String startDate;
    private String endDate;
    private String contractState;
    @OneToOne
    @JoinColumn(name = "insured_object_id", referencedColumnName = "id")
    private InsuredObject insuredObject;
    @OneToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    public Contract() {}

    public Contract(String contractNumber, Integer grossPremium, String paymentFrequency, String startDate, String endDate, InsuredObject insuredObject, String contractState, Person person) {
        this.contractNumber = contractNumber;
        this.grossPremium = grossPremium;
        this.paymentFrequency = paymentFrequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.contractState = contractState;
        this.insuredObject = insuredObject;
        this.person = person;
    }

    public Integer getId() {
        return id;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public Integer getGrossPremium() {
        return grossPremium;
    }

    public String getPaymentFrequency() {
        return paymentFrequency;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public InsuredObject getInsuredObject() {
        return insuredObject;
    }

    public String getContractState() {
        return contractState;
    }

    public Person getPerson() {
        return person;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public void setGrossPremium(Integer grossPremium) {
        this.grossPremium = grossPremium;
    }

    public void setPaymentFrequency(String paymentFrequency) {
        this.paymentFrequency = paymentFrequency;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setInsuredObject(InsuredObject insuredObject) {
        this.insuredObject = insuredObject;
    }

    public void setContractState(String contractState) {
        this.contractState = contractState;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}