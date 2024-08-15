package com.example.demo.service;

import com.example.demo.model.RentalDetail;
import com.example.demo.repository.RentalDetailRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentalDetailService {

    @Autowired
    private RentalDetailRepository rentalDetailRepository;

    public RentalDetail saveRentalDetail(RentalDetail rentalDetail) {
        return rentalDetailRepository.save(rentalDetail);
    }

    public List<RentalDetail> getAllRents() {
        return rentalDetailRepository.findAll();
    }
    
}
