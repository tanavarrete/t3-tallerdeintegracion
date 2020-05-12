import React, { Component } from "react";

import io from "socket.io-client";

import Button from "@material-ui/core/Button";
import Chart from "./components/Chart";
import Table from "./components/Table";
import Exchange from "./components/Exchange";
import StockMarket from "./components/StockMarket";
import AppBar from "./components/AppBar";
import Card from "./components/Card";

class App extends Component {
  constructor() {
    super();
    this.state = {
      connected: true,
      endpoint: "le-18262636.bitzonte.com",
      socket: "",
      stocks: [],
      graph_data: [],
      actual: 0,
      exchanges: [],
      stock: {},
    };
    this.state.socket = io(this.state.endpoint, {
      path: "/stocks",
      transports: ["websocket"],
    });
  }

  componentWillMount() {
    if (this.state.connected) {
      this.state.socket.on("connect", () => {
        console.log("connecting");
      });
    }
    this.state.socket.on("STOCKS", (data) => {
      console.log("STOCKS", data);
      for (var stock in data) {
        // eslint-disable-next-line no-loop-func
        this.setState((prevState) => ({
          stocks: [
            ...prevState.stocks,
            [data[stock], 0, 0, 0, 100000, 0, 0, []],
          ],
        }));
        //stocks: [...prevState.stocks,  [data[stock], "VOLUME_SELL", "VOLUME_BUY","MAX","MIN","LAST","NOW","CHART", []]]
      }
    });
    this.state.socket.emit("STOCKS", (data) => {
      console.log("STOCKS", data); // data will be 'woot'
    });
    this.state.socket.on("EXCHANGES", (data) => {
      console.log("EXCHANGES", data);
      for (var exchange in data) {
        // eslint-disable-next-line no-loop-func
        this.setState((prevState) => ({
          exchanges: [...prevState.exchanges, data[exchange]],
        }));
      }
    });
    this.state.socket.emit("EXCHANGES", (data) => {
      console.log("EXCHANGES", data); // data will be 'woot'
    });
  }

  componentDidMount() {
    this.state.socket.on("UPDATE", (data) => {
      this.setState({ stock: data });
      this.setState({ value: data.value });
      const newStocks = this.state.stocks.slice(); //copy the array
      for (var stock in newStocks) {
        if (newStocks[stock][0].ticker === data.ticker) {
          if (data.value > newStocks[stock][3]) {
            newStocks[stock][3] = data.value;
          }
          if (data.value < newStocks[stock][4]) {
            newStocks[stock][4] = data.value;
          }
          newStocks[stock][5] = newStocks[stock][6];
          newStocks[stock][6] = data.value;
          newStocks[stock][7].push({ time: data.time, value: data.value });
          this.setState({ stocks: newStocks }); //set the new state
        }
      }
    });
    this.state.socket.on("BUY", (data) => {
      const newStocks = this.state.stocks.slice(); //copy the array
      for (var stock in newStocks) {
        if (newStocks[stock][0].ticker === data.ticker) {
          newStocks[stock][1] = data.volume;
        }
      }
      this.setState({ stocks: newStocks }); //set the new state
    });
    this.state.socket.on("SELL", (data) => {
      const newStocks = this.state.stocks.slice(); //copy the array
      for (var stock in newStocks) {
        if (newStocks[stock][0].ticker === data.ticker) {
          newStocks[stock][2] = data.volume;
        }
      }
      this.setState({ stocks: newStocks }); //set the new state
    });
  }
  componentWillUnmount() {
    this.state.socket.off("SELL");
    this.state.socket.off("BUY");
    this.state.socket.off("UPDATE");
  }

  handleConnect = async () => {
    console.log("se apreto boton");
    await this.setState(function (state, props) {
      return {
        connected: !this.state.connected,
      };
    });
    console.log(this.state.connected);
    if (this.state.connected) {
      console.log("connecting");
      this.state.socket.connect();
    } else {
      console.log("Disconnecting");
      this.state.socket.disconnect();
    }
  };

  render() {
    return (
      <div>
        <center>
          <AppBar />
          <Chart>{this.state.stocks[this.state.actual]}</Chart>
        </center>

        <br />
        <Button
          onClick={this.handleConnect}
          variant="contained"
          color={this.state.connected ? "primary" : "secondary"}
        >
          {this.state.connected ? "Disconnect" : "Connect"}
        </Button>

        <br />
        <Card>{this.state.stock}</Card>

        <br />
        <StockMarket
          stocks={this.state.stocks}
          exchanges={this.state.exchanges}
        />
        <br />
        <br />
        {this.state.stocks.map((stock, index) => (
          <Button
            key={index}
            onClick={() => this.setState({ actual: index })}
            variant="contained"
            color="secondary"
          >
            {stock[0].ticker}
          </Button>
        ))}

        <br />
        <br />
      </div>
    );
  }
}

export default App;
