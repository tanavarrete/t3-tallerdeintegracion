import React from "react";
import {  withStyles,makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";


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
    minWidth: 600,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    background: '#dcdcdc',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));


export default function SimpleTable(data) {
  const classes = useStyles();
  function volumenCompra(exchange) {
    var valor = 0;
    for (var stock_exchange in exchange.listed_companies) {
      for (var stock in data.stocks) {
        if (
          data.stocks[stock][0].company_name ===
          exchange.listed_companies[stock_exchange]
        ) {
          valor = valor + data.stocks[stock][1];
        }
      }
    }
    return valor;
  }
  function volumenVenta(exchange) {
    var valor = 0;
    for (var stock_exchange in exchange.listed_companies) {
      for (var stock in data.stocks) {
        if (
          data.stocks[stock][0].company_name ===
          exchange.listed_companies[stock_exchange]
        ) {
          valor = valor + data.stocks[stock][2];
        }
      }
    }
    return valor;
  }
  function volumenTotal() {
    var valor = 0;
    for (var exchange in data.exchanges) {
      valor =
        valor +
        volumenVenta(data.exchanges[exchange]) +
        volumenCompra(data.exchanges[exchange]);
    }
    return valor;
  }
  var TotalMercado = volumenTotal();
  return (
    <div>
      <Grid container spacing={1}>
      {data.exchanges.map((exchange, index) => (
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Title>{exchange.name}</Title>
              <TableContainer component={Paper}>
                <Table
                  key={index}
                  size="small"
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                    <StyledTableCell align="right">Volumen Compra (BUY)</StyledTableCell>
                      <StyledTableCell align="right">Volumen Venta (SELL)</StyledTableCell>
                      <StyledTableCell align="right">Volumen Total</StyledTableCell>
                      <StyledTableCell align="right">Cantidad Acciones</StyledTableCell>
                      <StyledTableCell align="right">
                        Participación de Mercado
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <TableCell align="left" component="th" scope="row">
                        {volumenCompra(exchange)}
                      </TableCell>
                      <TableCell align="right">
                        {volumenVenta(exchange)}
                      </TableCell>
                      <TableCell align="right">
                        {volumenCompra(exchange) + volumenVenta(exchange)}
                      </TableCell>
                      <TableCell align="right">
                        {exchange.listed_companies.length}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          ((volumenCompra(exchange) + volumenVenta(exchange)) /
                            TotalMercado) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          </Paper>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}
