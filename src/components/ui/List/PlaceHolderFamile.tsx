import React from 'react';

import classes from './placeholder.module.scss';

import ContentLoader from 'react-content-loader';
interface IProps {
  index?: number;
}
const PlaceHolderFamile = ({ index }: IProps) => (
  <div className={classes.container}>
    <ContentLoader height={120} width={500} speed={3} primaryColor="#acabab" secondaryColor="#f7f7f7">
      <rect x="116" y="37" rx="0" ry="0" width="200" height="7" />
      <rect x="116" y="55" rx="0" ry="0" width="230" height="8" />
      <rect x="117" y="75" rx="0" ry="0" width="170" height="8" />
      <circle cx="57" cy="61" r="51" />
    </ContentLoader>
  </div>
);
export default PlaceHolderFamile;
