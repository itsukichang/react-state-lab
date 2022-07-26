import { createContext, useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useContext } from '../util';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type PhotoStore = {
  photos: Photo[];
};

export function createPhotoStore(): PhotoStore {
  return proxy({ photos: [] });
}

export const PhotoStoreContext = createContext<PhotoStore | null>(null);

export function useWritablePhotoStore() {
  return useContext(PhotoStoreContext);
}

export function usePhotoStore() {
  const store = useWritablePhotoStore();
  return useSnapshot(store);
}

export function useUpdatePhoto() {
  const store = useWritablePhotoStore();

  const handleFetchPhoto = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((items) => {
        store.photos = items;
      });
  }, [store]);

  return {
    handleFetchPhoto,
  };
}
