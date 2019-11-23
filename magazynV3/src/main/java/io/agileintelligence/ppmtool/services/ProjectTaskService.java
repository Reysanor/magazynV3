package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        //Expections: Project not found

        //ProjectTasks to be added to a specific project, null != project, Backlog exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        //set the backlog to project task
        projectTask.setBacklog(backlog);
        //sekwencja projetu ma byc jak: IDPRO-1, IDPRO-2
        Integer BacklogSequence = backlog.getPTSequence();
        //Update the backlog SEQUENCE
        BacklogSequence++;
        //Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
        projectTask.setProjectIdentifer(projectIdentifier);
        //INITIAL priority - ważność
//        if(projectTask.getPriority()==0|| projectTask.getPriority()==null){
//            projectTask.setPriority(3);
//        }
        //INITAL status when status is null
        if(projectTask.getStatus()==""||projectTask.getStatus()==null){
            projectTask.setStatus("TO_DO");
        }
        //The save() method returns the saved entity, including the updated id field.
        return projectTaskRepository.save(projectTask);
    }
}
