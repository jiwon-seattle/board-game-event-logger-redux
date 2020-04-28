// connect with store & reducer

import { connect } from "react-redux";
import { actionCreators as gameActions } from "redux/modules/games";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { games : {items}} = state;
  const { routing : {location}} = state;
  return {
    location: location.pathname,
    items
  }
}

const mapDispatchToProps = (dispatch, ownProps)=> {
  return {
    getGames: () => {
      dispatch(gameActions.getGames());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
