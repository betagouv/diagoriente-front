import React from 'react';

interface IProps {
  color: string;
}

const MesInteretsSvg = ({ color }: IProps) => (
  <svg
    fill={`${color}`}
    version="1.1"
	id="Calque_1"
	width="50px"
	height="50px"
    x="0px"
    y="0px"
    viewBox="0 0 56.7 34.4"
    enableBackground="new 0 0 52.7 34.4"
  >
    <g>
      <path
        d="M44.4,0c-2.9,0-5.7,1.3-7.6,3.5C34.9,1.3,32.1,0,29.2,0c-5.5,0-10,4.5-10,10c0,12.8,15.8,21.8,16.5,22.1
c0.3,0.2,0.7,0.3,1.1,0.3s0.8-0.1,1.1-0.3c0.7-0.4,16.5-9.3,16.5-22.1C54.3,4.5,49.9,0,44.4,0z M44.4,4.5c3,0,5.4,2.4,5.4,5.4
c0,8.4-9.6,15.3-13,17.5c-3.4-2.2-13-9.1-13-17.5c0-3,2.4-5.4,5.4-5.4c2.7,0,5,2,5.4,4.7c0.1,1.1,1.1,2,2.3,2c1.1,0,2.1-0.9,2.3-2
C39.4,6.6,41.7,4.5,44.4,4.5z"
      />
      <path
        d="M12.3,23.8H3.1c-0.3,0-0.5-0.2-0.5-0.5V14c0-0.3,0.2-0.5,0.5-0.5h9.3c0.3,0,0.5,0.2,0.5,0.5v9.3
C12.8,23.5,12.6,23.8,12.3,23.8z M3.6,22.8h8.3v-8.3H3.6V22.8z"
      />
      <path
        d="M5.6,24.6c-0.3,0-0.5-0.1-0.7-0.3l-4.6-4.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.8,3.9l9.3-12.3
c0.3-0.4,1-0.5,1.4-0.2c0.4,0.3,0.5,1,0.2,1.4l-10,13.2C6.3,24.5,6,24.6,5.6,24.6C5.7,24.6,5.7,24.6,5.6,24.6z"
      />
    </g>
  </svg>
);
export default MesInteretsSvg;