package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        String projectIdentifierGet = project.getProjectIdentifier().toUpperCase();
        //project.getID != null
        //find by db id -> null
        if (project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if (existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException(" Project is not your ");
            } else if (existingProject == null) {
                throw new ProjectNotFoundException("Project with ID: " + project.getProjectIdentifier() + " doesn't exists");
            }
        }
        try {
            //set owner
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(projectIdentifierGet);

            //Logi
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifierGet);
            }

            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifierGet));
            }
            //zapis do bazy
            return projectRepository.save(project);
        } catch (Exception e) {

            throw new ProjectIdException("Project ID '" + projectIdentifierGet + "' already exists");
        }
    }

    //
    public Project findProjectByIdentifier(String projectId, String username) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }

        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectid, String username) {

        projectRepository.delete(findProjectByIdentifier(projectid, username));

    }

}
