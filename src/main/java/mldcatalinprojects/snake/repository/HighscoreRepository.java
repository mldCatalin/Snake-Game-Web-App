package mldcatalinprojects.snake.repository;

import mldcatalinprojects.snake.model.Highscore;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface HighscoreRepository extends CrudRepository<Highscore, Integer> {
    
    @Query(value="SELECT * FROM highscores ORDER BY score DESC limit ?1", nativeQuery=true)
    List<Highscore> getTopHighscores(@RequestParam Integer limit);
    
    @Query(value="SELECT * FROM highscores WHERE highscores.session_id = ?1 ORDER BY score DESC limit 1", nativeQuery=true)
    Highscore getTopHighscoreFor(@RequestParam String sessionId);
    
    
}
