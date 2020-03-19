package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.FundsDrawn;
import io.agileintelligence.ppmtool.repositories.FundsDrawnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class FundsDrawnService {

    @Autowired
    FundsDrawnRepository fundsDrawnRepository;


    public FundsDrawn saveOrUpdateFundDrawn(FundsDrawn fundsDrawn) {
        return fundsDrawnRepository.save(fundsDrawn);

    }

    public FundsDrawn findById(Long fundDrawnId) {
        Optional<FundsDrawn> fundsDrawn = fundsDrawnRepository.findById(fundDrawnId);
        return fundsDrawn.get();
    }

    public Iterable<FundsDrawn> findAllFundsDrawns() {
        return fundsDrawnRepository.findAll();

    }

    public void deleteFundsDrawnByName(Long fundDrawnId) {
        fundsDrawnRepository.delete(findById(fundDrawnId));
    }
}
