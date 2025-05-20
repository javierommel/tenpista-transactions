package com.rommelchocho.tenpista.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {

    private Long id;
    
    @NotNull
    @Min(value = 1, message = "El monto debe ser mayor que cero")
    private Integer amount;

    @NotBlank(message = "El nombre del comercio es obligatorio")
    private String business;

    @NotBlank(message = "El nombre del tenpista es obligatorio")
    private String tenpistaName;

    @NotNull
    @PastOrPresent(message = "La fecha de transacción no puede ser futura")
    private LocalDateTime transactionDate;

}
