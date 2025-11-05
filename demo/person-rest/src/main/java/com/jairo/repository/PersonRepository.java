package com.jairo.repository;

import com.jairo.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {
    boolean existsByIdNumber(String idNumber);
    Optional<Person> findByIdNumber(String idNumber);
}