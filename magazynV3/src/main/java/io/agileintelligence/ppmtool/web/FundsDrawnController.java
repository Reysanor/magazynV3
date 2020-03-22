package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.FundsDrawn;
import io.agileintelligence.ppmtool.services.FundsDrawnService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/fund")
@CrossOrigin
public class FundsDrawnController {

    @Autowired
    private FundsDrawnService fundsDrawnService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{automat_id}")
    public ResponseEntity<?> createNewFundDrawn(@Valid @RequestBody FundsDrawn fundsDrawn, BindingResult result,@PathVariable String automat_id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        FundsDrawn fundsDrawn1 = fundsDrawnService.saveOrUpdateFundDrawn(fundsDrawn,automat_id);
        return new ResponseEntity<FundsDrawn>(fundsDrawn1, HttpStatus.CREATED);
    }

    @GetMapping("/{fundDrawnId}")
    public ResponseEntity<?> getFundDrawnById(@PathVariable Long fundDrawnId, Principal principal) {
        FundsDrawn fundsDrawn = fundsDrawnService.findById(fundDrawnId);
        return new ResponseEntity<FundsDrawn>(fundsDrawn, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<FundsDrawn> getAllFundDrawns(Principal principal) {
        return fundsDrawnService.findAllFundsDrawns();
    }

    @DeleteMapping("/{fundDrawnId}")
    public ResponseEntity<?> deleteFundDrawn(@PathVariable Long fundDrawnId, Principal principal) {
        fundsDrawnService.deleteFundsDrawnByName(fundDrawnId);
        return new ResponseEntity<String>("Funds Drawn with id " + fundDrawnId + " was deleted", HttpStatus.OK);
    }
}
