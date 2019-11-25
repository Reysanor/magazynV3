package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //Expections: Project not found
        try {
            //ProjectTasks to be added to a specific project, null != project, Backlog exists
            //Jezeli projekt nie istnieje - exception
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            //set the backlog to project task
            projectTask.setBacklog(backlog);
            //sekwencja projetu ma byc jak: IDPRO-1, IDPRO-2
            Integer BacklogSequence = backlog.getPTSequence();
            //Update the backlog SEQUENCE and set it do new value
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);
            //Add Sequence to Project Task
            projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);
            //INITIAL priority - ważność
//        if(projectTask.getPriority()==0|| projectTask.getPriority()==null){
//            projectTask.setPriority(3);
//        }
            //INITAL status when status is null
            if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }
            if (projectTask.getStatus() == null) { // formularz w react ma obsłużyć projectTask.getPriority()==0
                projectTask.setPriority(3);
            }

            //The save() method returns the saved entity, including the updated id field.
            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");

        }
    }

    //For each, zwraca listę powiązanych obiektów
    public Iterable<ProjectTask> findBacklogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);
        //projekt nie istnieje
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: '" + id + "'  does not exists");
        }
        //zwracam posortowane
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    //backlog_id = project_id
    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id) {

        //upewnic się co do istnienia wyszukiwanego backloga - szukam po ID projektu - backlog nie istnieje bez projektu
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + backlog_id + "'  does not exists");
        }
        //upewnić się że task istnieje - jeżeli projekt istnieje
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + pt_id + "' not found");
        }
        //upewnić się że scieżka backlog/project_id/pt_id odnosi sie do własciwego projektu
        //sprawdzam czy id projektu w obiekcie projectTask jest takie same jak w podane id projektu
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task '" + pt_id + "' does not exist in project: '" + backlog_id);
        }

        return projectTask;
    }

    //szukaj po nazwie projektu - parametry to nowy project task i id projektu
    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id) {
        //znajdz w bazie
        // ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        //Wykorzystuje istniejące walidatory i otrzymuje obiekt
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id);
        //zamień istniejący na zmieniony (od BacklogControllera dostaje nowe dane)
        projectTask = updatedTask;
        //zapis do bazy
        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id);

        projectTaskRepository.delete(projectTask);
    }
}
