package com.rommelchocho.tenpista.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.entity.Transaction;
import com.rommelchocho.tenpista.exception.BusinessException;
import com.rommelchocho.tenpista.exception.ResourceNotFoundException;
import com.rommelchocho.tenpista.repository.TransactionRepository;
import com.rommelchocho.tenpista.service.impl.TransactionServiceImpl;

@ExtendWith(MockitoExtension.class)
class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Test
    void createTransaction_WhenValidInput_ShouldSaveTransaction() {
        TransactionDto dto = new TransactionDto(null, 100, "Supermercado", "Juan Perez", LocalDateTime.now());
        when(transactionRepository.countByTenpistaName("Juan Perez")).thenReturn(50L);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(new Transaction());

        transactionService.createTransaction(dto);

        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void createTransaction_WhenExceeds100Transactions_ShouldThrowException() {
        TransactionDto dto = new TransactionDto(null, 100, "Supermercado", "Juan Perez", LocalDateTime.now());
        when(transactionRepository.countByTenpistaName("Juan Perez")).thenReturn(100L);

        assertThrows(BusinessException.class, () -> {
            transactionService.createTransaction(dto);
        });
        
        verify(transactionRepository, never()).save(any(Transaction.class));
    }

    @Test
    void getAllTransactions_ShouldReturnPage() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Transaction> mockPage = new PageImpl<>(List.of(new Transaction()));
        when(transactionRepository.findAll(pageable)).thenReturn(mockPage);

        Page<TransactionDto> result = transactionService.getAllTransactions(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
    }

    @Test
    void updateTransaction_WhenExists_ShouldUpdate() {
        Long id = 1L;
        TransactionDto dto = new TransactionDto(id, 200, "Farmacia", "Juan Perez", LocalDateTime.now());
        Transaction existing = new Transaction();
        when(transactionRepository.findById(id)).thenReturn(Optional.of(existing));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(existing);

        boolean result = transactionService.updateTransaction(dto);

        assertTrue(result);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void updateTransaction_WhenNotExists_ShouldThrowException() {
        Long id = 1L;
        TransactionDto dto = new TransactionDto(id, 200, "Farmacia", "Juan Perez", LocalDateTime.now());
        when(transactionRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            transactionService.updateTransaction(dto);
        });
    }

    @Test
    void deleteTransaction_WhenExists_ShouldDelete() {
        Long id = 1L;
        when(transactionRepository.findById(id)).thenReturn(Optional.of(new Transaction()));

        boolean result = transactionService.deleteTransaction(id);

        assertTrue(result);
        verify(transactionRepository, times(1)).deleteById(id);
    }

    @Test
    void deleteTransaction_WhenNotExists_ShouldThrowException() {
        Long id = 1L;
        when(transactionRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            transactionService.deleteTransaction(id);
        });
    }
}
