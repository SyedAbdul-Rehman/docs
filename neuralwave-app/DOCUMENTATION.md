# NeuralWave AI - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [CSS Custom Properties](#css-custom-properties)
3. [Component Breakdown](#component-breakdown)
4. [Performance Optimizations](#performance-optimizations)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [Browser Testing](#browser-testing)

## Architecture Overview

### Technology Stack
- **Vite**: Modern build tool with fast HMR and optimized production builds
- **Three.js**: 3D graphics rendering engine
- **GSAP**: Professional animation library with ScrollTrigger
- **Lenis**: Smooth scrolling library
- **Stats.js**: FPS monitoring utility

### File Structure
```
src/
├── js/
│   ├── main.js              # Application entry point and orchestration
│   ├── neuralNetwork.js     # 3D neural network visualization logic
│   ├── floatingShapes.js    # Parallax geometric shapes
│   ├── customCursor.js      # Custom cursor implementation
│   └── loadingScreen.js     # Loading screen with animated counter
└── styles/
    └── main.css             # Complete styling with custom properties
```

## CSS Custom Properties

All theme colors and design tokens are centralized using CSS custom properties for easy maintenance and theming:

### Color Palette
```css
--color-cyan: #00D9FF        /* Primary accent color */
--color-magenta: #FF006E     /* Secondary accent color */
--color-purple: #8338EC      /* Tertiary accent color */
--color-dark-bg: #0a0a0f     /* Main background */
--color-dark-surface: #141420 /* Surface elements */
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-purple) 50%, var(--color-magenta) 100%)
--gradient-glow: radial-gradient(circle, var(--color-cyan) 0%, transparent 70%)
```

### Spacing System
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 2rem     /* 32px */
--spacing-lg: 4rem     /* 64px */
--spacing-xl: 6rem     /* 96px */
```

### Typography Scale
```css
--font-size-xs: 0.875rem   /* 14px */
--font-size-sm: 1rem       /* 16px */
--font-size-md: 1.25rem    /* 20px */
--font-size-lg: 2rem       /* 32px */
--font-size-xl: 3rem       /* 48px */
--font-size-2xl: 4rem      /* 64px */
--font-size-3xl: 5rem      /* 80px */
```

## Component Breakdown

### 1. Loading Screen (`loadingScreen.js`)
**Purpose**: Provide visual feedback during initial asset loading

**Features**:
- Animated percentage counter (0-100%)
- SVG neural network logo animation
- Simulated progressive loading
- Smooth fade-out transition

**Implementation Details**:
```javascript
// Simulates realistic loading progression
simulateLoading() {
  - Random incremental progress up to 90%
  - Final push to 100% when assets ready
  - GSAP animations for smooth transitions
}
```

### 2. Neural Network (`neuralNetwork.js`)
**Purpose**: Create an interactive 3D neural network visualization

**Features**:
- 30-80 nodes (adaptive based on device performance)
- Dynamic connections between nearby nodes
- Floating animation with sine wave motion
- Pulsing effects and color cycling
- Proper memory management and disposal

**Key Parameters**:
```javascript
nodeCount: 30 (mobile) - 80 (desktop)
connectionDistance: < 3 units
animationSpeed: 0.0005
```

**Performance Optimizations**:
- Geometry instancing where possible
- Limited connection count based on distance
- Efficient buffer attribute updates
- Adaptive particle count based on device

### 3. Floating Shapes (`floatingShapes.js`)
**Purpose**: Add depth and parallax with 3D geometric shapes

**Features**:
- 5-10 shapes (adaptive based on device)
- Multiple geometry types (cube, tetrahedron, octahedron, torus, cone)
- Mouse parallax effect
- Floating animation
- Random wireframe/solid rendering

**Parallax Implementation**:
```javascript
// Smooth parallax following mouse position
shape.position.x += (mouse.x * parallaxStrength - shape.position.x * 0.01) * 0.05
```

### 4. Custom Cursor (`customCursor.js`)
**Purpose**: Enhance user experience with interactive cursor

**States**:
- **Default**: Standard cursor with dot and outline
- **Pointer**: Enlarged outline when hovering interactive elements
- **Grab**: Changed color when hovering canvas

**Features**:
- Smooth lerp motion (15% interpolation)
- Automatic detection of mouse input devices
- Mix-blend-mode for visibility on all backgrounds
- Disabled on touch devices

### 5. Main Application (`main.js`)
**Purpose**: Orchestrate all components and manage application lifecycle

**Responsibilities**:
- Scene initialization
- Component coordination
- Event handling
- Animation loop management
- Performance monitoring
- Memory cleanup

**Camera Parallax**:
```javascript
// Subtle camera movement following mouse
camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05
```

## Performance Optimizations

### Three.js Optimizations

1. **Adaptive Quality**
   - Node count scales based on device (30-80)
   - Shape count adjusts (5-10)
   - Pixel ratio capped at 2

2. **Efficient Rendering**
   - `powerPreference: 'high-performance'`
   - Geometry reuse where possible
   - Proper disposal of resources
   - Scene fog to reduce far objects

3. **Memory Management**
   ```javascript
   dispose() {
     // Clean up geometries
     geometry.dispose()
     // Clean up materials
     material.dispose()
     // Remove from scene
     scene.remove(object)
   }
   ```

### Animation Optimizations

1. **RequestAnimationFrame**
   - Single RAF loop for all animations
   - Paused when tab not visible

2. **GSAP Configuration**
   ```javascript
   gsap.ticker.lagSmoothing(0)  // Prevent catch-up frames
   ```

3. **Smooth Scrolling**
   - Lenis with optimized easing
   - Integrated with ScrollTrigger

### Performance Targets

| Device Type | Resolution | Target FPS | Node Count | Shape Count |
|------------|------------|------------|------------|-------------|
| Desktop    | 1920px+    | 60 FPS     | 80         | 10          |
| Tablet     | 768px      | 60 FPS     | 50         | 8           |
| Mobile     | 375px      | 45+ FPS    | 30         | 5           |

## Responsive Design

### Breakpoints
```css
/* Mobile: 375px - 767px */
@media (max-width: 767px)

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px)

/* Desktop: 1200px - 1919px */
Default styles

/* Large Desktop: 1920px+ */
@media (min-width: 1920px)
```

### Mobile-Specific Adjustments

1. **Typography**
   - Hero title: 5rem → 2.5rem
   - Button: 1.25rem → 1rem

2. **Layout**
   - Reduced padding in glass panel
   - Smaller spacing values

3. **Performance**
   - Custom cursor disabled
   - Reduced particle count
   - Simplified animations

4. **Touch Interactions**
   - Standard cursor restored
   - Touch-friendly button sizes

## Accessibility

### Semantic HTML
- `<section role="banner">` for hero
- `<button>` elements for interactive elements
- Proper heading hierarchy

### ARIA Labels
```html
<div role="status" aria-live="polite">  <!-- Loading screen -->
<button aria-label="Get started with NeuralWave AI">
<div aria-label="Loading progress">
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states properly styled
- Tab order follows logical flow

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Visual Accessibility
- High contrast text (white on dark)
- Large touch targets (48px minimum)
- Clear focus indicators
- No reliance on color alone

## Browser Testing

### Tested Browsers
✅ Chrome (latest) - Full support
✅ Firefox (latest) - Full support
✅ Safari (latest) - Full support with -webkit- prefixes
✅ Edge (latest) - Full support

### Known Compatibility

1. **Three.js**
   - Requires WebGL support
   - Graceful degradation for older browsers

2. **CSS Features**
   - Backdrop-filter (glassmorphism)
   - Custom properties (full support)
   - CSS Grid/Flexbox

3. **JavaScript Features**
   - ES6 modules
   - Async/await
   - RequestAnimationFrame

### Fallbacks

1. **No WebGL**
   - Background gradient still visible
   - Text content fully accessible

2. **Touch Devices**
   - Custom cursor automatically disabled
   - Standard cursor restored
   - Touch events work normally

3. **Older Browsers**
   - Vite build targets modern browsers
   - Can adjust in vite.config.js if needed

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Tools

### FPS Monitor
- Press **'F'** key to toggle
- Shows real-time FPS
- Useful for performance debugging

### Browser DevTools
- Monitor GPU usage in Performance tab
- Check memory usage in Memory tab
- Profile with Performance recorder

## Deployment

The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## Future Enhancements

Potential improvements for future versions:
1. Add WebGL fallback canvas
2. Implement progressive enhancement
3. Add more interactive elements
4. Create additional sections with scroll animations
5. Add particle system effects
6. Implement data-driven neural network
7. Add sound design
8. Create admin panel for customization
