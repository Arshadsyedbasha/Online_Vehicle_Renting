package com.example.demo.controller;

import com.example.demo.model.RentalDetail;
import com.example.demo.service.RentalDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/rentals")
public class RentalDetailController {

    @Autowired
    private RentalDetailService rentalDetailService;

    @PostMapping("/save")
    public RentalDetail registerRent(@RequestBody RentalDetail rentalDetail) {
        return rentalDetailService.saveRentalDetail(rentalDetail);
    }
    
}
