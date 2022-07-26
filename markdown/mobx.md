## Mobx Store

### app.tsx

```tsx
import { observer } from 'mobx-react';
import { useStore } from './store';

export const MobxApp = observer(() => {
  const { counterStore, photoStore } = useStore();

  return (
    <div>
    ...
    </div>
  )
}
```

### CounterStore

```tsx
import { action, makeObservable, observable } from 'mobx';

export class CounterStore {
  public count: number = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increase: action,
      decrease: action,
    });
  }

  increase = () => {
    this.count += 1;
  };

  decrease = () => {
    this.count -= 1;
  };
}

export default new CounterStore();
```

### PhotoStore

```tsx
import { makeObservable, observable } from 'mobx';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class PhotoStore {
  photos: Photo[] = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      photos: observable,
      isLoading: observable,
    });
  }

  fetchPhotos = () => {
    this.isLoading = true;
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((photos) => {
        this.photos = photos;
        this.isLoading = false;
      });
  };
}

export default new PhotoStore();
```

### Store Provider

```tsx
import { useLocalObservable } from 'mobx-react';
import { createContext, ReactNode, useContext } from 'react';
import counterStore, { CounterStore } from './CounterStore';
import photoStore, { PhotoStore } from './PhotoStore';

type GlobalStore = {
  counterStore: CounterStore;
  photoStore: PhotoStore;
};

const globalStore: GlobalStore = {
  counterStore,
  photoStore,
};

const storeContext = createContext<GlobalStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useLocalObservable(() => globalStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
```
