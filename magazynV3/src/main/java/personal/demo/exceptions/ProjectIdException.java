package personal.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//wiadomosc
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectIdException extends  RuntimeException {

    public ProjectIdException(String message) {
        super(message);
    }
}
