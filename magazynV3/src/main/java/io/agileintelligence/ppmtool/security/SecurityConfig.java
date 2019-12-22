package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.services.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static io.agileintelligence.ppmtool.security.SecurityConstants.H2_URL;
import static io.agileintelligence.ppmtool.security.SecurityConstants.SIGN_UP_URLS;
//http://namiekko.pl/2016/08/31/spring-boot-autoryzacja-uzytkownikow-w-oparciu-o-baze-danych/
@Configuration
@EnableWebSecurity
//security level for example only for Admin
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
                                    //Class that implement web security
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint unathorizedHandler;

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){return new JwtAuthenticationFilter();}

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    //Manager Builder - take user details service ,then build the authentication manager (nowy sposób logowania)
    @Override
    protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
                                                        //use this as password encoder
        authenticationManagerBuilder.userDetailsService(customUserDetailService).passwordEncoder(bCryptPasswordEncoder);
    }
    //the authenticationManager is the one that authenticates based on the correct username and password.
    //Send OK to tokenProvider to generate the JWT. That is the token that then accompanies
    //each user's request to a secured end point and grants access.
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER) //make the controller as BEAN because by default it is not a bean
                                          // but super method so spring cannot Autowire it
    //https://stackoverflow.com/questions/21633555/how-to-inject-authenticationmanager-using-java-configuration-in-a-custom-filter
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //disable disable cross-site
        http.cors().and().csrf().disable()
                //obsluga błędów
                .exceptionHandling().authenticationEntryPoint(unathorizedHandler).and()
                //rest API - nie chce zapisywania sesji na serwerze - redux przechowuje stan
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                //enable H2 Database
                .headers().frameOptions().sameOrigin()
                .and()
                .authorizeRequests()
                //Dostep bez logowania
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                //pozwalam na rejestracje bez logowania
                .antMatchers(SIGN_UP_URLS).permitAll()
                .antMatchers(H2_URL).permitAll()
                //wszystko inne wymaga autentykacji - można użyc np .hasRole("ADMIN") dla admina
                .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }
}
