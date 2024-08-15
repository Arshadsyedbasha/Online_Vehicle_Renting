package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Bicycle;
import com.example.demo.service.BicycleService;
@CrossOrigin
@RestController
public class BicycleController {
    @Autowired
    private BicycleService bicycleservice;

    @GetMapping("/bicycle")
    public List<Bicycle> getALLBicycles(){
        return bicycleservice.getALLBicycles();
    }

    @PostMapping("/bicycles")
    public Bicycle addBicycle(@RequestBody Bicycle bicycle) {
        return bicycleservice.savebicycle(bicycle);
    }
}
