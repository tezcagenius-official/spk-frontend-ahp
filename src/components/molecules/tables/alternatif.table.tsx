"use client";
import { IGetListAlternatifResponse } from "@/interfaces/api/alternatif/query.interface";
import { IGetAllDivisiResponse } from "@/interfaces/api/division/query.interface";
import { IAlternatifParams } from "@/interfaces/components/tables/alternatif.interface";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const AlternatifTable: React.FC<IAlternatifParams> = ({
    data,
    onDeleteData,
    onEditData,
    pagination,
    onPageChange,
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
    const router = useRouter();
    const columnHelper = createColumnHelper<IGetListAlternatifResponse>();
    const role = useCookies().get("role");
    const initialColumns = useMemo(() => {
        const baseColumn = [
            columnHelper.accessor("alternatif_id", {
                cell: (info) => info.getValue(),
                header: "ID Alternatif",
            }),
            columnHelper.accessor("nama", {
                cell: (info) => info.getValue() ?? "-",
                header: "Nama",
            }),
            columnHelper.accessor("email", {
                cell: (info) => info.getValue() ?? "-",
                header: "Email",
            }),
            columnHelper.accessor("nomor_telpon", {
                cell: (info) => info.getValue() ?? "-",
                header: "No. Telp",
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
                                color="primary"
                                onClick={() =>
                                    router.push(
                                        `/dashboard/consid/detail/${row.original.alternatif_id}`
                                    )
                                }
                                disabled={role !== "adm"}
                            >
                                <FontAwesomeIcon size="sm" icon={faEye} />
                            </IconButton>
                            <IconButton
                                color="primary"
                                onClick={() => onEditData?.(row.original)}
                                disabled={role !== "adm"}
                            >
                                <FontAwesomeIcon size="sm" icon={faEdit} />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => onDeleteData?.(row.original)}
                                disabled={role !== "adm"}
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

export default AlternatifTable;
