// view

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Nav/Nav";
import Attendance from "components/Attendance/Attendance";
import Main from "components/Main/Main";
import Item from "components/Item/Item";

class App extends Component {
  renderGameDetail(){
    return this.props.games.map(game => {
      return (
        <Route
        exact path={`item/${game.id}`}
        render={props => {
          return (
            <Item addToAttendace= {this.props.handleAddToAttendace}
            gameQuantity = {this.props.quantity}
            image = {game.image}
            name = {game.name}
            description = {game.description}
            fee = {game.fee}
            id = {game.id}
            key = {game.id}
            />
          )
        }}
        />
      )
    })
  }

  render(){
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path='/' render={props => { return ( <Main games={this.props.games}
          />
          )
        }}
        />
        <Route exact path="/attendance" render={props => {return (<Attendance attendance={this.props.attendance} totalAmount={this.props.totalAmount} />)}}
        />
        {this.renderGameDetail};
        </Switch>
      </div>
    )
  }
}

export default App;