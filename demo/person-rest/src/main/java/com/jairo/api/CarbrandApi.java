package com.jairo.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@CrossOrigin({"http://localhost:4200"})
public interface CarbrandApi {
    @GetMapping("api/carbrand")
    Map<String, String[]> getBrands();
}
