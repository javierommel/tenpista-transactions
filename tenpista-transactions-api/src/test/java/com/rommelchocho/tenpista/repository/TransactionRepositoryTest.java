package com.rommelchocho.tenpista.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.entity.Transaction;
import com.rommelchocho.tenpista.mapper.TransactionMapper;

@DataJpaTest
class TransactionRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TransactionRepository transactionRepository;

    @Test
    void saveTransaction_ShouldPersistData() {
        Transaction transaction = TransactionMapper.mapToTransaction(new TransactionDto(null, 100, "Supermercado", "Juan Perez", LocalDateTime.now()), new Transaction());
        Transaction saved = transactionRepository.save(transaction);
        assertNotNull(saved.getId());
        assertEquals("Juan Perez", saved.getTenpistaName());
    }

    @Test
    void countByTenpistaName_ShouldReturnCorrectCount() {
        String tenpistaName = "Juan Perez";
        entityManager.persist(TransactionMapper.mapToTransaction(new TransactionDto(null, 100, "Supermercado", tenpistaName, LocalDateTime.now()), new Transaction()));
        entityManager.persist(TransactionMapper.mapToTransaction(new TransactionDto(null, 200, "Farmacia", tenpistaName, LocalDateTime.now()), new Transaction()));
        long count = transactionRepository.countByTenpistaName(tenpistaName);
        assertEquals(2, count);
    }

    @Test
    void findAll_WithPageable_ShouldReturnPagedResults() {
        transactionRepository.save(TransactionMapper.mapToTransaction(new TransactionDto(null, 100, "Tienda A", "Cliente 1", LocalDateTime.now()), new Transaction()));
        transactionRepository.save(TransactionMapper.mapToTransaction(new TransactionDto(null, 200, "Tienda B", "Cliente 2", LocalDateTime.now()), new Transaction()));
        Pageable pageable = PageRequest.of(0, 1);
        Page<Transaction> page = transactionRepository.findAll(pageable);
        assertEquals(1, page.getContent().size());
        assertEquals(2, page.getTotalElements());
    }

    @Test
    void findById_WhenExists_ShouldReturnTransaction() {
        Transaction saved = transactionRepository.save(
            TransactionMapper.mapToTransaction(new TransactionDto(null, 100, "Tienda", "Cliente", LocalDateTime.now()), new Transaction())
        );
        Optional<Transaction> found = transactionRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals(saved.getId(), found.get().getId());
    }

    @Test
    void deleteById_ShouldRemoveTransaction() {
        Transaction saved = transactionRepository.save(
            TransactionMapper.mapToTransaction(new TransactionDto(null, 100, "Tienda", "Cliente", LocalDateTime.now()), new Transaction())
        );
        transactionRepository.deleteById(saved.getId());
        Optional<Transaction> found = transactionRepository.findById(saved.getId());
        assertFalse(found.isPresent());
    }
}