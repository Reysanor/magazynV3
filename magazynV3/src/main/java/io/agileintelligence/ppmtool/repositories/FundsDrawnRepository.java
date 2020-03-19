package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.FundsDrawn;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface FundsDrawnRepository extends CrudRepository<FundsDrawn, Long> {
}
