import { IPerbChriteriaTableMatrixParams } from "@/interfaces/components/tables/perb-chriteria.interface";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";

const TableMatrixPerbChriteria = ({
  data,
  header,
}: IPerbChriteriaTableMatrixParams) => {
  const total = useMemo(() => {
    const rowLength = data?.[0]?.length ?? 0;
    const total: number[] = [];
    for (let i = 0; i < rowLength; i++) {
      let sum = 0;
      data.forEach((row) => {
        sum += row[i];
      });
      total.push(sum);
    }

    return total;
  }, [data]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="justify" />
            {header.map((header) => (
              <TableCell align="justify" key={header.kriteria_id}>
                {header.nama_kriteria}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={`row-${i}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell key={`cell-${i}`} align="justify">
                {header?.[i]?.nama_kriteria ?? "-"}
              </TableCell>
              {row.map((cell, i) => (
                <TableCell key={`cell-${i}`} align="justify">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="justify">Total</TableCell>
            {total.map((t, i) => (
              <TableCell key={`cellsum-${i}`} align="justify">
                {t}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMatrixPerbChriteria;
