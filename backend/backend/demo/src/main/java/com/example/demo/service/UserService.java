package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> findUser(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }
    public Optional<User> findUserByEmail(String email) {
        return userRepo.findByEmail(email); // Assuming userRepository has a findByEmail method
    }
}