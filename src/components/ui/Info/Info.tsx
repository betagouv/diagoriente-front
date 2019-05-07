import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Grid from '../Grid/Grid';

import classNames from '../../../utils/classNames';
import classes from './info.module.scss';

interface Props {
  children?: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const Container: any = styled(Grid)(({ containerBackgroundColor, containerBorderColor }: any) => ({
  backgroundColor: containerBackgroundColor,
  border: ` 1px solid ${containerBorderColor}`,
}));

const Triangle: any = styled(Grid)(({ triangleBackgroundColor, triangleBorderColor }: any) => ({
  '::before': {
    borderTopColor: triangleBorderColor,
  },
  '::after': {
    borderTopColor: triangleBackgroundColor,
  },
}));

const Info = ({ children, className, backgroundColor, borderColor }: Props) => (
  <Grid padding={{ xl: 0 }} spacing={{ xl: 0 }} container>
    <Container
      containerBackgroundColor={backgroundColor}
      containerBorderColor={borderColor}
      className={classNames(classes.info, className)}
      item
      xl={12}
    >
      {children}
    </Container>
    <Triangle
      triangleBorderColor={borderColor}
      triangleBackgroundColor={backgroundColor}
      className={classes.info_triangle}
      item
      xl={12}
    />
  </Grid>
);

Info.defaultProps = {
  backgroundColor: '#f2f5f9',
  borderColor: '#cfd9e9',
};

export default Info;
