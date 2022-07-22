import { observer } from 'mobx-react';
import { useStore } from './store';

export const MobxApp = observer(() => {
  const { counterStore, photoStore } = useStore();

  return (
    <div>
      <h2>Counter</h2>
      <div>{counterStore.count}</div>
      <button onClick={counterStore.increase}>+</button>
      <button onClick={counterStore.decrease}>-</button>
      <hr />
      <h2>Photo API Fetch</h2>
      <button onClick={photoStore.fetchPhotos}>fetch</button>
      <div>
        {photoStore.isLoading ? (
          <p>loading...</p>
        ) : (
          photoStore.photos.map((photo) => (
            <div key={photo.id}>
              <p>{photo.title}</p>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
});
