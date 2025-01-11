import { IGetListAlternatifResponse } from "@/interfaces/api/alternatif/query.interface";
import { IAlternatifParams } from "@/interfaces/components/tables/alternatif.interface";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
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
import { useCookies } from "next-client-cookies";

const AlternatifTable: React.FC<IAlternatifParams> = ({
  data,
  onDeleteData,
  onEditData,
}) => {
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
      columnHelper.display({
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-center gap-3">
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlternatifTable;
