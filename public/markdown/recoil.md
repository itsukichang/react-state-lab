## recoil Store

### app.tsx

```tsx
import { useCounter, useUpdateCounter } from './store/CounterStore';
import { usePhoto, useUpdatePhoto } from './store/PhotoStore';

export const RecoilApp = () => {
  const { counter } = useCounter();
  const { increment, decrement } = useUpdateCounter();
  const { photos } = usePhoto();
  const { fetch } = useUpdatePhoto();
  return <div>...</div>;
};
```

### CounterStore

```tsx
import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

// atomやselectorはコンポーネントから直接参照しないように
// useXX, useYYな感じで参照と更新のhooksを分けて提供してみる

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
```

### PhotoStore

```tsx
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
```

### Store Provider

```tsx
<RecoilRoot>
  <RecoilApp />
</RecoilRoot>
```
