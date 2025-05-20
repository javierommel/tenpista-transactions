import { TenpoTable } from "../../../components/ui/TenpoTable";
import { Box, Card, Typography, Button } from "@mui/material";
import { TransactionData } from "./TransactionData";
import { IoConstruct } from "react-icons/io5";

export const TransactionList = ({ data: transactions, handleList, handleSelectTransaction, pageable, handlePage, handleRowsPerPage }) => {
    const handleUpdateTransaction = (selectedTransaction) => {
        selectedTransaction.action = "update";
        handleSelectTransaction(selectedTransaction);
        handleList();
    }
    const handleDeleteTransaction = (selectedTransaction) => {
        selectedTransaction.action = "delete";
        handleSelectTransaction(selectedTransaction);
    }
    const handleAddTransaction = (selectedTransaction) => {
        selectedTransaction.action = "add";
        handleSelectTransaction(selectedTransaction);
        handleList();
    }
    const { columns, rows } = TransactionData({ transactions, handleUpdateTransaction, handleDeleteTransaction, handleAddTransaction });

    const handleAdd = () => {
        handleList();
    }
    return (

        <Card mb={3} sx={{
            padding: "40px",
            maxWidth: {
                xs: "90vw",  // Pantallas muy pequeñas (móviles)
                sm: "70vw",  // Tablets pequeñas
                md: "60vw",  // Tablets grandes
                lg: "50vw",  // Escritorios normales
                xl: "50vw"   // Pantallas extra grandes
            },
            boxShadow: "20px 20px 50px rgba(0,0,0, 0.5)",
            borderRadius: "15px",
            borderTop: "1px solid rgba(255,255,255,0.5)",
            borderLeft: "1px solid rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(5px)",
            overflow: "hidden",
            zIndex: "1"
        }}>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px" >
                <Typography variant="h6" sx={{
                    fontSize: '1.8em',
                    fontWeight: '600',
                    zIndex: '1'
                }}>
                    <IoConstruct size={20} style={{ borderRadius: "20px", boxShadow: "0 0 80px rgba(0, 0, 0, 0.5)", marginRight: 8 }} color="white" />
                    MANTENIMIENTO DE TRANSACCIONES
                </Typography>
            </Box>
            <Box
                sx={{
                    "& th": (theme) => ({
                        borderBottom: `1px solid ${theme.palette.grey[700]}`,
                    }),
                    "& .MuiTableRow-root:not(:last-child) td": (theme) => ({
                        borderBottom: `1px solid ${theme.palette.grey[700]}`,
                    }),
                }}
            >
                <TenpoTable
                    columns={columns}
                    rows={rows}
                    pageable={pageable}
                    handlePage={handlePage}
                    handleRowsPerPage={handleRowsPerPage}
                />
            </Box>

        </Card >
    );
}