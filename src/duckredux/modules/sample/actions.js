import TYPES from './types';

export function incrementCounter() {
  return {
    type: TYPES.inc,
  };
}

export function decrementCounter() {
  return {
    type: TYPES.dec,
  };
}
