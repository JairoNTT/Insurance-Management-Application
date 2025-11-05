package com.jairo.repository;

import com.jairo.model.InsuredObject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuredObjectRepository extends CrudRepository<InsuredObject, Integer> { }