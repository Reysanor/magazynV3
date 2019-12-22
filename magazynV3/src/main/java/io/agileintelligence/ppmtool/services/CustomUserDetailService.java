package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//class to get user data
@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(user==null) new UsernameNotFoundException("User is not exists");
        return user;
    }
    //for Token - check if user exists but not do anything else
    @Transactional
    public User loadUserById(Long id){
        User user = userRepository.getById(id);
        if(user==null) new UsernameNotFoundException("User is not exists");
        return user;
    }
}
