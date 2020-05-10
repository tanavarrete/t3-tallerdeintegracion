import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
});


export default function SimpleTable(data) {
  const classes = useStyles();
  return (
    <React.Fragment>
    <Title>Stats</Title>
    <TableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Volumen Total Transado</TableCell>
            <TableCell align="right">Alto Histórico</TableCell>
            <TableCell align="right">Bajo Histórico</TableCell>
            <TableCell align="right">Último Precio</TableCell>
            <TableCell align="right">Variación Porcentual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.children.map((row) => (
            <TableRow key={row[0].ticker}>
              <TableCell component="th" scope="row">
                {row[0].ticker}
              </TableCell>
              <TableCell align="right">{row[1]+row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
              <TableCell align="right">{row[4]}</TableCell>
              <TableCell align="right">{row[5]}</TableCell>
              <TableCell align="right">{(((row[6]-row[5])/row[5])*100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}