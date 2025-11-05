package com.jairo.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({@JsonSubTypes.Type(value = Car.class, name = "Car"), @JsonSubTypes.Type(value = Life.class, name = "Life"), @JsonSubTypes.Type(value = House.class, name = "House")})
@Entity
@Table(name = "insuredobjectdb")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public abstract class InsuredObject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(insertable = false, updatable = false)
    private String type;

    protected InsuredObject() {}

    protected InsuredObject(String type) {
        this.type = type;
    }

    /*public InsuredObject getCopy() {
        if (this instanceof Car obj) return new Car(obj.getRegistrationNumber(), obj.getBrand(), obj.getModel(), obj.getColor(), obj.getPower());
        else if (this instanceof House obj) return new House(obj.getBuildingType(), obj.getInsideArea(), obj.getOutsideArea(), obj.getContentValue(), obj.getCity());
        else if (this instanceof Life obj) return new Life(obj.getRiskType(), obj.getDiseaseLevel());
        else return this;
    }*/

    public Integer getId() {
        return id;
    }

    public String getType() {
        return type;
    }
}
