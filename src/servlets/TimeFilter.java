package servlets;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class TimeFilter implements Filter {

    public void init(FilterConfig filterConfig)
    {

    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long startTime = System.currentTimeMillis();
        filterChain.doFilter(servletRequest,servletResponse);
        long endTime =System.currentTimeMillis();
        long time = endTime - startTime;
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String methodName = req.getMethod();
        String url = req.getRequestURL().toString();
        String info = String.format("%s - \"%s\" - %dms",methodName,url,time);
        System.out.println(info);
    }

    @Override
    public void destroy() {

    }
}