import React from "react";
import {Link} from "react-router-dom";
import "./Main.css";

const Main = props => {
  if(props.games){
    return <RenderGames games={props.games}/>
  }
  else {
    return <RenderLoading/>
  }
}

const RenderGames = props => {
  return props.games.map((game) => {
    return(
      <div className="game">
        <Link className="gameImg" to={`/item/${game.id}`}><img className="gameImage" src={game.image} alt="board-game"/></Link>
        <div className="gameName">
          <p className="gameTitle">{game.name}</p>
          <p className="gameDescription">{game.description}</p>
        </div>
        <p className="gameFee">Join Fee : ${game.fee.toLocaleString()}</p>
        <hr />
      </div>
    )
  })
};

const RenderLoading = props => (
  <div>Loading...</div>
);


export default Main;