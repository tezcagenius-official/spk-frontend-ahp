"use client";
import { IGetListUserResonse } from "@/interfaces/api/user/query.interface";
import { IUserTableParams } from "@/interfaces/components/tables/user.interface";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useCookies } from "next-client-cookies";
import React, { useMemo } from "react";

const UserTable: React.FC<IUserTableParams> = ({
    data,
    onDeleteData,
    onEditData,
    pagination,
    onPageChange,
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

    const columnHelper = createColumnHelper<IGetListUserResonse>();
    const role = useCookies().get("role");
    const initialColumns = useMemo(() => {
        const baseColumn = [
            columnHelper.display({
                id: "index",
                header: "No.",
                cell: (info) => info.row.index + 1,
            }),
            columnHelper.accessor("username", {
                cell: (info) => info.getValue() ?? "-",
                header: "Username",
            }),
            columnHelper.accessor("role", {
                cell: (info) =>
                    (info.getValue() ?? "-") === "adm"
                        ? "Admin"
                        : "Super Admin",
                header: "Role User",
            }),
            columnHelper.display({
                id: "action",
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center justify-center gap-3">
                            <IconButton
                                color="primary"
                                onClick={() => onEditData?.(row.original)}
                                disabled={role !== "spa" || true}
                            >
                                <FontAwesomeIcon size="sm" icon={faEdit} />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => onDeleteData?.(row.original)}
                                disabled={role !== "spa"}
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
                <Pagination
                    className="mr-0 ml-auto w-fit"
                    count={totalPages}
                    onChange={(_, v) => handlePageChange(v)}
                    color="secondary"
                />
            </Box>
        </>
    );
};

export default UserTable;
