import { IGetListUserResonse } from "@/interfaces/api/user/query.interface";
import { IUserTableParams } from "@/interfaces/components/tables/user.interface";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconButton,
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
}) => {
  const columnHelper = createColumnHelper<IGetListUserResonse>();
  const role = useCookies().get("role");
  const initialColumns = useMemo(() => {
    const baseColumn = [
      columnHelper.accessor("user_id", {
        cell: (info) => info.getValue(),
        header: "ID User",
      }),
      columnHelper.accessor("username", {
        cell: (info) => info.getValue() ?? "-",
        header: "Username",
      }),
      columnHelper.accessor("role", {
        cell: (info) =>
          (info.getValue() ?? "-") === "adm" ? "Admin" : "Super Admin",
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
              No data provided
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
