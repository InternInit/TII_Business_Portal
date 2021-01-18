import React from "react";
import { Avatar } from "antd";

const SmartAvatar = (props) => {
  const ColorList = ["#f56a00", "#7265e6", "#13c2c2", "#00a2ae"];

  return (
    <Avatar
      size={props.size}
      gap={-4}
      style={{ backgroundColor: ColorList[props.name.length % 4] }}
    >
      <span className={props.fontSize ? props.fontSize : null}>{props.name.substring(0, 1)}</span>
    </Avatar>
  );
};

export default SmartAvatar;
