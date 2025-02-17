"use client";
import { IPerbSubChriteriaTableMatNormParams } from "@/interfaces/components/tables/perb-sub-chriteria.interface";
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

const TableMatrixPerbSubChriteriaNorm = ({
  data,
  header,
  prioritas,
}: IPerbSubChriteriaTableMatNormParams) => {
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
            {header.slice(0, data.length).map((header, i) => (
              <TableCell align="justify" key={`${i}-${header.kriteria_id}`}>
                {header.nama_sub_kriteria}
              </TableCell>
            ))}
            <TableCell align="justify">Prioritas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={`row-${i}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="justify">
                {header?.[i]?.nama_sub_kriteria ?? "-"}
              </TableCell>
              {row.map((cell, icell) => (
                <TableCell key={`cell-${i}-${icell}`} align="justify">
                  {cell}
                </TableCell>
              ))}
              <TableCell align="justify">{prioritas[i]}</TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="justify">Total</TableCell>
            {total.map((t, i) => (
              <TableCell key={`cellsum-${i}`} align="justify">
                {t}
              </TableCell>
            ))}
            <TableCell align="justify">
              {prioritas.reduce((acc, n) => acc + n, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMatrixPerbSubChriteriaNorm;
