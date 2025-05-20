package com.rommelchocho.tenpista.filter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.*;

import com.rommelchocho.tenpista.security.filter.RateLimitingFilter;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class RateLimitingFilterTest {

    private RateLimitingFilter filter;

    @BeforeEach
    void setUp() {
        filter = new RateLimitingFilter();
    }

    @Test
    void allowsUnlimitedGetRequests() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/transaction");
        request.setRemoteAddr("192.168.0.1");

        MockHttpServletResponse response = new MockHttpServletResponse();

        for (int i = 0; i < 10; i++) {
            response = new MockHttpServletResponse();
            filter.doFilterInternal(request, response, new MockFilterChain());
            assertEquals(HttpServletResponse.SC_OK, response.getStatus());
        }
    }

    @Test
    void allowsUpToThreePostRequests() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/transaction");
        request.setRemoteAddr("192.168.0.2");

        MockHttpServletResponse response;

        for (int i = 0; i < 3; i++) {
            response = new MockHttpServletResponse();
            filter.doFilterInternal(request, response, new MockFilterChain());
            assertEquals(HttpServletResponse.SC_OK, response.getStatus(), "Request #" + (i + 1) + " should be allowed");
        }
    }

    @Test
    void blocksAfterThreePostRequests() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/transaction");
        request.setRemoteAddr("192.168.0.3");

        MockHttpServletResponse response = new MockHttpServletResponse();

        // 3 requests allowed
        for (int i = 0; i < 3; i++) {
            response = new MockHttpServletResponse();
            filter.doFilterInternal(request, response, new MockFilterChain());
        }

        // 4th request blocked
        response = new MockHttpServletResponse();
        filter.doFilterInternal(request, response, new MockFilterChain());

        assertEquals(HttpStatus.TOO_MANY_REQUESTS.value(), response.getStatus());
        assertTrue(response.getContentAsString().contains("Máximo número de solicitudes por minuto alcanzado"));
    }

    @Test
    void allowsDifferentIpsIndependently() throws ServletException, IOException {
        for (int i = 1; i <= 3; i++) {
            MockHttpServletRequest request = new MockHttpServletRequest("POST", "/transaction");
            request.setRemoteAddr("192.168.1." + i);

            for (int j = 0; j < 3; j++) {
                MockHttpServletResponse response = new MockHttpServletResponse();
                filter.doFilterInternal(request, response, new MockFilterChain());
                assertEquals(HttpServletResponse.SC_OK, response.getStatus());
            }
        }
    }

    @Test
    void allowsPutAndDeleteButRespectsLimit() throws ServletException, IOException {
        String ip = "192.168.0.50";

        for (int i = 0; i < 2; i++) {
            MockHttpServletRequest request = new MockHttpServletRequest("PUT", "/transaction");
            request.setRemoteAddr(ip);
            MockHttpServletResponse response = new MockHttpServletResponse();
            filter.doFilterInternal(request, response, new MockFilterChain());
            assertEquals(HttpServletResponse.SC_OK, response.getStatus());
        }

        MockHttpServletRequest deleteRequest = new MockHttpServletRequest("DELETE", "/transaction");
        deleteRequest.setRemoteAddr(ip);
        MockHttpServletResponse deleteResponse = new MockHttpServletResponse();
        filter.doFilterInternal(deleteRequest, deleteResponse, new MockFilterChain());
        assertEquals(HttpServletResponse.SC_OK, deleteResponse.getStatus());

        // Exceeding limit
        MockHttpServletRequest extraRequest = new MockHttpServletRequest("PUT", "/transaction");
        extraRequest.setRemoteAddr(ip);
        MockHttpServletResponse extraResponse = new MockHttpServletResponse();
        filter.doFilterInternal(extraRequest, extraResponse, new MockFilterChain());
        assertEquals(HttpStatus.TOO_MANY_REQUESTS.value(), extraResponse.getStatus());
    }
}
