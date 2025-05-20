package com.rommelchocho.tenpista.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final Map<String, UserRequestInfo> requests = new ConcurrentHashMap<>();
    private final int MAX_REQUESTS = 3;
    private final long TIME_WINDOW_MS = 60 * 1000;

    @Override
    public void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        String method = request.getMethod();

        if (method.equalsIgnoreCase("POST") ||
                method.equalsIgnoreCase("PUT") ||
                method.equalsIgnoreCase("DELETE")) {
            String clientIP = request.getRemoteAddr();
            long currentTime = Instant.now().toEpochMilli();

            UserRequestInfo info = requests.getOrDefault(clientIP, new UserRequestInfo(0, currentTime));
            if (currentTime - info.timestamp > TIME_WINDOW_MS) {
                info = new UserRequestInfo(1, currentTime);
            } else {
                info.count++;
            }

            if (info.count > MAX_REQUESTS) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                response.getWriter().write("""
                            {
                                "status": 429,
                                "message": "Máximo número de solicitudes por minuto alcanzado"
                            }
                        """);
                return;
            }

            requests.put(clientIP, info);
        }
        filterChain.doFilter(request, response);
    }

    private static class UserRequestInfo {
        int count;
        long timestamp;

        UserRequestInfo(int count, long timestamp) {
            this.count = count;
            this.timestamp = timestamp;
        }
    }
}
