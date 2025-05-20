package com.rommelchocho.tenpista.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rommelchocho.tenpista.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>  {

    long countByTenpistaName(String tenpistaName);
}
