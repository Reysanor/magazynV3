package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.AutomatToTenantHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AutomatToTenantHistoryRepository extends CrudRepository<AutomatToTenantHistory, Long> {

    AutomatToTenantHistory findFirstByAutomatOrderByIdDesc(Automat automat);

}
