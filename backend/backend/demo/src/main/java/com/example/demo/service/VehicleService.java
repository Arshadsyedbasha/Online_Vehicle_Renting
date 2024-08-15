package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Vehicle;
import com.example.demo.repository.VehicleRepository;

import jakarta.transaction.Transactional;

@Service
public class VehicleService {
    @Autowired

    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Transactional
    public void deleteVehicleById(Long id) throws Exception {
        if (!vehicleRepository.existsById(id)) {
            throw new Exception("Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }

}