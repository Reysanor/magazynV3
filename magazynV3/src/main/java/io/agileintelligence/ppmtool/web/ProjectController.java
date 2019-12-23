package io.agileintelligence.ppmtool.web;


import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    //testowanie - postman - localhost:8080/api/project {"projectName" : "Tsettet, "projectIdentifier: "12345",//"description" : "test opis"}
    @PostMapping("")
    //response entity - opakowanie obiektu i headery HTTP,Valid - daje 400 request i zwraca komunikaty walidacji czytelnie
    //BindingResult - zwraca listę błędów, wywołuje walidator
    //RequestBody - przekształć odpowiedź (JSONa) w obiekt Project
    //Valid - Wyświetla listę wszystkich dostępnych błędów
    //Principal - owner of project
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        // błąd dla danej zmiennej, mozna przypisac do List i wtedy result.getFieldErrors()
        //if(result.hasErrors(){ return new ResponseEntity<String>(body: "tresc błedu", HttpStatus.BAD_REQUEST);}

        //mapa z błędami walidacji w formie jsona
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        //zwracam listę błędów i potem je wyświetlam
        if(errorMap!=null) return errorMap;
        //zapis do bazy danych
        Project project1 = projectService.saveOrUpdateProject(project,principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    //{} - path variable, mapping i nazwa string musza byc takie same
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId){

        Project project = projectService.findProjectByIdentifier(projectId);

        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }


    @GetMapping("/all")
    public Iterable<Project> getAllProjects(){
        return projectService.findAllProjects();
    }


    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId){
        projectService.deleteProjectByIdentifier(projectId);

        return new ResponseEntity<String>("Project with ID: '"+projectId+"' was deleted", HttpStatus.OK);
    }
}
