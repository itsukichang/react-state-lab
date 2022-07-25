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
