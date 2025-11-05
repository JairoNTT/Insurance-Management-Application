package com.jairo.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jairo.api.CarbrandApi;
import org.springframework.web.bind.annotation.RestController;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
public class CarbrandController implements CarbrandApi {

    private Map<String, String[]> brandModels;

    public CarbrandController() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            brandModels = objectMapper.readValue(new File("src/main/resources/mocks/carBrands.json"), new TypeReference<Map<String, String[]>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            brandModels = null;
        }
    }

    @Override
    public Map<String, String[]> getBrands() {
        return brandModels;
    }
}
