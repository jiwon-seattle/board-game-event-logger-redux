import React, { Component }  from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Nav/Nav";
import Attendance from "components/Attendance/Attendance";
import Main from "components/Main/Main";
import Item from "components/Item/Item";
import data from "MOCK_DATA.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: data,
      attendance: [],
      quantity: 1,
      totalAmount: 0,
    };
  }


  handleAddToAttendance = (selectedGame) => {
    let attendanceItem = this.state.attendance;
    let gameId = selectedGame.id;
    if (this.checkAttendance(gameId)) {
      let index = attendanceItem.findIndex(item => {
        return item.id === gameId;
      });
      attendanceItem[index].quantity += 1;
      this.setState({
        attendance: attendanceItem
      });
    } else {
      attendanceItem.push(selectedGame);
      this.setState({
        attendance: attendanceItem,
        quantity: 1
      });
    }
  }
  renderGameDetail = ()  => {
    return this.state.games.map(game => {
      return (
        <Route
          exact
          path={`/item/${game.id}`}
          render={props => {
            return (
              <Item
                AddToAttendance={this.handleAddToAttendance}
                gameQuantity={this.state.quantity}
                image={game.image}
                name={game.name}
                description={game.description}
                fee={game.fee}
                id={game.id}
                key={game.id}
              />
            );
          }}
        />
      );
    });
  }

  //check attendance exists
  checkAttendance = (id) => {
    let attendance = this.state.attendance;
    return attendance.some(item => {return item.id=== id})
  }

  sumTotalAmount() {
    let attendance = this.state.attendance;
    let total = 0;
    for (let i = 0; i < attendance.length; i++){
      if (attendance[i].checked === true){
        total+= attendance[i].price * Number(attendance[i].quantity);
      }
    }
    this.setState({ totalAmount: total});
  }


  //if attendance state is in local state, call it
  componentDidMount(){
    let attendance = localStorage.attendance;
    if(attendance){
      this.setState(prevState => ({attendance: JSON.parse(attendance)})
      , function() { this.sumTotalAmount()})
    }
  }

 // only update chart if the data has changed
  componentDidUpdate(prevProps, prevState) {
    if(prevState.attendance !== this.state.attendance) {
      localStorage.attendance = JSON.stringify(this.state.attendance);
    }
  }



  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Main
                  games={this.state.games}
                />
              );
            }}
          />
          <Route
            exact 
            path="/attendance"
            render ={props => {
              return(
                <Attendance attendance={this.state.attendance} totalAmount={this.state.totalAmount} 
                />
              )
            }}
          />
          {this.renderGameDetail()}
        </Switch>
      </div>
    );
  };
};


export default App;


//The read-only localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions. localStorage is similar to sessionStorage, except that while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the page session ends — that is, when the page is closed.