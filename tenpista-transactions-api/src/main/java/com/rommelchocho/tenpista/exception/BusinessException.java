package com.rommelchocho.tenpista.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BusinessException extends RuntimeException {

    public BusinessException(String tenpistaName) {
        super(String.format("El tenpista %s ya tiene el máximo permitido de 100 transacciones",tenpistaName));
    }
}
