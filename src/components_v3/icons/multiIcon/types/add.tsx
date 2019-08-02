import React from 'react';
import { string } from 'prop-types';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Add = ({ color = '#7992BF', width, height }: Props) => {
  return (
    <svg
      fill={color}
      id="Capa_1"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 87.7 87.7"
      enableBackground="new 0 0 87.7 87.7"
    >
      <g>
        <path
          fill={color}
          d="M12.8,74.9c-17.1-17.1-17.1-45,0-62.1s45-17.1,62.1,0s17.1,45,0,62.1S30,92,12.8,74.9z M69.9,17.9
		c-14.3-14.3-37.7-14.3-52,0s-14.3,37.7,0,52s37.7,14.3,52,0S84.2,32.2,69.9,17.9z"
        />
      </g>
      <g>
        <g>
          <path
            fill={color}
            d="M25.9,43.9L25.9,43.9c0-1.6,1.3-2.8,2.8-2.8H59c1.6,0,2.8,1.3,2.8,2.8v0c0,1.6-1.3,2.8-2.8,2.8l-30.3,0
			C27.2,46.7,25.9,45.4,25.9,43.9z"
          />
          <path
            fill={color}
            d="M43.9,25.9L43.9,25.9c1.6,0,2.8,1.3,2.8,2.8V59c0,1.6-1.3,2.8-2.8,2.8h0c-1.6,0-2.8-1.3-2.8-2.8V28.7
			C41,27.2,42.3,25.9,43.9,25.9z"
          />
        </g>
      </g>
    </svg>
  );
};
export default Add;
