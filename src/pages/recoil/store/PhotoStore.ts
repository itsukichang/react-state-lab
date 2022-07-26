import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const photos = atom<Photo[]>({
  key: 'photos',
  default: [],
});

export const usePhoto = () => {
  return {
    photos: useRecoilValue(photos),
  };
};

export const useUpdatePhoto = () => {
  return {
    fetch: useRecoilCallback(({ set }) => () => {
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then((res) => res.json())
        .then((items) => {
          console.log(items);
          set(photos, items);
        });
    }),
  };
};
