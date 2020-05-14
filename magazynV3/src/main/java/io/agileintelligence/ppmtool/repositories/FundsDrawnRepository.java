package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.FundsDrawn;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FundsDrawnRepository extends CrudRepository<FundsDrawn, Long> {

    Iterable<FundsDrawn> findAllByAutomat(Automat automat);

    FundsDrawn findAllByAmountLessThan(Double d);
}
