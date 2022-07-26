import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { RecoilRoot } from 'recoil';
import { CodeBlock } from '../../components/CodeBlock';
import { RecoilApp } from './App';

export const UseRecoilApp = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch('markdown/recoil.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <>
      <h1 className={styleTitle}>use recoil app</h1>
      <div className={styleBase}>
        <div className={styleApp}>
          <RecoilRoot>
            <RecoilApp />
          </RecoilRoot>
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
