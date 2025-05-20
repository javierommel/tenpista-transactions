package com.rommelchocho.tenpista.mapper;

import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.entity.Transaction;

public class TransactionMapper {

    public static TransactionDto mapToTransactionDto(Transaction transaction, TransactionDto transactionDto) {
        transactionDto.setId(transaction.getId());
        transactionDto.setAmount(transaction.getAmount());
        transactionDto.setBusiness(transaction.getBusiness());
        transactionDto.setTenpistaName(transaction.getTenpistaName());
        transactionDto.setTransactionDate(transaction.getTransactionDate());
        return transactionDto;
    }

    public static Transaction mapToTransaction(TransactionDto transactionDto, Transaction transaction) {
        if (transactionDto.getId() != null && transactionDto.getId() > 0) {
            transaction.setId(transactionDto.getId());
        }
        transaction.setAmount(transactionDto.getAmount());
        transaction.setBusiness(transactionDto.getBusiness());
        transaction.setTenpistaName(transactionDto.getTenpistaName());
        transaction.setTransactionDate(transactionDto.getTransactionDate());
        return transaction;
    }
}
