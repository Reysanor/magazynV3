package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.Tenant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutomatRepository extends CrudRepository<Automat, Long> {

    Automat findBySerialNumber(String serialNumber);

    Iterable<Automat> findAllByTenant(Tenant tenant);
}
