package personal.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import personal.demo.domain.Project;
import personal.demo.exceptions.ProjectIdException;
import personal.demo.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateRepository(Project project){
        //dodaje obsluge własnego wyjątku
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifer(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null){
            throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' does not exists");
        }
        return project;
    }
}
