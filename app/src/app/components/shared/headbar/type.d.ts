import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lineargradient': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
