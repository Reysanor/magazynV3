package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //Szyfrowanie hasła
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username Musi być unikalne
            newUser.setUsername(newUser.getUsername());
            //Oba hasła są takie same
            //newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        }catch (Exception e){
            throw  new UsernameAlreadyExistsException("Użytkownik z adresem email " + newUser.getUsername()+ " już istnieje");
        }


    }

}
