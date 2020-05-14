package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.FundsDrawn;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.exceptions.FundsDrawnIdException;
import io.agileintelligence.ppmtool.exceptions.FundsDrawnNotFoundException;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.FundsDrawnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service

public class FundsDrawnService {

    @Autowired
    FundsDrawnRepository fundsDrawnRepository;

    @Autowired
    AutomatRepository automatRepository;

    @Autowired
    AutomatService automatService;

    public FundsDrawn saveOrUpdateFundDrawn(FundsDrawn fundsDrawn, String automat_id) {
        Long fundsDrawnIdGet = fundsDrawn.getId();
        if (fundsDrawn.getId() != null) {
            Optional<FundsDrawn> existingFundsDrawn = fundsDrawnRepository.findById(fundsDrawnIdGet);
            if (!existingFundsDrawn.isPresent()) {
                throw new FundsDrawnNotFoundException("Funds drawn with Id: " + fundsDrawnIdGet + " doesn't exists");
            }
        }
        Automat automat = automatRepository.findBySerialNumber(automat_id);
        if (automat == null) {
            throw new AutomatNotFoundException("Automat with Serial Number: " + automat_id + " doesn't exists");
        }
        try {
            fundsDrawn.setId(fundsDrawnIdGet);
            fundsDrawn.setAutomat(automatRepository.findBySerialNumber(automat_id));
            Date date = new Date();
            fundsDrawn.setDateOfDrawn(date);
            return fundsDrawnRepository.save(fundsDrawn);
        } catch (Exception e) {
            throw new FundsDrawnIdException("Funds drawn with Id: " + fundsDrawnIdGet + " already exists");

        }

    }

    public FundsDrawn findById(Long fundDrawnId) {
        Optional<FundsDrawn> fundsDrawn = fundsDrawnRepository.findById(fundDrawnId);
        if (!fundsDrawn.isPresent()) {
            throw new FundsDrawnNotFoundException("Funds drawn with Id: " + fundDrawnId + " doesn't exists");
        }
        return fundsDrawn.get();
    }

    public Iterable<FundsDrawn> findAllFundsDrawns() {
        return fundsDrawnRepository.findAll();

    }


    public Iterable<FundsDrawn> findAllFundsDrawnsByAutomat(String automat_id) {
        Automat automat = automatService.findBySerialNumber(automat_id);
        return fundsDrawnRepository.findAllByAutomat(automat);
    }



    public void deleteFundsDrawnByName(Long fundDrawnId) {
        fundsDrawnRepository.delete(findById(fundDrawnId));
    }
}
