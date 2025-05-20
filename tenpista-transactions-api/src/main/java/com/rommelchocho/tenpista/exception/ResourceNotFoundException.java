package com.rommelchocho.tenpista.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String recurso, String campo, String valor ) {
        super(String.format("%s no encontrado con los datos ingresados %s: '%s'",recurso, campo, valor));
    }
}
