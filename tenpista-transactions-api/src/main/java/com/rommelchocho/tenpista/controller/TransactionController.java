package com.rommelchocho.tenpista.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rommelchocho.tenpista.dto.ResponseDto;
import com.rommelchocho.tenpista.dto.TransactionDto;
import com.rommelchocho.tenpista.service.TransactionService;

import constants.TransasctionConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/transaction")
@AllArgsConstructor
@Validated
@Tag(name = "Transaction Management", description = "API for financial transaction operations in the Tenpista system. "
        +
        "Includes creation, retrieval, update and deletion of transactions with business rule enforcement.")
public class TransactionController {

    private TransactionService transactionService;

    @Operation(summary = "Create a new transaction", description = "Registers a new financial transaction in the system. "
            +
            "Business rules applied: \n" +
            "- Transaction amount must be positive \n" +
            "- Transaction date cannot be in the future \n" +
            "- Maximum 100 transactions per customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transaction created successfully", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid transaction data - violates business rules", content = @Content(schema = @Schema(example = "{\"status\": \"400\", \"message\": \"Amount must be positive\"}"))),
            @ApiResponse(responseCode = "429", description = "Rate limit exceeded (max 3 requests per minute)", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    public ResponseEntity<ResponseDto> createTransaction(@Valid @RequestBody TransactionDto transactionDto) {
        transactionService.createTransaction(transactionDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(TransasctionConstants.STATUS_201, TransasctionConstants.MESSAGE_201));
    }

    @Operation(summary = "Get paginated transactions", description = "Retrieves transactions with pagination support. Default page size is 10 items.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved transactions", content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "204", description = "No transactions found", content = @Content(schema = @Schema(hidden = true)))
    })
    @Parameter(name = "page", description = "Page number (0-based)", example = "0")
    @Parameter(name = "size", description = "Number of items per page", example = "10")
    @Parameter(name = "sortBy", description = "Sorting field (available: id, amount, date)", example = "date")

    @GetMapping
    public ResponseEntity<Page<TransactionDto>> getAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<TransactionDto> pagedTransactions = transactionService.getAllTransactions(pageable);
        return ResponseEntity.ok(pagedTransactions);
    }

    @Operation(summary = "Update a transaction", description = "Updates an existing transaction. Transaction ID must be provided.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transaction updated successfully", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Transaction not found", content = @Content(schema = @Schema(example = "{\"status\": \"404\", \"message\": \"Transaction not found\"}"))),
            @ApiResponse(responseCode = "417", description = "Update operation failed", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PutMapping
    public ResponseEntity<ResponseDto> updateTransaction(@Valid @RequestBody TransactionDto transactionDto) {
        boolean isUpdated = transactionService.updateTransaction(transactionDto);
        if (isUpdated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(TransasctionConstants.STATUS_200, TransasctionConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(TransasctionConstants.STATUS_417, TransasctionConstants.MESSAGE_417_UPDATE));
        }
    }

    @Operation(summary = "Delete a transaction", description = "Deletes a transaction by its ID. This operation is irreversible.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transaction deleted successfully", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Transaction not found", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "417", description = "Delete operation failed", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> deleteTransaction(@PathVariable Long id) {
        boolean isDeleted = transactionService.deleteTransaction(id);
        if (isDeleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(TransasctionConstants.STATUS_200, TransasctionConstants.MESSAGE_200));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto(TransasctionConstants.STATUS_417, TransasctionConstants.MESSAGE_417_DELETE));
        }
    }
}
