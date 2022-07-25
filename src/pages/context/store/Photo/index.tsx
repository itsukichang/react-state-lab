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
