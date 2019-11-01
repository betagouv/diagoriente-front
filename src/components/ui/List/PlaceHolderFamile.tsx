import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';
import IndexList from 'components_v3/listIndex/indexList';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Button from 'components_v3/button/button';
import classes from './placeholder.module.scss';

interface IProps {
  index: number;
}
const onChangeTo = () => {};
const PlaceHolderFamile = ({ index }: IProps) => (
  <Fragment>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 15,
      }}
    >
      <IndexList index={index} isLast={5} onChangeTo={onChangeTo} />
      <div className={classes.container}>
        <ContentLoader
          height={120}
          width={500}
          speed={3}
          primaryColor="#acabab"
          secondaryColor="#f7f7f7"
          style={{ marginTop: 20 }}
        >
          <rect x="140" y="60" rx="0" ry="0" width="220" height="9" />
          <rect x="140" y="80" rx="0" ry="0" width="250" height="9" />
          <rect x="140" y="100" rx="0" ry="0" width="190" height="9" />
        </ContentLoader>
        <div className={classes.delete_container}>
          <button className={classes.delete}>
            <Button title="x" color="red" className={classes.button} />
          </button>
        </div>
      </div>
    </div>
  </Fragment>
);
export default PlaceHolderFamile;
