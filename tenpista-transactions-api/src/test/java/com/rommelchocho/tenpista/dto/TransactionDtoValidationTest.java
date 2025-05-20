package com.rommelchocho.tenpista.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.time.LocalDateTime;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class TransactionDtoValidationTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenAmountIsNegative_ShouldFailValidation() {
        
        TransactionDto dto = new TransactionDto(null, -100, "Supermercado", "Juan Perez", LocalDateTime.now());

        Set<ConstraintViolation<TransactionDto>> violations = validator.validate(dto);

        assertFalse(violations.isEmpty());
        assertEquals("El monto debe ser mayor que cero", violations.iterator().next().getMessage());
    }

    @Test
    void whenDateIsFuture_ShouldFailValidation() {
        TransactionDto dto = new TransactionDto(null, 100, "Supermercado", "Juan Perez", LocalDateTime.now().plusDays(1));

        Set<ConstraintViolation<TransactionDto>> violations = validator.validate(dto);

        assertFalse(violations.isEmpty());
        assertEquals("La fecha de transacción no puede ser futura", violations.iterator().next().getMessage());
    }

    @Test
    void whenBusinessIsBlank_ShouldFailValidation() {
        TransactionDto dto = new TransactionDto(null, 100, "", "Juan Perez", LocalDateTime.now());

        Set<ConstraintViolation<TransactionDto>> violations = validator.validate(dto);

        assertFalse(violations.isEmpty());
        assertEquals("El nombre del comercio es obligatorio", violations.iterator().next().getMessage());
    }

    @Test
    void whenTenpistaNameIsBlank_ShouldFailValidation() {
        TransactionDto dto = new TransactionDto(null, 100, "Supermercado", "", LocalDateTime.now());

        Set<ConstraintViolation<TransactionDto>> violations = validator.validate(dto);

        assertFalse(violations.isEmpty());
        assertEquals("El nombre del tenpista es obligatorio", violations.iterator().next().getMessage());
    }
}
