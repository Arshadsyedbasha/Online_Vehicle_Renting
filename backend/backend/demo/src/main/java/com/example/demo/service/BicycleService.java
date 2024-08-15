package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Bicycle;
import com.example.demo.repository.BicycleRepo;

@Service
public class BicycleService {
    @Autowired

    private BicycleRepo bicyclerepo;

    public List<Bicycle> getALLBicycles(){
        return bicyclerepo.findAll();
    }
    public Bicycle savebicycle(Bicycle bicycle){
        return bicyclerepo.save(bicycle);
    }
}
