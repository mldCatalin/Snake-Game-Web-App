package mldcatalinprojects.snake;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Catalin Moldovan
 */
@Controller
public class MainController {
    
    @RequestMapping("/")
    public String index() {
        return "index";
    }
}
