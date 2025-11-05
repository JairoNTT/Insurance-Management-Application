package com.jairo.service.impl;

import com.jairo.model.Person;
import com.jairo.repository.PersonRepository;
import com.jairo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public Person savePerson(Person person) {
        if (!"".equalsIgnoreCase(person.getIdNumber()) && !"".equalsIgnoreCase(person.getName()) && !"".equalsIgnoreCase(person.getSurname()) && person.getAge() > 0 && !personRepository.existsByIdNumber(person.getIdNumber())) {
            return personRepository.save(person);
        }
        return new Person();
    }

    @Override
    public List<Person> fetchPersonList() {
        return (List<Person>) personRepository.findAll();
    }

    @Override
    public Person findPersonByIdNumber(String idNumber) {
        if (!"".equalsIgnoreCase(idNumber) && personRepository.existsByIdNumber(idNumber)) return personRepository.findByIdNumber(idNumber).get();
        return new Person();
    }

    @Override
    public ResponseEntity<Object> updatePerson(Person person) {
        String idNumber = person.getIdNumber();
        if (!"".equalsIgnoreCase(idNumber) && personRepository.existsByIdNumber(idNumber)) {
            Person persDB = personRepository.findByIdNumber(idNumber).get();
            if (!"".equalsIgnoreCase(person.getName())) persDB.setName(person.getName());
            if (!"".equalsIgnoreCase(person.getSurname())) persDB.setSurname(person.getSurname());
            if (person.getAge() > 0) persDB.setAge(person.getAge());
            personRepository.save(persDB);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Object> deletePerson(String idNumber) {
        if (personRepository.existsByIdNumber(idNumber)) {
            Integer personId = personRepository.findByIdNumber(idNumber).get().getId();
            personRepository.deleteById(personId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
