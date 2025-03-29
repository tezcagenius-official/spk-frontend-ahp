"use client";
import { IGetAllDivisiResponse } from "@/interfaces/api/division/query.interface";
import { IGetListKriteriaResponse } from "@/interfaces/api/kriteria/query.interface";
import { IChriteriaParams } from "@/interfaces/components/tables/chriteria.interface";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Autocomplete,
    Box,
    IconButton,
    Pagination,
    TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const ChriteriaTable: React.FC<IChriteriaParams> = ({
    data,
    onDeleteData,
    onEditData,
    disableAll = false,
    onPageChange,
    pagination,
    divisions,
    onSelectedDivision,
}) => {
    const currentPage = pagination?.currentPage || 1;
    const totalPages = pagination?.lastPage || 1;
    const totalItems = pagination?.total || 0;
    const itemsPerPage = pagination?.perPage || 10;

    const handlePageChange = (newPage: number) =>
        newPage > 0 &&
        newPage <= totalItems &&
        onPageChange &&
        onPageChange(newPage);

    const columnHelper = createColumnHelper<IGetListKriteriaResponse>();

    const initialColumns = useMemo(() => {
        const baseColumn = [
            columnHelper.display({
                id: "index",
                header: "No.",
                cell: (info) => info.row.index + 1,
            }),
            columnHelper.accessor("nama_kriteria", {
                cell: (info) => info.getValue() ?? "-",
                header: "Nama",
            }),
            columnHelper.accessor("nama_divisi", {
                cell: (info) => info.getValue() ?? "-",
                header: "Nama Divisi",
            }),
            columnHelper.display({
                id: "action",
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center justify-center gap-3">
                            <IconButton
                                disabled={disableAll}
                                color="primary"
                                onClick={() => onEditData?.(row.original)}
                            >
                                <FontAwesomeIcon size="sm" icon={faEdit} />
                            </IconButton>
                            <IconButton
                                disabled={disableAll}
                                color="error"
                                onClick={() => onDeleteData?.(row.original)}
                            >
                                <FontAwesomeIcon size="sm" icon={faTrash} />
                            </IconButton>
                        </div>
                    );
                },
            }),
        ];

        return baseColumn;
    }, [data]);

    const table = useReactTable({
        data: data,
        columns: initialColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell align="justify" key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} align="justify">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {table.getRowModel().rows.length === 0 && (
                            <TableRow
                                className="text-center"
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>No data provided</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box className="py-2 flex items-center px-3">
                <p>
                    Showing <b>{(currentPage - 1) * itemsPerPage + 1} </b>
                    to{" "}
                    <b>{Math.min(currentPage * itemsPerPage, totalItems)} </b>
                    of <b>{totalItems}</b>
                </p>
                <div className="flex gap-2 items-center justify-center w-fit mr-0 ml-auto">
                    <Autocomplete
                        className="w-64"
                        size="small"
                        options={[
                            {
                                divisi_id: undefined,
                                nama_divisi: "No data selected",
                            },
                            ...(divisions ?? ([] as IGetAllDivisiResponse)),
                        ]}
                        isOptionEqualToValue={(option, value) =>
                            option.divisi_id === value.divisi_id
                        }
                        disableClearable
                        getOptionLabel={(option) => option?.nama_divisi ?? ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Divisi"
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        type: "search",
                                    },
                                }}
                            />
                        )}
                        onChange={(_, value) => {
                            onSelectedDivision(value);
                        }}
                    />
                    <Pagination
                        count={totalPages}
                        onChange={(_, v) => handlePageChange(v)}
                        color="secondary"
                    />
                </div>
            </Box>
        </>
    );
};
