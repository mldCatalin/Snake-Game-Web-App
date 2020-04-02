package mldcatalinprojects.snake.controller;

import mldcatalinprojects.snake.SnakeApplication;
import mldcatalinprojects.snake.model.Highscore;
import mldcatalinprojects.snake.model.Score;
import mldcatalinprojects.snake.model.SessionCookie;
import mldcatalinprojects.snake.model.SessionHandler;
import mldcatalinprojects.snake.repository.HighscoreRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.logging.Logger;

@CrossOrigin
@Controller // This means that this class is a controller
@RequestMapping(path = "/highscores")
public class HighscoreController {
    
    @Autowired
    // This means to get the bean called highscoreRepository which is auto-generated by Spring, we will use it to handle the data
    private HighscoreRepository highscoreRepository;
    
    
    @PostMapping // Map ONLY POST Requests
    @CrossOrigin
    public @ResponseBody
    Highscore addNewHighScore(@CookieValue(value = "sessionId", defaultValue = "none") String sessionId,
                              @RequestBody Score score,
                              HttpServletResponse response) {
        Highscore highscore = new Highscore();
        highscore.setScore(score.getScore());
        if (sessionId.equals("none")) {
            SessionCookie sessionCookie = new SessionHandler().generateSession();
            response.addCookie(sessionCookie);
            highscore.setSessionId(sessionCookie.getSessionId());
        } else highscore.setSessionId(sessionId);
        
        return highscoreRepository.save(highscore);
    }
    
    @GetMapping(path = "/all")
    @CrossOrigin
    public @ResponseBody
    Iterable<Highscore> getAllHighscores() {
        return highscoreRepository.findAll();
    }
    
    @GetMapping(path = "/top")
    @CrossOrigin
    public ResponseEntity<Iterable<Highscore>> getTopHighscores(@RequestParam("limit") Integer limit) {
        return ResponseEntity.ok(highscoreRepository.getTopHighscores(limit));
    }
    
    @GetMapping(path = "/personalTop")
    @CrossOrigin
    public ResponseEntity<Highscore> getTopHighscoreFor(@CookieValue("sessionId") String sessionId) {
        return ResponseEntity.ok(highscoreRepository.getTopHighscoreFor(sessionId));
    }
}