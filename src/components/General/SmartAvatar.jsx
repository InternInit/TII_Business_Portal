import React from "react";
import { Avatar } from "antd";
import { Header } from "../Styled/FundamentalComponents";

const SmartAvatar = (props) => {
  const ColorList = ["#f56a00", "#7265e6", "#13c2c2", "#00a2ae"];

  return props.image ? (
    <div
      className="student-info-avatar"
      style={{ backgroundColor: ColorList[props.name.length % 4] }}
    >
      <Header className={props.fontSize ? props.fontSize : "sixteenFont"} color="white">
        {props.name.substring(0, 1)}
      </Header>
    </div>
  ) : (
    <Avatar
      size={props.size}
      gap={-4}
      style={{ backgroundColor: ColorList[props.name.length % 4] }}
    >
      <span className={props.fontSize ? props.fontSize : null}>
        {props.name.substring(0, 1)}
      </span>
    </Avatar>
  );
};

export default SmartAvatar;
