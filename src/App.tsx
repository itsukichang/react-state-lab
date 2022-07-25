import { css } from '@emotion/css';
import { Routes, Route, Link } from 'react-router-dom';
import { UseContextApp } from './pages/context';
import { UseMobxApp } from './pages/mobx';
import { UseValtioApp } from './pages/valtio';
import { gutter } from './utils/Style';

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="mobx">mobx</Link>
        </li>
        <li>
          <Link to="context">context API</Link>
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
        <Route path="valtio/" element={<UseValtioApp />} />
      </Routes>
    </div>
  );
};

const styleBase = css`
  margin: ${gutter(2)};
`;
