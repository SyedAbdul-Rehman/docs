# NeuralWave AI - Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
cd neuralwave-app
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

Production files will be in the `dist/` directory.

## What You'll See

### Loading Screen
- Animated neural network logo
- Percentage counter from 0-100%
- Smooth transition to hero section

### Hero Section
- **3D Neural Network**: Rotating particle network with dynamic connections
- **Floating Shapes**: Geometric shapes with parallax mouse tracking
- **Animated Text**: Staggered word reveal animation
- **Gradient Background**: Color-shifting gradient (cyan → purple → magenta)
- **CTA Button**: Glowing button with magnetic hover effect
- **Custom Cursor**: Interactive cursor that changes on hover

## Development Tips

### Toggle FPS Monitor
Press the **'F'** key to show/hide the FPS monitor in the top-right corner.

### Customize Colors
Edit the CSS custom properties in `src/styles/main.css`:
```css
:root {
  --color-cyan: #00D9FF;
  --color-magenta: #FF006E;
  --color-purple: #8338EC;
}
```

### Adjust Performance
In `src/js/neuralNetwork.js`, modify the node count:
```javascript
getNodeCount() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return 30;  // Lower for mobile
  return 80;                // Higher for desktop
}
```

## Testing Checklist

- [ ] Loading screen animates from 0-100%
- [ ] Hero section loads with 3D neural network
- [ ] Text reveals with staggered animation
- [ ] CTA button has magnetic hover effect
- [ ] Custom cursor follows mouse smoothly
- [ ] FPS stays above 45 on target device
- [ ] Responsive at 375px, 768px, 1920px breakpoints
- [ ] Works in Chrome, Firefox, Safari, Edge

## Troubleshooting

### Build Fails
Ensure you're using Node.js version 16 or higher:
```bash
node --version
```

### Low FPS
1. Press 'F' to check FPS
2. Reduce node count in `neuralNetwork.js`
3. Reduce shape count in `floatingShapes.js`

### Custom Cursor Not Working
The custom cursor is automatically disabled on touch devices. Use a device with a mouse for the full experience.

## Next Steps

1. **Customize Content**: Edit `index.html` to change text
2. **Add Sections**: Create additional sections below hero
3. **Implement Scroll Animations**: Use GSAP ScrollTrigger for more effects
4. **Connect CTA**: Add event listener to "Get Started" button
5. **Deploy**: Upload `dist/` folder to your hosting service

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues or questions:
1. Check the [DOCUMENTATION.md](./DOCUMENTATION.md) for technical details
2. Review the inline code comments
3. Test in different browsers
4. Check browser console for errors
