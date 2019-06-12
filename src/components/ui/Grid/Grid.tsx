import React, { CSSProperties, HTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';

import classes from './grid.module.scss';
import classNames from '../../../utils/classNames';

const breakpoints: { [key: string]: string } = {
  xl: '1280px',
  lg: '1024px',
  md: '768px',
  smd: '576px',
  sm: '375px',
  xs: '320px',
};

interface BreakPoints {
  xl?: number;
  lg?: number;
  md?: number;
  smd?: number;
  sm?: number;
  xs?: number;
}

const generateBreakPoints = (callback: (key: keyof BreakPoints) => any) => {
  const keys = Object.keys(breakpoints);
  const medias: { [key: string]: any } = {};
  keys.forEach((key: string) => {
    medias[`@media(max-width: ${breakpoints[key]})`] = callback(key as keyof BreakPoints);
  });

  return medias;
};

const gridItemPercent: any = {
  1: '8.333333%',
  2: '16.666667%',
  3: '25%',
  4: '33.333333%',
  5: '41.666667%',
  6: '50%',
  7: '58.333333%',
  8: '66.666667%',
  9: '75%',
  10: '83.333333%',
  11: '91.666667%',
  12: '100%',
};

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: any;
}

interface ContainerProps extends BaseProps {
  container: true;
  item?: false;
  padding?: BreakPoints;
  spacing?: BreakPoints;
}

interface ItemProps extends BaseProps, BreakPoints {
  item: true;
  container?: false;
}

const ExtraPropsRemover = styled.div(() => ({}));

const ContainerComponent: any = styled.div(
  ({ spacingValues, paddingValues }: { spacingValues: BreakPoints; paddingValues: BreakPoints }) => ({
    width: spacingValues.xl ? `calc(100% + ${spacingValues.xl}px)` : '100%',
    padding: `0 ${paddingValues.xl || 0}px`,
    left: spacingValues.xl ? -spacingValues.xl / 2 : 0,
    [`.${classes.item}`]: {
      padding: `0 ${spacingValues.xl ? (spacingValues.xl as number) / 2 : 0}px`,
    },
    ...generateBreakPoints((breakpoint: keyof BreakPoints) => {
      const styles: CSSProperties = {}; // styles that returned if a variable is available
      if (paddingValues[breakpoint]) {
        styles.padding = `0 ${paddingValues[breakpoint]}px`;
      }
      if (spacingValues[breakpoint]) {
        styles.width = `calc(100% + ${spacingValues[breakpoint]}px)`;
        styles.left = -(spacingValues[breakpoint] as number) / 2;
        (styles as any)[`.${classes.item}`] = {
          padding: `0 ${(spacingValues[breakpoint] as number) / 2}px`,
        };
      }
      return styles;
    }),
  }),
);

const ItemComponent = styled.div((props: BreakPoints) => ({
  flex: `0 0 ${gridItemPercent[props.xl as any]}`,
  maxWidth: gridItemPercent[props.xl as any],
  ...generateBreakPoints((breakpoint: keyof BreakPoints) => {
    const styles: CSSProperties = {};
    if (props[breakpoint]) {
      styles.flex = `0 0 ${gridItemPercent[props[breakpoint] as any]}`;
      styles.maxWidth = gridItemPercent[props[breakpoint] as any];
    }
    return styles;
  }),
}));

type Props = ContainerProps | ItemProps;

const Grid = React.forwardRef(
  (
    { className, children, container, item, ...other }: Props,
    ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined,
  ) => {
    if (container) {
      const { spacing, padding, ...rest } = other as any;
      return (
        <div ref={ref} className={classes.wrapper}>
          <ContainerComponent
            className={classNames(classes.container, className)}
            spacingValues={spacing}
            paddingValues={padding}
            {...rest}
          >
            {children}
          </ContainerComponent>
        </div>
      );
    }

    const { xs, sm, md, lg, xl, smd, spacing, padding, ...rest } = other as any;

    return (
      <ItemComponent ref={ref} className={classNames(classes.item)} xs={xs} xl={xl} md={md} sm={sm} lg={lg} smd={smd}>
        <ExtraPropsRemover {...rest} className={classNames(classes.item_wrapper, className)}>
          {children}
        </ExtraPropsRemover>
      </ItemComponent>
    );
  },
);

Grid.defaultProps = {
  padding: {
    xs: 20,
    sm: 15,
    md: 34,
    smd: 26,
    lg: 64,
    xl: 80,
  },
  spacing: {
    xs: 20,
    sm: 15,
    smd: 16,
    md: 20,
    lg: 16,
    xl: 20,
  },
  xl: 1,
};

export default Grid;
