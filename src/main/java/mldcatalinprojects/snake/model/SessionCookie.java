package mldcatalinprojects.snake.model;

import javax.servlet.http.Cookie;

/**
 * @author Catalin Moldovan
 */
public class SessionCookie extends Cookie {
    
    private static final String NAME = "sessionId";
    private String sessionId;
    
    public SessionCookie(String sessionId) {
        super(NAME, sessionId);
        this.sessionId = sessionId;
    }
    
    public SessionCookie(SessionHandler generateSession) {
        super(NAME, generateSession.generateSession().getSessionId());
    }
    
    public String getSessionId() {
        return sessionId;
    }
}
