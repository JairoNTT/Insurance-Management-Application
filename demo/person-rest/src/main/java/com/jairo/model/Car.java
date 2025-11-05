package com.jairo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "cardb")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Car")
public class Car extends InsuredObject {
    private String registrationNumber;
    private String brand;
    private String model;
    private String color;
    private Float power;

    public Car() {}

    public Car(String registrationNumber, String brand, String model, String color, Float power) {
        super("Car");
        this.registrationNumber = registrationNumber;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.power = power;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Float getPower() {
        return power;
    }

    public void setPower(Float power) {
        this.power = power;
    }
}
