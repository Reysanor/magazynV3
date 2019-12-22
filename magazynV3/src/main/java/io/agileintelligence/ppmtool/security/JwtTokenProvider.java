package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import static io.agileintelligence.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static io.agileintelligence.ppmtool.security.SecurityConstants.SECRET;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    //Generate token
    public String generateToken(Authentication authentication) {
        //Start building token
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());
        //for different user types
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());


        //json web token
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)//info about user
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)//signature alghorytm
                .compact();//packing
    }

    //Validate token - check if he is match for what had permission
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT Signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT Token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT Token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT Token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT see string as empty");

        }
        return false;
    }

    //Get user id from token - for filter
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)(claims.get("id"));
        return Long.parseLong(id);
    }
}
