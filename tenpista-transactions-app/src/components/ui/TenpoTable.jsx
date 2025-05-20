import { useMemo, useState } from "react";

import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { Table, Box, Typography, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useMediaQuery, useTheme } from "@mui/material";

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
export const TenpoTable = ({ columns, rows, pageable, handlePage, handleRowsPerPage}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        handlePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        handlePage(0);
        handleRowsPerPage(parseInt(event.target.value, 10));
    };


    /*const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );*/

    const visibleColumns = useMemo(() => {
        return columns.filter(col => !(isSmallScreen && col.hideOnSmall));
    }, [columns, isSmallScreen]);

    const renderColumns = visibleColumns.map(({ id, name, align, width }, key) => {
        let pl;
        let pr;

        if (key === 0) {
            pl = 3;
            pr = 3;
        } else if (key === columns.length - 1) {
            pl = 3;
            pr = 3;
        } else {
            pl = 1;
            pr = 1;
        }

        return (
            <Box
                key={key}
                component="th"
                width={width || "auto"}
                pt={1.5}
                pb={1.25}
                pl={align === "left" ? pl : 3}
                pr={align === "right" ? pr : 3}
                textAlign={align}
                color="text"
                opacity={0.7}
            >
                {name}
            </Box>
        );
    });

    const renderRows = rows.map((row, key) => {
        const rowKey = `row-${key}`;

        const tableRow = visibleColumns.map(({ key: id, name, align }) => {
            let template;

            if (Array.isArray(row[key])) {
                template = (
                    <Box
                        key={uuidv4()}
                        component="td"
                        p={1}
                        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
                    >
                        <Box display="flex" alignItems="center" py={0.5} px={1}>
                            <Box mr={2}>
                                <Avatar src={row[id][0]} name={row[id][1]} variant="rounded" size="sm" />
                            </Box>
                            <Typography
                                color="white"
                                variant="button"
                                //fontWeight="medium"
                                sx={{ width: "max-content" }}
                            >
                                {row[id][1]}
                            </Typography>
                        </Box>
                    </Box>
                );
            } else {
                template = (
                    <Box
                        key={uuidv4()}
                        component="td"
                        p={1}
                        textAlign={align}
                        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
                    >
                        <Typography
                            variant="button"
                            color="text"
                            sx={{ display: "inline-block", width: "max-content" }}
                        >
                            {row[id]}
                        </Typography>
                    </Box>
                );
            }

            return template;
        });

        return <TableRow key={rowKey}>{tableRow}</TableRow>;
    });

    return useMemo(
        () => (<>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>{renderColumns}</TableRow>
                    </TableHead>
                    <TableBody>{renderRows}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pageable?.totalElements}
                rowsPerPage={rowsPerPage}
                page={pageable?.pageable?.pageNumber}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
        ),
        [columns, rows]
    );
}


Table.defaultProps = {
    columns: [],
    rows: [{}],
};


Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object),
};
