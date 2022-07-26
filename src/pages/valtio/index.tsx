import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '../../components/CodeBlock';

import { ValtioApp } from './App';
import { CounterStoreContext, createCounterStore } from './store/CounterStore';
import { PhotoStoreContext, createPhotoStore } from './store/PhotoStore';

export const UseValtioApp = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch('markdown/valtio.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  const counterStore = createCounterStore();
  const photoStore = createPhotoStore();

  return (
    <>
      <h1 className={styleTitle}>use recoil app</h1>
      <div className={styleBase}>
        <div className={styleApp}>
          <PhotoStoreContext.Provider value={photoStore}>
            <CounterStoreContext.Provider value={counterStore}>
              <ValtioApp />
            </CounterStoreContext.Provider>
          </PhotoStoreContext.Provider>
        </div>
        <div className={styleCode}>
          <ReactMarkdown
            children={content}
            components={{
              code: CodeBlock,
            }}
          />
        </div>
      </div>
    </>
  );
};

const styleTitle = css`
  margin: 0;
  font-size: 18px;
`;

const styleBase = css`
  display: flex;
`;

const styleApp = css`
  width: 50%;
`;

const styleCode = css`
  width: 50%;
`;
