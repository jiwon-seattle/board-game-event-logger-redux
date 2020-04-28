import React, { Component } from "react";

class Item extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedGame: {}
    }
  }

  AddToAttendance(image, name, description, fee, id,  quantity, checked){
    this.setState({
      selectedGame: {
        image: image,
        name: name,
        description: description,
        fee: fee,
        id: id,
        quantity: quantity,
        checked: checked
      }
    }, function() {
      this.props.AddToAttendance(this.state.selectedGame);
    })
};
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let description = this.props.description;
    let fee = this.props.fee;
    let id = this.props.id;
    let quantity = this.props.gameQuantity;
    return (
      <div className="container">
        <img 
            className="itemImage"
            src={this.props.image}
            alt={this.props.name}
        />
        <br/>
        {this.props.name}
        <br/>
        {this.props.description}
        <div className="itemFee">Join Fee : ${this.props.fee}</div>
        <button color="primary" onClick={this.AddToAttendance.bind(this, image, name, description, fee, id, quantity)}>Join the event</button>
      </div>
    ) 
  }
}

export default Item;