import { css } from '@emotion/css';
import { CounterContextProvider } from './store/Counter';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../../components/CodeBlock';

import React, { useEffect, useState } from 'react';
import { ContextApp } from './App';
import { PhotoContextProvider } from './store/Photo';

export const UseContextApp = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch('markdown/context.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <>
      <h1 className={styleTitle}>use react-context app</h1>
      <div className={styleBase}>
        <div className={styleApp}>
          <PhotoContextProvider>
            <CounterContextProvider>
              <ContextApp />
            </CounterContextProvider>
          </PhotoContextProvider>
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
