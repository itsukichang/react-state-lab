## Context API Store

### app.tsx

```tsx

 <PhotoContextProvider>
  <CounterContextProvider>
    <ContextApp />
  </CounterContextProvider>
</PhotoContextProvider>

...

import { useCounter } from './store/Counter';
import { usePhoto } from './store/Photo';

export const ContextApp = () => {
  const { counterState, increase, decrease } = useCounter();
  const { photoState, fetchPhotos } = usePhoto();

  return (
    <div>
    ...
    </div>
  )
}
```

### CounterStore

```tsx
/**
 * STATE
 */

export type CounterState = {
  count: number;
};

export const CounterInitialState: CounterState = {
  count: 0,
};

/**
 * ACTION
 */

const INCREMENT_COUNT = 'INCREMENT_COUNT' as const;
const DECREMENT_COUNT = 'DECREMENT_COUNT' as const;

const incrementCount = () => {
  return { type: INCREMENT_COUNT };
};

const decrementCount = () => {
  return { type: DECREMENT_COUNT };
};

export type ActionType =
  | ReturnType<typeof incrementCount>
  | ReturnType<typeof decrementCount>;

export const counterActions = {
  incrementCount,
  decrementCount,
};

/**
 * REDUCER
 */

export const CounterReducer = (
  state: CounterState,
  action: ActionType
): CounterState => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
```

### PhotoStore

```tsx
/**
 * STATE
 */

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type PhotoState = {
  photos: Photo[];
  isLoading: boolean;
};

export const PhotoInitialState: PhotoState = {
  photos: [],
  isLoading: false,
};

/**
 * ACTION
 */

const FETCH_PHOTO = 'FETCH_PHOTO' as const;
const LOAD_START = 'LOAD_START' as const;
const LOAD_COMPLETE = 'LOAD_COMPETE' as const;

const fetchPhoto = (photos: Photo[]) => {
  return { type: FETCH_PHOTO, payload: photos };
};

const startLoading = () => {
  return { type: LOAD_START };
};

const completeLoading = () => {
  return { type: LOAD_COMPLETE };
};

export type ActionType =
  | ReturnType<typeof fetchPhoto>
  | ReturnType<typeof startLoading>
  | ReturnType<typeof completeLoading>;

export const PhotoActions = {
  fetchPhoto,
  startLoading,
  completeLoading,
};

/**
 * REDUCER
 */

export const PhotoReducer = (
  state: PhotoState,
  action: ActionType
): PhotoState => {
  switch (action.type) {
    case FETCH_PHOTO:
      return {
        ...state,
        photos: action.payload,
      };

    case LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
```

### Store Provider

```tsx
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useReducer,
  useContext,
} from 'react';
import {
  ActionType,
  PhotoInitialState,
  PhotoReducer,
  PhotoState,
  PhotoActions,
} from './PhotoStore';

export const PhotoStoreContext = createContext<PhotoState>(PhotoInitialState);
export const PhotoDispatchContext = createContext<Dispatch<ActionType>>(
  () => {}
);

export const PhotoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(PhotoReducer, PhotoInitialState);

  return (
    <PhotoDispatchContext.Provider value={dispatch}>
      <PhotoStoreContext.Provider value={state}>
        {children}
      </PhotoStoreContext.Provider>
    </PhotoDispatchContext.Provider>
  );
};

export const usePhoto = () => {
  const state = useContext(PhotoStoreContext);
  const dispatch = useContext(PhotoDispatchContext);

  const fetchPhotos = useCallback(() => {
    dispatch(PhotoActions.startLoading());
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((photos) => {
        dispatch(PhotoActions.fetchPhoto(photos));
        dispatch(PhotoActions.completeLoading());
      }); // eslint-disable-next-line
  }, []);

  return {
    photoState: state,
    photoDispatch: dispatch,
    fetchPhotos,
  };
};
```
