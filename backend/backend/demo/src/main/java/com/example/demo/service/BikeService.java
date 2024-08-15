package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Bike;
import com.example.demo.repository.BikeRepo;

@Service
public class BikeService {

    @Autowired
    private BikeRepo bikeRepo;

    public List<Bike> getALLBikes() {
        return bikeRepo.findAll();
    }

    public Bike saveBike(Bike bike) {
        return bikeRepo.save(bike);
    }

    public List<Bike> getBikesByEmail(String email) {
        return bikeRepo.findByEmail(email);
    }
}
