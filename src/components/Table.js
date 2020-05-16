import React from 'react';
import {  withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));



export default function SimpleTable(data) {
  const classes = useStyles();
  return (
    <React.Fragment>
    <Title>Shares Values</Title>
    <TableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Stock</StyledTableCell>
          <StyledTableCell align="right">Name</StyledTableCell>
          <StyledTableCell align="right">Country</StyledTableCell>
          <StyledTableCell align="right">Quote Base</StyledTableCell>
          <StyledTableCell align="right">Volumen Total Transado</StyledTableCell>
          <StyledTableCell align="right">Alto Histórico</StyledTableCell>
          <StyledTableCell align="right">Bajo Histórico</StyledTableCell>
          <StyledTableCell align="right">Último Precio</StyledTableCell>
          <StyledTableCell align="right">Variación Porcentual</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.children.map((row) => (
            <StyledTableRow key={row[0].ticker}>
              <TableCell component="th" scope="row">
                {row[0].ticker}
              </TableCell>
              <TableCell align="right">{row[0].company_name}</TableCell>
              <TableCell align="right">{row[0].country}</TableCell>
              <TableCell align="right">{row[0].quote_base}</TableCell>
              <TableCell align="right">{row[1]+row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
              <TableCell align="right">{row[4]}</TableCell>
              <TableCell align="right">{row[6]}</TableCell>
              <TableCell align="right" style={(((row[6]-row[5])/row[5])*100).toFixed(2) > 0 ? {color: "green"} : {color: "red"} }>{(((row[6]-row[5])/row[5])*100).toFixed(2)}%</TableCell>
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}