package io.agileintelligence.ppmtool.web;


import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.payload.JWTLoginSucessResponse;
import io.agileintelligence.ppmtool.payload.LoginRequest;
import io.agileintelligence.ppmtool.security.JwtTokenProvider;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.UserService;
import io.agileintelligence.ppmtool.validator.UserValidator;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static io.agileintelligence.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        //user authentication
        //Looking for a user with this username and password and then return OK to tokenProvider to generate JWT
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        //https://www.it-swarm.net/pl/java/jak-uzyskac-biezacy-obiekt-zalogowanego-uzytkownika-ze-sprezynowego-zabezpieczenia/1054136192/
        //Have a field "Principal" - String if not logged in or Object if logged in
        //SecurityContext - defining minimum security information, for example username and password
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication); // generate final token
        return  ResponseEntity.ok(new JWTLoginSucessResponse(true,jwt)); //if valid user and valid token then we get token

    }

    @PostMapping("/register")
    public ResponseEntity<?> reqisterUser(@Valid @RequestBody User user, BindingResult result){
        //Validate the password
        userValidator.validate(user,result); //jezeli pozytywny = dodaje errory do result

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap !=null)return  errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

}
