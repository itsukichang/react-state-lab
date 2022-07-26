import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

const counter = atom({
  key: 'countState',
  default: 0,
});

export const useCounter = () => {
  return {
    counter: useRecoilValue(counter),
  };
};

export const useUpdateCounter = () => {
  return {
    increment: useRecoilCallback(
      ({ set }) =>
        () => {
          set(counter, (prev) => prev + 1);
        },
      []
    ),
    decrement: useRecoilCallback(
      ({ set }) =>
        () => {
          set(counter, (prev) => prev - 1);
        },
      []
    ),
  };
};
