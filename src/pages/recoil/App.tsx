import { useCounter, useUpdateCounter } from './store/CounterStore';
import { usePhoto, useUpdatePhoto } from './store/PhotoStore';

export const RecoilApp = () => {
  const { counter } = useCounter();
  const { increment, decrement } = useUpdateCounter();
  const { photos } = usePhoto();
  const { fetch } = useUpdatePhoto();
  return (
    <div>
      <h2>Counter</h2>
      <div>{counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <hr />
      <h2>Photo API Fetch</h2>
      <button onClick={fetch}>fetch</button>
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
