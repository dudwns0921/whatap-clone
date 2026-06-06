import React from 'react';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    Story => React.createElement('div', { style: { height: 400, display: 'flex', flexDirection: 'column' } },
      React.createElement(Story)
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f1117' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
