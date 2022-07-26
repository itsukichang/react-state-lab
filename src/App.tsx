import { css } from '@emotion/css';
import { Routes, Route, Link } from 'react-router-dom';
import { UseContextApp } from './pages/context';
import { UseMobxApp } from './pages/mobx';
import { UseRecoilApp } from './pages/recoil';
import { UseValtioApp } from './pages/valtio';
import { gutter } from './utils/Style';

function Home() {
  return (
    <div>
      <a href="https://npmtrends.com/jotai-vs-mobx-vs-recoil-vs-valtio-vs-xstate-vs-zustand">
        npm trends
      </a>
      <table className={styleTable}>
        <tr>
          <td>手法</td>
          <td>Link</td>
          <td>Star数</td>
          <td>Version</td>
          <td>並行開発できそうか</td>
          <td>コンポーネントはピュアか</td>
          <td>再renderingがんばる必要があるか</td>
          <td>コード記述量</td>
          <td>memo</td>
        </tr>
        <tr>
          <td>
            <Link to="context">context API</Link>
          </td>
          <td>
            <a href="https://ja.reactjs.org/docs/context.html">公式ページ</a>
          </td>
          <td>none</td>
          <td>none</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>❌</td>
          <td>❌</td>
          <td>
            ライブラリ依存はなくなるが、再レンダリング問題を解消するために頑張る必要がある。ボイラーテンプレートの量もたくさん
          </td>
        </tr>
        <tr>
          <td>
            <Link to="mobx">mobx</Link>
          </td>
          <td>
            <a href="https://mobx.js.org/README.html">公式ページ</a>
          </td>
          <td>25.5k</td>
          <td>v6.6.1</td>
          <td>🔺</td>
          <td>❌</td>
          <td>🔺</td>
          <td>🔴</td>
          <td>
            v6そのものの書き方は悪くはないが、hooksが消えたのでどうしてもコンポーネントと蜜になる。今後mobxと心中するつもりなら気にしなくていいかもだけど
          </td>
        </tr>
        <tr>
          <td>
            <Link to="recoil">recoil</Link>
          </td>
          <td>
            <a href="https://recoiljs.org/">公式ページ</a>
          </td>
          <td>17.1k</td>
          <td>v0.7.4</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>
            唯一の懸念は正式リリースではないところ。atomやselectorの参照自由度が高すぎる問題はあるが、自前でhooksなどを噛ませるようにすればさほど問題なさそうに思える
          </td>
        </tr>
        <tr>
          <td>
            <Link to="valtio">valtio</Link>
          </td>
          <td>
            <a href="https://github.com/pmndrs/valtio">公式ページ</a>
          </td>
          <td>4.7k</td>
          <td>v1.6.3</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>
            recoilよりさらにシンプルにかけるイメージ。少しマイナーだが最近ちょっと伸びてる
          </td>
        </tr>
        <tr>
          <td>(WIP)Jotai</td>
          <td>
            <a href="https://jotai.org/">公式ページ</a>
          </td>
          <td>8.9k</td>
          <td>v1.7.6</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>🔴</td>
          <td>
            軽量版recoil。割と伸びてる。調査中だがrecoil検討するならこちらも検討して良さそう
          </td>
        </tr>
      </table>

      <ul>
        <li>
          <Link to="mobx">mobx</Link>
        </li>
        <li>
          <Link to="context">context API</Link>
        </li>
        <li>
          <Link to="recoil">recoil</Link>
        </li>
        <li>
          <Link to="valtio">valtio</Link>
        </li>
      </ul>
    </div>
  );
}

export const App = () => {
  return (
    <div className={styleBase}>
      <h1>welcome to state world...</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mobx/" element={<UseMobxApp />} />
        <Route path="context/" element={<UseContextApp />} />
        <Route path="recoil/" element={<UseRecoilApp />} />
        <Route path="valtio/" element={<UseValtioApp />} />
      </Routes>
    </div>
  );
};

const styleBase = css`
  margin: ${gutter(2)};
`;

const styleTable = css`
  border-collapse: collapse;
  padding: 8px;

  > th,
  td {
    border: solid 1px;
    padding: 8px;
  }
`;
