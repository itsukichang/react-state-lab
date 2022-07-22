import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

SyntaxHighlighter.registerLanguage('tsx', tsx);

export const CodeBlock = ({ inline, className, children }: any) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';

  return (
    <SyntaxHighlighter
      style={atomDark}
      language={lang}
      className="codeStyle"
      showLineNumbers={true}
      wrapLines={true}
      children={String(children).replace(/\n$/, '')}
    />
  );
};
