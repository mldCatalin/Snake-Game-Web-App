package mldcatalinprojects.snake.model;

import javax.persistence.*;

/**
 * @author Catalin Moldovan
 */

@Entity(name = "highscores")
public class Highscore {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    
    @Column
    private String sessionId;
    
    @Column
    private Integer score;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getScore() {
        return score;
    }
    
    public String getSessionId() {
        return sessionId;
    }
    
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
    
    public void setScore(Integer score) {
        this.score = score;
    }
    
    @Override
    public String toString() {
        return "Highscore{" +
                "id=" + id +
                "sessionId=" + sessionId +
                ", score=" + score +
                '}';
    }
}
