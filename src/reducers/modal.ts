import { AnyAction } from 'redux';
import { IModal } from 'reducers';
import createRedux from '../utils/createRedux';

const INITIAL_STATE: IModal = {
  open: false,
  children: null,
  animationType: 'slide_bottom',
};

const openModal = (state: IModal, { children, animationType }: AnyAction): IModal => ({
  ...state,
  children,
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
