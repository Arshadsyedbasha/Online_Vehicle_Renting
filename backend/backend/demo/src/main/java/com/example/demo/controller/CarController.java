package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Car;
import com.example.demo.service.CarService;

@CrossOrigin
@RestController
public class CarController {
    @Autowired
    private CarService carservice;

    @GetMapping("/car")
    public List<Car> getALLCar() {
        return carservice.getALLCars();
    }

    @PostMapping("/cars")
    public Car addCar(@RequestBody Car car) {
        return carservice.saveCar(car);
    }

    @GetMapping("/car/email/{email}")
    public List<Car> getCarsByEmail(@PathVariable String email) {
        return carservice.getCarsByEmail(email);
    }
}
