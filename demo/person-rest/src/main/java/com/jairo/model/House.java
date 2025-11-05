package com.jairo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "housedb")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("House")
public class House extends InsuredObject {
    private String buildingType;
    private Float insideArea;
    private Float outsideArea;
    private Float contentValue;
    private String city;

    public House() {}

    public House(String buildingType, Float insideArea, Float outsideArea, Float contentValue, String city) {
        super("House");
        this.buildingType = buildingType;
        this.insideArea = insideArea;
        this.outsideArea = outsideArea;
        this.contentValue = contentValue;
        this.city = city;
    }

    public String getBuildingType() {
        return buildingType;
    }

    public void setBuildingType(String buildingType) {
        this.buildingType = buildingType;
    }

    public Float getInsideArea() {
        return insideArea;
    }

    public void setInsideArea(Float insideArea) {
        this.insideArea = insideArea;
    }

    public Float getOutsideArea() {
        return outsideArea;
    }

    public void setOutsideArea(Float outsideArea) {
        this.outsideArea = outsideArea;
    }

    public Float getContentValue() {
        return contentValue;
    }

    public void setContentValue(Float contentValue) {
        this.contentValue = contentValue;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
