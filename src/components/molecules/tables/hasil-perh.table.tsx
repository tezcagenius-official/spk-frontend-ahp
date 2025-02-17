"use client";
import { IGetPerhitungan } from "@/interfaces/api/perhitungan/query.interface";
import { IPerhCompParams } from "@/interfaces/components/tables/perh-comp.interface";
import {
  Box,
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
import React, { useMemo } from "react";

const TableHasilPerhitungan: React.FC<IPerhCompParams> = ({
  data,
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

  const columnHelper = createColumnHelper<IGetPerhitungan>();
  const initialColumns = useMemo(() => {
    const baseColumn = [
      columnHelper.accessor("nama", {
        cell: (info) => info.getValue(),
        header: "Nama",
      }),
      columnHelper.accessor("email", {
        cell: (info) => info.getValue() ?? "-",
        header: "Email",
      }),
      columnHelper.accessor("nomor_telpon", {
        cell: (info) => info.getValue() ?? "-",
        header: "Nomor Telepon",
      }),
      columnHelper.accessor("ranking", {
        cell: (info) => info.getValue() ?? "-",
        header: "Ranking",
      }),
      columnHelper.accessor("total_skor", {
        cell: (info) => info.getValue() ?? "-",
        header: "Total Skor",
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
        <Table aria-label="perh-consid-table">
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} align="justify">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <TableRow
                className="text-center"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          to <b>{Math.min(currentPage * itemsPerPage, totalItems)} </b>
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

export default TableHasilPerhitungan;
