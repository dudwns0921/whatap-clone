# elio-charts

Canvas-based monitoring chart library for React applications.

## Features

- 🎨 Pure Canvas API (no SVG, no third-party chart libraries)
- ⚡️ High performance with requestAnimationFrame
- 📱 Responsive with ResizeObserver
- 🎯 TypeScript strict mode
- 🖥️ Retina display support (devicePixelRatio)

## Installation

```bash
npm install elio-charts
```

## Usage

```tsx
import { LineChart } from 'elio-charts';

function App() {
  const data = [
    {
      label: 'CPU Usage',
      data: [
        { time: '10:00', value: 45 },
        { time: '10:01', value: 52 },
        { time: '10:02', value: 48 },
      ],
      color: '#00d4ff',
    },
  ];

  return <LineChart data={data} options={{ width: 800, height: 400 }} />;
}
```

## Roadmap

- Phase 1: Basic LineChart with axes and tooltips
- Phase 2: Interactions (zoom, pan, hover)
- Phase 3: More chart types (Area, Bar, Gauge, Heatmap)
- Phase 4: Storybook documentation

## License

MIT
