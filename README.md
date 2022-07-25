# いろんな state 管理をためしてみる

## npm trends

https://npmtrends.com/Zustand-vs-jotai-vs-mobx-vs-react-redux-vs-recoil-vs-redux-vs-valtio-vs-xstate-vs-zustand

## 比較めも

- mobx

  - ref
    - https://mobx.js.org/README.html
  - pros
    - mutable 操作
    - 分割 store
  - cons
    - コンポーネントで observe するために hoc する必要がある
    - v4 -> v6 のような破壊的変更がきになる

- context api
- valtio
- recoil

  - ref

    - https://recoiljs.org/
    - https://nulab.com/ja/blog/nulab/recoil-example/
    - https://engineering.linecorp.com/ja/blog/line-sec-frontend-using-recoil-to-get-a-safe-and-comfortable-state-management/
    - https://zenn.dev/nekoniki/scraps/e2ad516d7da7d3

  - ## pros
    - hooks から状態を subscribe できるためコンポーネントへの影響なし
  - cons
    - 設計でカバーできるが、直接 atom をいじれてしまう危険性

- jotai
  - ref
    - https://zenn.dev/kkeeth/articles/studying-jotai-library
  - pros
    - 軽い
- xstate

  - redux みたい

- Zustand
  - valtio みたい

## メモなど

### 数々の状態管理 lib かの中でも好ましい条件

- mutable に扱える
  - もはや mobx に慣れてしまった...
- ボイラーテンプレート少なめ
  - redux, contextAPI の reducer みたいな煩雑さは出来れば避けたい

### 再度 store 設計が変化することを見越すために必要な要件

- component はプレーンにしたい
  - observer などで wrap したくない
  - 謎の JSX エレメントで wrap したくない
