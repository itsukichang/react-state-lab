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
