import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Border = ({ color = '#7992BF', width, height }: Props) => (
  <svg
    fill={color}
    id="Capa_1"
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 54 54"
    enableBackground="new 0 0 54 54"
  >
    <g>
      <circle fill="#FFF" cx="27" cy="27" r="24.8" />
      <path
        fill={color}
        d="M27,54C12.1,54,0,41.9,0,27S12.1,0,27,0s27,12.1,27,27S41.9,54,27,54z M27,4.4C14.5,4.4,4.4,14.5,4.4,27
			S14.5,49.7,27,49.7S49.7,39.5,49.7,27S39.5,4.4,27,4.4z"
      />
    </g>
  </svg>
  );
export default Border;
