package io.agileintelligence.ppmtool.validator;

import io.agileintelligence.ppmtool.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class UserValidator implements Validator {
    @Override
    //co ma obslugiwać (obiekty jakiego typu)
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    //przyjmuje obiekty user i errors, jeżeli są błędy dodaje je do errorów (result)
    public void validate(Object object, Errors errors) {
        User user = (User) object;

        if(user.getPassword().length()<6){
            errors.rejectValue("password", "Length", "password is to short - must have at least 6 letters");
        }

        if(!user.getPassword().equals(user.getConfirmPassword())){
            errors.rejectValue("confirmPassword", "Match", "passwords is no equal");
        }


    }
}
