import { useState } from "react";
import { TransactionForm } from "../componentes/TransactionForm";
import { TransactionList } from "../componentes/TransactionList";
import MainLayout from "../../../components/layout/MainLayout";
import { TenpoAlert } from "../../../components/feedback/TenpoAlert";
import { useTransactions } from "../hooks/useTransactions";
import { TenpoNotification } from "../../../components/feedback/TenpoNotificaction";
import { CircularProgress } from "@mui/material";

export const TransactionPage = () => {
    const [page, setpage] = useState(0);
    const [size, setSize] = useState(10);
    const {
        data,
        isLoading,
        isError,
        addTransactions,
        updateTransactions,
        deleteTransactions,
    } = useTransactions({ page: page, size: size });

    const [isList, setIsList] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [titleAlert, setTitleAlert] = useState("");
    const [messageNotification, setMessageNotification] = useState("");
    const [typeNotification, setTypeNotification] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleList = () => setIsList(!isList);
    const handleAlert = () => setOpenAlert(!openAlert);
    const handleNotification = () => setOpenNotification(!openNotification);
    const onNotificationClose = () => setOpenNotification(false);
    const handlePage = (newPage) => setpage(newPage);
    const handleRowsPerPage = (newSize) => setSize(newSize);

    const handleSelectTransaction = (transaction) => {
        if (transaction?.action == "delete") {
            setMessageAlert("Recuerde que el registro será borrado y no podrá volver a ser utilizado.");
            setTitleAlert("¿Desea eliminar el registro?")
            handleAlert();
        }
        setSelectedTransaction(transaction);
    }

    const handleDelete = (close) => {
        handleAlert();
        if (!close)
            deleteTransaction();
    }

    const saveTransaction = async (transaction) => {
        try {
            const response = await addTransactions(transaction);
            if (response.retcode == 0) {
                setMessageNotification("Registro agregado correctamente")
                setTypeNotification("success");
            }
            else {
                setMessageNotification(response.message)
                setTypeNotification("error");

            }
        } catch (error) {
            if (error.retcode !== 0) {
                setMessageNotification(error.message)
                setTypeNotification("error");
            }
        }
        finally {
            handleList();
            handleNotification();
        }
    }

    const updateTransaction = async (transaction) => {
        try {
            const response = await updateTransactions(transaction);
            if (response.retcode == 0) {
                setMessageNotification("Registro modificado correctamente")
                setTypeNotification("success");

            }
            else {
                setMessageNotification(response.message)
                setTypeNotification("error");

            }
        } catch (error) {
            if (error.retcode !== 0) {
                setMessageNotification(error.message)
                setTypeNotification("error");
            }
        }
        finally {
            handleList();
            handleNotification();
        }
    }

    const deleteTransaction = async () => {
        try {
            const response = await deleteTransactions(selectedTransaction.id)
            if (response.retcode == 0) {
                setMessageNotification("Registro eliminado correctamente")
                setTypeNotification("success");
            }
            else {
                setMessageNotification(response.message)
                setTypeNotification("error");

            }
        } catch (error) {
            if (error.retcode !== 0) {
                setMessageNotification(error.message)
                setTypeNotification("error");
            }
        }
        finally {
            handleNotification();
        }
    }

    const transactions = data?.data?.content || [];
    const pageable = data?.data || [];
    return (
        <MainLayout>
            <TenpoAlert
                open={openAlert}
                message={messageAlert}
                title={titleAlert}
                handleAlert={handleDelete}
            />
            <TenpoNotification
                open={openNotification}
                message={messageNotification}
                type={typeNotification}
                onNotificationClose={onNotificationClose}
            />
            {data ?
                (isList ?
                    <TransactionList
                        data={transactions}
                        handleList={handleList}
                        handleSelectTransaction={handleSelectTransaction}
                        isLoading={isLoading}
                        isError={isError}
                        pageable={pageable}
                        handlePage={handlePage}
                        handleRowsPerPage={handleRowsPerPage}
                    />
                    :
                    <TransactionForm
                        handleList={handleList}
                        selectedTransaction={selectedTransaction}
                        saveTransaction={saveTransaction}
                        updateTransaction={updateTransaction}
                    />) 
                : 
                <CircularProgress color="info" size={50} />
            }
        </MainLayout>
    );
}