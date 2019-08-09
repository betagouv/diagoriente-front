import React from 'react';
import ContentLoader from 'react-content-loader';

import classes from './placeholder.module.scss';

interface IProps {
  index?: number;
}
const PlaceHolderFamile = ({ index }: IProps) => (
  <div className={classes.container}>
    <ContentLoader height={120} width={500} speed={3} primaryColor="#acabab" secondaryColor="#f7f7f7" style={{marginTop:20}}>
      <rect x="140" y="60" rx="0" ry="0" width="220" height="9" />
      <rect x="140" y="80" rx="0" ry="0" width="250" height="9" />
      <rect x="140" y="100" rx="0" ry="0" width="190" height="9" />
    </ContentLoader>
  </div>
);
export default PlaceHolderFamile;
