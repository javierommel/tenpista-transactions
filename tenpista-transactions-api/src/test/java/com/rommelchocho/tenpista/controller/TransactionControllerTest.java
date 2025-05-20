package com.rommelchocho.tenpista.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.rommelchocho.tenpista.config.SecurityConfig;
import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.exception.BusinessException;
import com.rommelchocho.tenpista.exception.ResourceNotFoundException;
import com.rommelchocho.tenpista.service.TransactionService;

import java.time.LocalDateTime;
import java.util.Collections;

@Import(SecurityConfig.class)
@WebMvcTest(TransactionController.class)
@AutoConfigureMockMvc(addFilters = false)
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // para evitar timestamps numéricos

    @Test
    void createTransaction_WhenValidInput_Returns201() throws Exception {
        TransactionDto validDto = new TransactionDto(null, 100, "Supermercado", "Juan Perez", LocalDateTime.now());

        mockMvc.perform(post("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validDto)))
                .andExpect(status().isCreated());
    }

    @Test
    void createTransaction_WhenNegativeAmount_Returns400() throws Exception {
        TransactionDto invalidDto = new TransactionDto(null, -100, "Supermercado", "Juan Perez", LocalDateTime.now());

        mockMvc.perform(post("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.amount").value("El monto debe ser mayor que cero"));
    }

    @Test
    void createTransaction_shouldReturn400_whenBusinessExceptionThrown() throws Exception {
        TransactionDto dto = new TransactionDto(null, 100, "Supermercado", "Juan", LocalDateTime.now());

        doThrow(new BusinessException("Monto inválido"))
                .when(transactionService).createTransaction(any(TransactionDto.class));

        mockMvc.perform(post("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void createTransaction_WhenFutureDate_Returns400() throws Exception {
        TransactionDto invalidDto = new TransactionDto(null, 100, "Supermercado", "Juan Perez",
                LocalDateTime.now().plusDays(1));

        mockMvc.perform(post("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.transactionDate").value("La fecha de transacción no puede ser futura"));
    }

    @Test
    void getAllTransactions_Returns200WithPagedData() throws Exception {
        Page<TransactionDto> mockPage = new PageImpl<>(Collections.singletonList(
                new TransactionDto(1L, 100, "Tienda", "Cliente", LocalDateTime.now())));
        when(transactionService.getAllTransactions(any(Pageable.class))).thenReturn(mockPage);

        mockMvc.perform(get("/transaction")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].amount").value(100))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void updateTransaction_WhenExists_Returns200() throws Exception {
        TransactionDto validDto = new TransactionDto(1L, 200, "Farmacia", "Juan Perez", LocalDateTime.now());
        when(transactionService.updateTransaction(validDto)).thenReturn(true);

        mockMvc.perform(put("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validDto)))
                .andExpect(status().isOk());
    }

    @Test
    void updateTransaction_WhenNotExists_Returns404() throws Exception {
        TransactionDto invalidDto = new TransactionDto(99L, 200, "Farmacia", "Juan Perez", LocalDateTime.now());
        when(transactionService.updateTransaction(invalidDto)).thenThrow(ResourceNotFoundException.class);

        mockMvc.perform(put("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateTransaction_shouldReturn417_whenUpdateFails() throws Exception {
        TransactionDto dto = new TransactionDto(99L, 200, "Farmacia", "Juan Perez", LocalDateTime.now());
        when(transactionService.updateTransaction(any(TransactionDto.class))).thenReturn(false);
        mockMvc.perform(put("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isExpectationFailed());

    }

    @Test
    void deleteTransaction_WhenExists_Returns200() throws Exception {
        when(transactionService.deleteTransaction(1L)).thenReturn(true);

        mockMvc.perform(delete("/transaction/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteTransaction_WhenNotExists_Returns404() throws Exception {
        when(transactionService.deleteTransaction(99L)).thenThrow(ResourceNotFoundException.class);

        mockMvc.perform(delete("/transaction/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteTransaction_shouldReturn417_whenDeleteFails() throws Exception {
        when(transactionService.deleteTransaction(99L)).thenReturn(false);
        mockMvc.perform(delete("/transaction/99"))
                .andExpect(status().isExpectationFailed());
    }

    @Test
    void createTransaction_shouldReturn500_whenUnhandledExceptionThrown() throws Exception {
        TransactionDto dto = new TransactionDto(null, 100, "Super", "Juan", LocalDateTime.now());

        doThrow(new RuntimeException("Fallo interno"))
                .when(transactionService).createTransaction(any(TransactionDto.class));

        mockMvc.perform(post("/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isInternalServerError());
    }
}