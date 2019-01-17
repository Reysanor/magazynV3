package personal.demo.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import personal.demo.domain.Project;
import personal.demo.services.MapValidationErrorService;
import personal.demo.services.ProjectService;

import javax.validation.Valid;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){   //dodanie @Valid formatuje informacje z walidacji, natomist BindingResult zwraca błędy

        //odwołuję sie do metody pokazującej błędy w przypadku pustych wymaganych pól
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){return errorMap; }

        Project project1 = projectService.saveOrUpdateRepository(project);
        return new ResponseEntity<Project>(project,HttpStatus.CREATED);

    }

}
