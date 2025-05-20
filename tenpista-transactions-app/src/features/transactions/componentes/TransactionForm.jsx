import { Grid, Box, Button, Typography, TextField } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { IoConstruct } from "react-icons/io5";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';

export const TransactionForm = ({ handleList, selectedTransaction, saveTransaction, updateTransaction }) => {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: selectedTransaction?.id || "",
            amount: selectedTransaction?.amount || "",
            business: selectedTransaction?.business || "",
            tenpistaName: selectedTransaction?.tenpistaName || "",
            transactionDate: selectedTransaction?.transactionDate
                ? parseISO(selectedTransaction.transactionDate)
                : null,
        },
    });

    const onSubmit = (data) => {
        console.log("FORM DATA:", data); 
        if (selectedTransaction?.action === "update") {
            updateTransaction(data);
        } else {
            saveTransaction(data);
        }
        //handleList();
    };

    const handleCancel = () => {
        handleList()
    }

    return (
        <Grid container spacing={1}>
            <Grid size={20}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box
                        py={2}
                        component="form"
                        role="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{

                            padding: "40px",
                            borderRadius: "20px",
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(5px)",
                            border: "2px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 0 80px rgba(0, 0, 0, 0.5)",
                            maxWidth: {
                                xs: "90vw",  // Pantallas muy pequeñas (móviles)
                                sm: "70vw",  // Tablets pequeñas
                                md: "50vw",  // Tablets grandes
                                lg: "30vw",  // Escritorios normales
                                xl: "30vw"   // Pantallas grandes
                            },

                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px" >

                            <Typography variant="h6" sx={{
                                fontSize: '1.8em',
                                fontWeight: '600',
                                zIndex: '1',
                                marginLeft: '0'
                            }}>
                                <IoConstruct size={20} style={{ borderRaidius: "20px", boxShadow: "0 0 80px rgba(0, 0, 0, 0.25)", marginRight: 8 }} color="white" />
                                MANTENIMIENTO DE TRANSACCIONES
                            </Typography>
                        </Box>
                        <Box mb={2} display="flex" flexDirection="column" gap={3}>
                            {selectedTransaction?.action === "update" && (
                                <TextField
                                    label="Id Transacción"
                                    fullWidth
                                    {...register("id")}
                                    error={!!errors.id}
                                    helperText={errors.id?.message}
                                    disabled={selectedTransaction?.action === "update"}
                                />
                            )}
                            <TextField
                                label="Monto Transacción"
                                fullWidth
                                type="number"
                                {...register("amount", {
                                    required: "Ingrese el monto",
                                    min: { value: 1, message: "Debe ser mayor a 0" },
                                    validate: (value) => Number.isInteger(Number(value)) || "Debe ser un número entero",
                                })}
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                            />

                            <TextField
                                label="Giro o Comercio"
                                fullWidth
                                {...register("business", {
                                    required: "Campo requerido",
                                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                                })}
                                error={!!errors.business}
                                helperText={errors.business?.message}
                            />

                            <TextField
                                label="Nombre Tenpista"
                                fullWidth
                                {...register("tenpistaName", {
                                    required: "Campo requerido",
                                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                                })}
                                error={!!errors.tenpistaName}
                                helperText={errors.tenpistaName?.message}
                            />

                            <Controller
                                name="transactionDate"
                                control={control}
                                rules={{
                                    required: "Seleccione la fecha",
                                    validate: (value) => value <= new Date() || "La fecha no puede ser futura",
                                }}
                                render={({ field }) => (
                                    <DateTimePicker
                                        label="Fecha de Transacción"
                                        value={field.value}
                                        onChange={field.onChange}
                                        format="yyyy-MM-dd HH:mm"
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: !!errors.transactionDate,
                                                helperText: errors.transactionDate?.message,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box mt={4} display="flex" gap={0.5}>
                            <Button
                                type="submint"
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: "rgb(130, 224, 170,0.6)" }}
                            >
                                Grabar
                            </Button>
                            <Button

                                variant="contained"
                                onClick={handleCancel}
                                fullWidth
                                sx={{ backgroundColor: "rgb(204, 209, 209,0.5)" }}
                            >
                                Cancelar
                            </Button>
                        </Box>

                    </Box>
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}