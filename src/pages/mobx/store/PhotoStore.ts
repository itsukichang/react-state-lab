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
