package io.agileintelligence.ppmtool.security;

import com.google.gson.Gson;
import io.agileintelligence.ppmtool.exceptions.InvalidLoginResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
//This class is used to return a 401 unauthorized error to clients that try to access a protected resource without proper authentication.
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {
        InvalidLoginResponse loginResponse = new InvalidLoginResponse();
        String jsonLoginResponse = new Gson().toJson(loginResponse); // objekt javy na json

        //Przygotowanie odpowiedzi
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setStatus(401);
        //zwraca instancję zawierającą tekst odpowiedzi
        httpServletResponse.getWriter().print(jsonLoginResponse);
    }
}
