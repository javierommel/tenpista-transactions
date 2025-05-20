package com.rommelchocho.tenpista.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.entity.Transaction;
import com.rommelchocho.tenpista.exception.BusinessException;
import com.rommelchocho.tenpista.exception.ResourceNotFoundException;
import com.rommelchocho.tenpista.mapper.TransactionMapper;
import com.rommelchocho.tenpista.repository.TransactionRepository;
import com.rommelchocho.tenpista.service.TransactionService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private TransactionRepository transactionRepository;

    @Override
    public void createTransaction(TransactionDto transactionDto) {
        long count = transactionRepository.countByTenpistaName(transactionDto.getTenpistaName());
        if (count >= 100) {
            throw new BusinessException(transactionDto.getTenpistaName());
        }
        Transaction transaction = TransactionMapper.mapToTransaction(transactionDto, new Transaction());
        transactionRepository.save(transaction);
    }

    @Override
    public Page<TransactionDto> getAllTransactions(Pageable pageable) {
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions
                .map(transaction -> TransactionMapper.mapToTransactionDto(transaction, new TransactionDto()));
    }

    @Override
    public boolean updateTransaction(TransactionDto transactionDto) {
        Transaction transaction = transactionRepository.findById(transactionDto.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Transaccion", "id", transactionDto.getId().toString()));
        TransactionMapper.mapToTransaction(transactionDto, transaction);
        transaction = transactionRepository.save(transaction);
        return transaction != null;
    }

    @Override
    public boolean deleteTransaction(Long id) {
        transactionRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Transaccion", "id", id.toString()));
        transactionRepository.deleteById(id);
        return true;
    }

}
