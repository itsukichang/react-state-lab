import { useCounter } from './store/Counter';
import { usePhoto } from './store/Photo';

export const ContextApp = () => {
  const { counterState, increase, decrease } = useCounter();
  const { photoState, fetchPhotos } = usePhoto();
  return (
    <div>
      <h2>Counter</h2>
      <div>{counterState.count}</div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <hr />
      <h2>Photo API Fetch</h2>
      <button onClick={fetchPhotos}>fetch</button>
      <div>
        {photoState.isLoading ? (
          <p>loading...</p>
        ) : (
          photoState.photos.map((photo) => (
            <div key={photo.id}>
              <p>{photo.title}</p>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
