import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const TableTambahan = ({
  ci,
  ri,
  cr,
}: {
  ci: number;
  ri: number;
  cr: number;
}) => {
  return (
    <TableContainer component={Paper} className="!w-fit">
      <Table aria-label="simple table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="justify">CI</TableCell>
            <TableCell align="justify">{ci}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="justify">RI</TableCell>
            <TableCell align="justify">{ri}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="justify">CR</TableCell>
            <TableCell align="justify">{cr}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTambahan;
