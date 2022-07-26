## valtio Store

### app.tsx

```tsx
import { useCounterStore, useUpdateCounter } from './store/CounterStore';
import { usePhotoStore, useUpdatePhoto } from './store/PhotoStore';

export const ValtioApp = () => {
  const { count } = useCounterStore();
  const { handleIncrement, handleDecrement } = useUpdateCounter();
  const { photos } = usePhotoStore();
  const { handleFetchPhoto } = useUpdatePhoto();
  return <div>...</div>;
};
```

### CounterStore

```tsx
import { createContext, useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useContext } from '../util';

export type CounterStore = {
  count: number;
};

export function createCounterStore(): CounterStore {
  return proxy({ count: 0 });
}

export const CounterStoreContext = createContext<CounterStore | null>(null);

export function useWritableCounterStore() {
  return useContext(CounterStoreContext);
}

export function useCounterStore() {
  const store = useWritableCounterStore();
  return useSnapshot(store);
}

export function useUpdateCounter() {
  const store = useWritableCounterStore();

  const handleIncrement = useCallback(() => {
    store.count += 1;
  }, [store]);

  const handleDecrement = useCallback(() => {
    store.count -= 1;
  }, [store]);

  return {
    handleIncrement,
    handleDecrement,
  };
}
```

### PhotoStore

```tsx
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
```

### Store Provider

```tsx
const counterStore = createCounterStore();
const photoStore = createPhotoStore();

<PhotoStoreContext.Provider value={photoStore}>
  <CounterStoreContext.Provider value={counterStore}>
    <ValtioApp />
  </CounterStoreContext.Provider>
</PhotoStoreContext.Provider>;
```
