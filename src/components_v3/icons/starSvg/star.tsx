import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Star = ({
  color = '#ffd700',
  width,
  height,
  className,
}: Props & React.HTMLAttributes<HTMLElement>) => (
  <svg
    fill={color}
    id="Capa_1"
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 30 29"
    enableBackground="new 0 0 30 29"
    className={className}
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M27.731 9.007l-7.32-.521a.392.392 0 0 1-.343-.249L17.28 1.504A2.413 2.413 0 0 0 15.01 0a2.415 2.415 0 0 0-2.268 1.51L9.947 8.25a.41.41 0 0 1-.343.248l-7.308.522a2.413 2.413 0 0 0-2.159 1.643 2.365 2.365 0 0 0 .728 2.627l5.657 4.634a.4.4 0 0 1 .134.4l-1.724 7a2.35 2.35 0 0 0 .385 2.068 2.446 2.446 0 0 0 1.927.952c.464 0 .917-.14 1.29-.388l6.183-3.815a.406.406 0 0 1 .422 0l6.244 3.803c.391.26.844.4 1.303.4.703 0 1.4-.333 1.853-.897.47-.583.642-1.34.47-2.099l-1.73-7.018a.407.407 0 0 1 .134-.406l5.743-4.646a2.38 2.38 0 0 0 .722-2.62 2.41 2.41 0 0 0-2.147-1.65z"
    />
  </svg>
);
export default Star;
