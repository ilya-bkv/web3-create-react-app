interface Window {
  ethereum: any; // 👈️ turn off type checking
}
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
    > & { title?: string }>;

  const src: string;
  export default src;
}

