package mldcatalinprojects.snake.controller;

import mldcatalinprojects.snake.model.SessionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // This means that this class is a controller
@RequestMapping(path="/session")
public class SessionController {
    
//    @GetMapping
//    @CrossOrigin
//    public ResponseEntity<Session> getnewSessionId() {
//        // This returns a JSON or XML with the users
//        SessionHandler sessionHandler = new SessionHandler();
//        Session newSession = sessionHandler.generateSession();
//        return ResponseEntity.ok(newSession);
//    }
    
}
