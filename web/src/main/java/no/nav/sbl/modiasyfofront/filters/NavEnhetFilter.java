package no.nav.sbl.modiasyfofront.filters;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class NavEnhetFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    //midlertidig filter for å få med seg valgt navEnhet fra Frontenden.
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        String servletPath = httpServletRequest.getServletPath();
        if (servletPath.startsWith("/internal") || servletPath.startsWith("/js") || servletPath.startsWith("/img")) {
            chain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        //finnes navEnhet i URL-parameterne? Sett på cookien
        if (httpServletRequest.getParameter("navEnhet") != null) {
            httpServletResponse.addCookie(new Cookie("navEnhet", httpServletRequest.getParameter("navEnhet")));
        }
        chain.doFilter(httpServletRequest, httpServletResponse);
    }

    @Override
    public void destroy() {

    }
}
