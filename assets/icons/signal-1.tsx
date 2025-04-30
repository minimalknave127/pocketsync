import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";

function Signal1(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      fill="none"
      {...props}
    >
      <G fill="#000" clipPath="url(#a)">
        <Path d="M8.5 4.001a2 2 0 0 0-2 2v8a2 2 0 0 0 4 0v-8a2 2 0 0 0-2-2Zm.667 10a.667.667 0 0 1-1.334 0v-8a.667.667 0 1 1 1.334 0v8ZM14.5.001a2 2 0 0 0-2 2v12a2 2 0 0 0 4 0v-12a2 2 0 0 0-2-2Zm.667 14a.667.667 0 0 1-1.334 0v-12a.667.667 0 0 1 1.334 0v12ZM2.5 8.001a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0v-4a2 2 0 0 0-2-2Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M.5.001h16v16H.5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Signal1;
