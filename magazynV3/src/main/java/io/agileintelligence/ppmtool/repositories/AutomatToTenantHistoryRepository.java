package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.AutomatToTenantHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutomatToTenantHistoryRepository extends CrudRepository<AutomatToTenantHistory, Long> {


}
