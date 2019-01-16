package personal.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import personal.demo.domain.Project;
import personal.demo.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateRepository(Project project){

        //logic

        return projectRepository.save(project);
    }
}
