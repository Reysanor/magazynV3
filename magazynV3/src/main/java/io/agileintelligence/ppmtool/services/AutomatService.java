package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.AutomatIdException;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutomatService {

    @Autowired
    private AutomatRepository automatRepository;
    @Autowired
    UserRepository userRepository;

    public Automat saveOrUpdateAutomat(Automat automat, String username) {
        String automatSerialNumberGet = automat.getSerialNumber().toUpperCase();

        if (automat.getId() != null) {
            Automat existingAutomat = automatRepository.findBySerialNumber(automat.getSerialNumber());
            if (existingAutomat != null && (!existingAutomat.getAutomatLeader().equals(username))) {
                throw new AutomatNotFoundException(" Automat is not your ");
            } else
                if (existingAutomat == null) {
                throw new AutomatNotFoundException("Automat with Serial Number: " + automat.getSerialNumber() + " doesn't exists");
            }
        }
        try {
            User user = userRepository.findByUsername(username);
            automat.setAutomatLeader(user.getUsername());
            automat.setSerialNumber(automatSerialNumberGet);

            //set owner
            //Logi
            //zapis do bazy
            return automatRepository.save(automat);
        } catch (Exception e) {
            throw new AutomatIdException("Automat with Serial Number  '" + automatSerialNumberGet + "' already exists");
        }
    }


    public Automat findBySerialNumber(String serialNumber, String username) {

        Automat automat = automatRepository.findBySerialNumber(serialNumber);

        if (automat == null) {
            throw new AutomatNotFoundException("Automat with serial number " + serialNumber + " does not exist");
        }
//        if (!automat.getAutomatLeader().equals(username)) {
//            throw new AutomatNotFoundException("Automat is not your");
//        }

        return automat;
    }

    public Iterable<Automat> findAllAutomats(String username) {

        return automatRepository.findAll();
    }

    public void deleteAutomatBySerialNumber(String serialNumber, String username) {
        automatRepository.delete(findBySerialNumber(serialNumber, username));
    }
}