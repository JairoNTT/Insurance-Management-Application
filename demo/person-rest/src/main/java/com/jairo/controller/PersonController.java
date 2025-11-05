package com.jairo.controller;

import com.jairo.api.PersonApi;
import com.jairo.model.Person;
import com.jairo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class PersonController implements PersonApi {
    @Autowired
    private PersonService personService;

    @Override
    public ResponseEntity<Person> savePerson(Person person) {
        return ResponseEntity.ok(personService.savePerson(person));
    }

    @Override
    public ResponseEntity<List<Person>> fetchPersonList() {
        return ResponseEntity.ok(personService.fetchPersonList());
    }

    @Override
    public ResponseEntity<Person> findPersonByIdNumber(String idNumber) {
        return ResponseEntity.ok(personService.findPersonByIdNumber(idNumber));
    }

    @Override
    public ResponseEntity<Object> updatePerson(Person person) {
        return personService.updatePerson(person);
    }

    @Override
    public ResponseEntity<Object> deletePerson(String idNumber) {
        return personService.deletePerson(idNumber);
    }
}
