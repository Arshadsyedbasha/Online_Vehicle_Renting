package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Bike;

public interface BikeRepo extends JpaRepository<Bike,Long>{

    List<Bike> findByEmail(String email);
}