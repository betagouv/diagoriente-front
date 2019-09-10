import React, { ComponentType, forwardRef } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'reducers';
import { showTuto, tutoShowed as tutoShowedBase } from 'utils/localStorage';

export interface TutoFns {
  showTuto: (index: number) => boolean;
  tutoShowed: (index: number) => void;
}

function mapStateToProps(state: ReduxState) {
  return {
    userId: state.authUser.user.user ? state.authUser.user.user._id : null,
  };
}

function tutoWrapper<P extends TutoFns>(
  WrappedComponent: ComponentType<P>,
): ComponentType<Omit<P, keyof TutoFns>> {
  return (connect as any)(mapStateToProps, null, null, { forwardRef: true })(
    forwardRef(({ userId, ...props }: any, ref: any) => {
      const tutoShowed = tutoShowedBase(userId);
      return <WrappedComponent ref={ref} {...props} showTuto={showTuto} tutoShowed={tutoShowed} />;
    }),
  );
}

export default tutoWrapper;
