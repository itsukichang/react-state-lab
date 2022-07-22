# いろんな state 管理をためしてみる

- mobx
- context api
- valtio
- recoil
- jotai

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
