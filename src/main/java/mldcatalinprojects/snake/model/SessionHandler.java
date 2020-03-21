package mldcatalinprojects.snake.model;

import java.util.UUID;

/**
 * @author Catalin Moldovan
 */
public class SessionHandler {
    
    public SessionCookie generateSession() {
        return new SessionCookie(UUID.randomUUID().toString());
    }
}
