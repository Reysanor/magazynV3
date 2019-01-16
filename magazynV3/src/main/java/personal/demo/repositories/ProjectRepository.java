package personal.demo.repositories;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import personal.demo.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository <Project,Long> {
    @Override
    Iterable<Project> findAllById(Iterable<Long> iterable);
}
