package com.jairo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "lifedb")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Life")
public class Life extends InsuredObject {
    private String riskType;
    private String diseaseLevel;

    public Life() {}

    public Life(String riskType, String diseaseLevel) {
        super("Life");
        this.riskType = riskType;
        this.diseaseLevel = diseaseLevel;
    }

    public String getRiskType() {
        return riskType;
    }

    public void setRiskType(String riskType) {
        this.riskType = riskType;
    }

    public String getDiseaseLevel() {
        return diseaseLevel;
    }

    public void setDiseaseLevel(String diseaseLevel) {
        this.diseaseLevel = diseaseLevel;
    }
}
