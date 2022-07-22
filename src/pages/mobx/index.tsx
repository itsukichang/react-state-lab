import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../../components/CodeBlock';
import { MobxApp } from './App';
import { StoreProvider } from './store';

export const UseMobxApp = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch('markdown/mobx.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <>
      <h1 className={styleTitle}>use mobx app</h1>
      <div className={styleBase}>
        <div className={styleApp}>
          <StoreProvider>
            <MobxApp />
          </StoreProvider>
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
