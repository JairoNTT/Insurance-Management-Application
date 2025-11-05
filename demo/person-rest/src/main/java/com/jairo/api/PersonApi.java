package com.jairo.api;

import com.jairo.model.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin({"http://localhost:4200"})
public interface PersonApi {
    @PostMapping("api/person")
    ResponseEntity<Person> savePerson(@RequestBody Person person);

    @GetMapping("api/person")
    ResponseEntity<List<Person>> fetchPersonList();

    @GetMapping("api/person/{idNumber}")
    ResponseEntity<Person> findPersonByIdNumber(@PathVariable("idNumber") String idNumber);

    @PutMapping("api/person")
    ResponseEntity<Object> updatePerson(@RequestBody Person person);

    @DeleteMapping("api/person/{idNumber}")
    ResponseEntity<Object> deletePerson(@PathVariable("idNumber") String idNumber);
}
