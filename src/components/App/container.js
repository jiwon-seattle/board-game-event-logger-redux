import React, {Component} from 'react';
import data from "MOCK_DATA.json";
import App from './presenter';

class Container extends Component {
  constructor() {
    super();
    this.state ={
      games: [],
      attendance: [],
      quantity: 1,
      totalAmount: 0,
    }
  }

  componentDidMount() {
    this.props.getGames()
    //if attendance state is in local storage, fetch
    let attendance = localStorage.attendance;
    if(attendance){
      this.setState(prevState => ({
        attendance: JSON.parse(attendance)
      }), function() {
        this.sumTotalAmount();
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.attendance!== this.state.attendance){
      localStorage.attendance = JSON.stringify(this.state.attendance);
    }
  }

  handleAddToAttendance(selectedGame){
    let attendanceItem = this.state.attendance;
    let gameId = selectedGame.id;
    if (this.checkGame(gameId)) {
      let index = attendanceItem.findIndex(item => { return item.id == gameId});
      attendanceItem[index].quantity += 1;
      this.setState({attendance : attendanceItem});
    } else {
      attendanceItem.push(selectedGame);
      this.setState({attendance : attendanceItem, quantity : 1})
    }
  }

  checkGame(id) {
    let attendance = this.state.attendance;
    return attendance.some(item => {return item.id == id})
  }

  //total sum of attendance fee 
  sumTotalAmount(){
    return (
      <App checkGame={this.checkGame}
      sumTotalAmount = {this.sumTotalAmount}
      renderGameDetail = {this.renderGameDetail}
      handleAddToAttendance ={this.handleAddToAttendance}
      checkGame={this.renderGameDetail}
      {...this.state}
      {...this.props}
      />
    )
  }
}

export default Container;