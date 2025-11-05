package com.jairo.service;

import com.jairo.model.Person;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface PersonService {
    Person savePerson(Person person);
    List<Person> fetchPersonList();
    Person findPersonByIdNumber(String idNumber);
    ResponseEntity<Object> updatePerson(Person person);
    ResponseEntity<Object> deletePerson(String idNumber);
}