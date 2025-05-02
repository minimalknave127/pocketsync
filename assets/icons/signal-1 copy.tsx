import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CheckIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={10}
      fill="none"
      {...props}
    >
      <Path
        stroke="#26C195"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M12.333.922 5 8.255 1.667 4.922"
      />
    </Svg>
  );
}

export default CheckIcon;
