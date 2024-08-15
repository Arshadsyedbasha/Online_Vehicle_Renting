package com.example.demo.repository;

import com.example.demo.model.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalDetailRepository extends JpaRepository<RentalDetail, Long> {
}
