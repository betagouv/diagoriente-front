import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Remove = ({ color = '#7992BF', width, height }: Props) => (
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
    <g id="EXP_PERSO" data-name="EXP PERSO">
      <circle cx="27.02" cy="27.02" r="24.83" fill="#fff" />
      <path
        d="M27,54A27,27,0,1,1,54,27,27.05,27.05,0,0,1,27,54ZM27,4.38A22.64,22.64,0,1,0,49.66,27,22.67,22.67,0,0,0,27,4.38Z"
        fill={color}
      />
      <rect
        x="25.27"
        y="15.95"
        width="3.5"
        height="22.15"
        rx="1.75"
        ry="1.75"
        transform="translate(27.02 -11.19) rotate(45)"
        fill={color}
      />
      <rect
        x="25.27"
        y="15.95"
        width="3.5"
        height="22.15"
        rx="1.75"
        ry="1.75"
        transform="translate(65.24 27.02) rotate(135)"
        fill={color}
      />
    </g>
  </svg>
  );
export default Remove;
