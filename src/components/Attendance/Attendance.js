import React from "react";
import "./Attendance.css";

class Attendance extends React.Component {
    render() {
        let attendance = this.props.attendance;
        return (
            <div>
                {attendance.map(item => {
                    return <RenderAttendance item={item} key={item.id} />
                })}
            </div>
        );
    }
}

const RenderAttendance = props => (
    <div className="itemContainer">
        <img src={props.item.image} />
        {props.item.name}
    </div>
);

export default Attendance;