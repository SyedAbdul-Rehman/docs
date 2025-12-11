# NeuralWave AI - Hero Section

A stunning single-page application featuring an interactive 3D neural network visualization built with Three.js, GSAP animations, and smooth scrolling.

## Features

### 3D Visualization
- **Neural Network**: Real-time 3D neural network with 30-80 nodes (adaptive based on device)
- **Connected Particles**: Dynamic connections between nodes with pulsing effects
- **Floating Shapes**: Parallax 3D geometric shapes responding to mouse movement
- **Responsive Performance**: Optimized for 60fps across devices

### Animations
- **Text Reveal**: Staggered word appearances using GSAP
- **Gradient Background**: Dynamic color shifts (cyan → magenta → purple)
- **Loading Screen**: Animated percentage counter (0-100%)
- **Magnetic CTA**: Glowing button with hover attraction effect

### Technical Features
- **Smooth Scrolling**: Lenis integration for buttery-smooth scrolling
- **Custom Cursor**: Changes between default, pointer, and grab states
- **FPS Monitor**: Toggleable development utility (press 'F' key)
- **Responsive Design**: Mobile-first approach with breakpoints at 375px, 768px, 1920px
- **Performance Optimized**: RequestAnimationFrame, proper memory management

## CSS Custom Properties

The project uses CSS custom properties for easy theming:

```css
--color-cyan: #00D9FF
--color-magenta: #FF006E
--color-purple: #8338EC
--color-dark-bg: #0a0a0f
--color-dark-surface: #141420
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Development Tools

- Press **'F'** key to toggle FPS monitor
- Custom cursor automatically disabled on touch devices
- Reduced motion support for accessibility

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
neuralwave-app/
├── src/
│   ├── js/
│   │   ├── main.js              # Main application entry
│   │   ├── neuralNetwork.js     # 3D neural network visualization
│   │   ├── floatingShapes.js    # Parallax floating shapes
│   │   ├── customCursor.js      # Custom cursor implementation
│   │   └── loadingScreen.js     # Loading screen with counter
│   └── styles/
│       └── main.css              # Main stylesheet with custom properties
├── public/                       # Static assets
├── index.html                    # Main HTML file
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies and scripts
```

## Technologies

- **Three.js** (v0.160.0) - 3D rendering engine
- **GSAP** (v3.12.5) - Animation library
- **Lenis** (v1.0.42) - Smooth scrolling
- **Stats.js** (v0.17.0) - FPS monitor
- **Vite** (v5.0.0) - Build tool and dev server

## Performance Benchmarks

Target performance metrics:
- **60 FPS** on desktop (1920px)
- **60 FPS** on tablet (768px)
- **45+ FPS** on mobile (375px)

Optimizations:
- Adaptive particle count based on device
- Efficient geometry reuse
- Proper disposal of Three.js resources
- RequestAnimationFrame for smooth animations
- Pixel ratio capped at 2 for high DPI displays

## Browser Support

Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Reduced motion support
- Keyboard navigation
- Custom cursor disabled on touch devices

## License

ISC
