package com.rommelchocho.tenpista.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rommelchocho.tenpista.dto.TransactionDto;

public interface TransactionService {
    
    void createTransaction(TransactionDto transactionDto);

    Page<TransactionDto> getAllTransactions(Pageable pageable);

    boolean updateTransaction(TransactionDto cuentaDto);

    boolean deleteTransaction(Long numeroCuenta);
}
