import { css, injectGlobal } from '@emotion/css';

export function gutter(value: number): string {
  return `${8 * value}px`;
}

export function square(value: string | number) {
  const side = typeof value === 'number' ? `${value}px` : value;

  return css`
    width: ${side};
    height: ${side};
  `;
}

export function injectGlobalStyle() {
  injectGlobal`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
  `;
}
