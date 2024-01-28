package com.example.LoginApp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserCredRepo userRepo;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserCredRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(String username, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        userCredentials user = new userCredentials(username, hashedPassword);
        userRepo.save(user);
    }

    public boolean authenticateUser(String username, String enteredPassword) {
        userCredentials user = userRepo.findByUsername(username);

        if (user != null) {
            logPasswordComparison(enteredPassword, user.getPassword());
            return passwordEncoder.matches(enteredPassword, user.getPassword());
        } else {
            return false;
        }
    }

    private void logPasswordComparison(String enteredPassword, String storedPassword) {
        logger.debug("Entered Password: {}", enteredPassword);
        logger.debug("Stored Password: {}", storedPassword);
    }

    public void saveDashboardData(DashboardData dashboardData) throws Exception {
        try {
            userRepo.saveDashboardData(dashboardData);
        } catch (Exception e) {
            logger.error("Error saving dashboard data", e);
            throw new Exception("Error saving dashboard data", e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<userCredentials> userOptional = Optional.of(userRepo.findByUsername(username));

        userCredentials user = userOptional.orElseThrow(() ->
                new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
