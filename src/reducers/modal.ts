import createRedux from '../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { IModal } from 'reducers';

const INITIAL_STATE: IModal = {
  open: false,
  children: null,
  animationType: 'slide_bottom',
  backdropClassName: undefined,
};

const openModal = (state: IModal, { children, animationType, backdropClassName }: AnyAction): IModal => ({
  ...state,
  children,
  backdropClassName,
  open: true,
  animationType: animationType || 'slide_bottom',
});
const closeModal = (state: IModal) => ({ ...state, open: false });

const { actions, types: modalTypes, reducer } = createRedux(INITIAL_STATE, {
  openModal,
  closeModal,
});

export default actions;

export { reducer, modalTypes };
