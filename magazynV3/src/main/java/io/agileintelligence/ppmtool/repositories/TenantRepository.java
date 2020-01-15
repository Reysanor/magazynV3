package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Tenant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends CrudRepository<Tenant, Long> {
    Tenant findByNip(Integer nip);


}
