import TYPES from './types';

const initialState = {
  counter: 5,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.inc:
      return { ...state, counter: state.counter + 1 };
    case TYPES.dec:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
