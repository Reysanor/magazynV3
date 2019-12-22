package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.services.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static io.agileintelligence.ppmtool.security.SecurityConstants.HEADER_STRING;
import static io.agileintelligence.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailService customUserDetailService;
    //filter is class called before serwlet used for reject the requests
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            //get token from request
            String jwt = getJWTFromRequest(httpServletRequest);
            //if not null and
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userId = tokenProvider.getUserIdFromJWT(jwt);
                User userDetails = customUserDetailService.loadUserById(userId);

                //set up authentication

                //class for simple presentation of a username and password.
                //Search for a user with this userDetails and then return OK to tokenProvider to generate JWT
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        //pass userDetails, dont pass a credentails, pass empty list of Roles
                        userDetails, null, Collections.emptyList()
                );
                //build detail object from httpServletRequest
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                //SecurityContext - defining minimum security information, for example username and password
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        } catch (Exception ex) {
            logger.error("Could not set security context with user authentication",ex);

        }
        //przyjmuje tylko zgodne z filtrem
        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        //header with Authorization (Token bearer) - name of header same as HEADER_STRING
        String bearerToken = request.getHeader(HEADER_STRING);
        //handle null
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
