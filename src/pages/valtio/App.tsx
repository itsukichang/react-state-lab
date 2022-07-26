import { useCounterStore, useUpdateCounter } from './store/CounterStore';
import { usePhotoStore, useUpdatePhoto } from './store/PhotoStore';

export const ValtioApp = () => {
  const { count } = useCounterStore();
  const { handleIncrement, handleDecrement } = useUpdateCounter();
  const { photos } = usePhotoStore();
  const { handleFetchPhoto } = useUpdatePhoto();
  return (
    <div>
      <h2>Counter</h2>
      <div>{count}</div>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <hr />
      <h2>Photo API Fetch</h2>
      <button onClick={handleFetchPhoto}>fetch</button>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <p>{photo.title}</p>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
