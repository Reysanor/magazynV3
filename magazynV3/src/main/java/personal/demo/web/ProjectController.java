package personal.demo.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import personal.demo.domain.Project;
import personal.demo.services.ProjectService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("") //dodanie @Valid formatuje informacje z walidacji, natomist BindingResult sprawdza czy był błędy
                     // i zmienia tresc
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){

        if (result.hasErrors()){
            return new ResponseEntity<String>("invalid object Object", HttpStatus.BAD_REQUEST);
        }
        Project project1 = projectService.saveOrUpdateRepository(project);
        return new ResponseEntity<Project>(project,HttpStatus.CREATED);

    }

}
