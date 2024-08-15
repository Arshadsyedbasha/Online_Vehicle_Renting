package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepo;

@Service
public class CarService {
    @Autowired
    private CarRepo carrepo;

    public List<Car> getALLCars() {
        return carrepo.findAll();
    }

    public Car saveCar(Car car) {
        return carrepo.save(car);
    }

    public List<Car> getCarsByEmail(String email) {
        return carrepo.findByEmail(email);
    }
}
