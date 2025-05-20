import { Tooltip, Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";
import { IoPencil, IoTrash, IoAddCircle } from "react-icons/io5";

export const TransactionData = ({ transactions, handleUpdateTransaction, handleDeleteTransaction, handleAddTransaction }) => {

    const handleUpdate = (selectedTransaction) => handleUpdateTransaction(selectedTransaction);
    const handleDelete = (selectedTransaction) => handleDeleteTransaction(selectedTransaction);
    const handleAdd = (selectedTransaction) => handleAddTransaction(selectedTransaction);
    const formatDate = (isoDate) => {
        return dayjs(isoDate).format("DD-MM-YYYY HH:mm:ss");
    };
    return {
        columns: [
            { key: "id", name: "Id Transaccion", align: "left", hideOnSmall: false },
            { key: "amount", name: "Monto Transaccion", align: "left", hideOnSmall: false },
            { key: "business", name: "Giro o Comercio", align: "center", hideOnSmall: false },
            { key: "tenpistaName", name: "Nombre Tenpista", align: "center", hideOnSmall: true },
            { key: "transactionDate", name: "Fecha Transaccion", align: "center", hideOnSmall: true },
            {
                key: "action", name: <Tooltip
                    key="add"
                    title="Agregar"
                    placeholder="bottom"
                >
                    <IconButton
                        size="large"
                        color="text"
                        onClick={handleAdd}
                        sx={{
                            borderRadius: '10px',
                            backgroundColor: 'ffffff',
                        }}
                    >
                        <IoAddCircle />
                    </IconButton></Tooltip>, align: "center"
            },
        ],

        rows: (
            transactions.map(transaction => ({
                id: (
                    <Box display="flex" alignItems="center">
                        <Typography pl="16px" color="white" variant="button" fontWeight="bold">
                            {transaction.id}
                        </Typography>
                    </Box>
                ),
                amount: (
                    <Typography variant="button" color="white" fontWeight="medium">
                        {transaction.amount}
                    </Typography>
                ),
                business: (
                    <Typography variant="button" color="white" fontWeight="medium">
                        {transaction.business}
                    </Typography>
                ),
                tenpistaName: (
                    <Typography variant="button" color="white" fontWeight="medium">
                        {transaction.tenpistaName}
                    </Typography>
                ),
                transactionDate: (
                    <Typography variant="button" color="white" fontWeight="medium">
                        {formatDate(transaction.transactionDate)}
                    </Typography>
                ),
                action: (
                    <Box>
                        <Tooltip key={"m" + transaction.id} title="Modificar" placeholder="bottom" >
                            <IconButton onClick={() => handleUpdate(transaction)} sx={{ color: "rgb(125, 206, 160,0.8)" }}>
                                <IoPencil />
                            </IconButton>
                        </Tooltip>
                        <Tooltip key={transaction.id} title="Eliminar" placeholder="bottom">
                            <IconButton onClick={() => handleDelete(transaction)} sx={{ color: "rgb(235, 152, 78 , 0.8)", }}>
                                <IoTrash />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            }))
        )
    };
}
