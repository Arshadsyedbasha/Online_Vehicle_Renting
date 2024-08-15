package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Bike;
import com.example.demo.service.BikeService;

@CrossOrigin
@RestController
public class BikeController {

    @Autowired
    private BikeService bikeService;

    @GetMapping("/bike")
    public List<Bike> getALLBikes() {
        return bikeService.getALLBikes();
    }

    @PostMapping("/bikes")
    public Bike addBike(@RequestBody Bike bike) {
        return bikeService.saveBike(bike);
    }

    @GetMapping("/bike/email/{email}")
    public List<Bike> getBikesByEmail(@PathVariable String email) {
        return bikeService.getBikesByEmail(email);
    }
    
}
