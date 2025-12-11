# NeuralWave AI - Implementation Guide

## For Developers Who Want to Customize or Extend

This guide explains how the code works and how to customize it for your needs.

## Table of Contents
1. [Quick Customizations](#quick-customizations)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [Customizing Components](#customizing-components)
4. [Adding New Features](#adding-new-features)
5. [Performance Tuning](#performance-tuning)
6. [Common Modifications](#common-modifications)

---

## Quick Customizations

### Change Colors
Edit `/src/styles/main.css`:
```css
:root {
  --color-cyan: #00D9FF;      /* Change to your primary color */
  --color-magenta: #FF006E;   /* Change to your secondary color */
  --color-purple: #8338EC;    /* Change to your tertiary color */
}
```

### Change Text Content
Edit `/index.html`:
```html
<h1 class="hero-title">
  <span class="word">Your</span>
  <span class="word">Company</span>
  <span class="word">Name</span>
</h1>
```

### Adjust Particle Count
Edit `/src/js/neuralNetwork.js`:
```javascript
getNodeCount() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return 30;  // Change this
  return 80;                // And this
}
```

### Change Animation Speed
Edit `/src/js/neuralNetwork.js`:
```javascript
this.animationSpeed = 0.0005;  // Lower = slower, Higher = faster
```

---

## Understanding the Architecture

### Application Flow

1. **Page Load** → `main.js` initializes
2. **Loading Screen** → Shows while assets load
3. **Three.js Setup** → Scene, camera, renderer created
4. **Component Init** → Neural network, shapes, cursor created
5. **Animation Loop** → 60fps render loop starts
6. **User Interaction** → Mouse/scroll events handled

### Component Hierarchy

```
NeuralWaveApp (main.js)
├── LoadingScreen (loadingScreen.js)
├── Three.js Scene
│   ├── NeuralNetwork (neuralNetwork.js)
│   └── FloatingShapes (floatingShapes.js)
├── CustomCursor (customCursor.js)
├── Lenis (smooth scrolling)
└── GSAP Animations
```

### Data Flow

```
User Input → Event Listeners → Component Updates → Render
```

---

## Customizing Components

### 1. Neural Network (neuralNetwork.js)

#### Change Node Appearance
```javascript
createNodes() {
  // Change sphere size
  const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  
  // Change material properties
  const material = new THREE.MeshPhongMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.5,  // Adjust glow intensity
    transparent: true,
    opacity: 0.8              // Adjust transparency
  });
}
```

#### Change Connection Logic
```javascript
createConnections() {
  // Adjust connection distance
  if (distance < 3) {  // Change this value
    // Create connection
  }
}
```

#### Add Pulsing Effect
```javascript
update() {
  // Modify pulsing pattern
  const scale = 1 + Math.sin(time * 2 + phase) * 0.2;
  // Change multiplier (2) for speed
  // Change amplitude (0.2) for size
}
```

### 2. Floating Shapes (floatingShapes.js)

#### Add Custom Geometries
```javascript
createShapes() {
  const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.IcosahedronGeometry(0.4, 0),  // Add this
    new THREE.DodecahedronGeometry(0.4, 0), // Or this
  ];
}
```

#### Adjust Parallax Strength
```javascript
update(mouse) {
  // Modify parallax effect
  shape.position.x += (mouse.x * parallaxStrength - shape.position.x * 0.01) * 0.05;
  // Change 0.05 to adjust responsiveness
}
```

### 3. Custom Cursor (customCursor.js)

#### Change Cursor Appearance
Edit `/src/styles/main.css`:
```css
.cursor-dot {
  width: 8px;       /* Change size */
  height: 8px;
  background-color: var(--color-cyan);  /* Change color */
}

.cursor-outline {
  width: 40px;      /* Change size */
  height: 40px;
  border: 2px solid var(--color-cyan);  /* Change border */
}
```

#### Add New Cursor States
```javascript
// In customCursor.js
addEventListeners() {
  document.querySelectorAll('.your-class').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      this.cursor.classList.add('your-state');
    });
  });
}
```

### 4. Loading Screen (loadingScreen.js)

#### Change Loading Duration
```javascript
async start() {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.targetProgress = 100;
      resolve();
    }, 2000);  // Change this value (milliseconds)
  });
}
```

#### Customize Progress Animation
```javascript
simulateLoading() {
  // Modify increment speed
  this.progress += (this.targetProgress - this.progress) * 0.1;
  // Change 0.1 to adjust smoothness
}
```

---

## Adding New Features

### Add Click Interactions to Nodes

1. **Setup Raycasting** (in `main.js`):
```javascript
initThree() {
  // Add raycaster
  this.raycaster = new THREE.Raycaster();
}
```

2. **Add Click Handler**:
```javascript
addEventListeners() {
  this.renderer.domElement.addEventListener('click', (e) => {
    // Convert mouse position to normalized coordinates
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    
    // Check intersection
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.neuralNetwork.nodes);
    
    if (intersects.length > 0) {
      const node = intersects[0].object;
      // Do something with clicked node
      console.log('Node clicked!', node);
    }
  });
}
```

### Add More GSAP Animations

```javascript
// In main.js initAnimations()
ScrollTrigger.create({
  trigger: '.hero-section',
  start: 'top top',
  end: 'bottom top',
  onUpdate: (self) => {
    // Animate based on scroll progress
    this.neuralNetwork.nodes.forEach((node) => {
      node.rotation.y = self.progress * Math.PI;
    });
  }
});
```

### Add Sound Effects

1. **Install Howler.js**:
```bash
npm install howler
```

2. **Add to main.js**:
```javascript
import { Howl } from 'howler';

class NeuralWaveApp {
  initSound() {
    this.sound = new Howl({
      src: ['/sounds/ambient.mp3'],
      loop: true,
      volume: 0.3
    });
  }
  
  playSound() {
    this.sound.play();
  }
}
```

### Add Additional Sections

1. **Add HTML**:
```html
<!-- In index.html after hero section -->
<section class="features-section">
  <h2>Features</h2>
  <!-- Your content -->
</section>
```

2. **Add Scroll Animations**:
```javascript
// In main.js
initAnimations() {
  gsap.from('.features-section', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true
    },
    opacity: 0,
    y: 100
  });
}
```

---

## Performance Tuning

### Reduce Particle Count Automatically

```javascript
// In neuralNetwork.js
getNodeCount() {
  // Check FPS and adjust
  const currentFPS = 1000 / deltaTime;
  
  if (currentFPS < 30) {
    return Math.max(20, this.nodeCount - 10);
  }
  return this.nodeCount;
}
```

### Implement LOD (Level of Detail)

```javascript
update() {
  const distance = this.camera.position.distanceTo(node.position);
  
  // Reduce detail for far objects
  if (distance > 20) {
    node.visible = false;
  } else {
    node.visible = true;
  }
}
```

### Throttle Updates

```javascript
// In main.js
animate() {
  // Only update every Nth frame
  if (this.frameCount % 2 === 0) {
    this.floatingShapes.update(this.mouse);
  }
  this.frameCount++;
}
```

---

## Common Modifications

### Make Neural Network Data-Driven

```javascript
// In neuralNetwork.js
loadData(data) {
  // data = { nodes: [...], connections: [...] }
  
  data.nodes.forEach((nodeData) => {
    const node = this.createNode();
    node.position.set(
      nodeData.x,
      nodeData.y,
      nodeData.z
    );
    node.userData.id = nodeData.id;
  });
  
  data.connections.forEach((conn) => {
    this.createConnection(
      this.getNodeById(conn.from),
      this.getNodeById(conn.to)
    );
  });
}
```

### Add Theme Switcher

```javascript
// In main.js
toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    root.setAttribute('data-theme', 'light');
    root.style.setProperty('--color-cyan', '#0077FF');
    root.style.setProperty('--color-dark-bg', '#FFFFFF');
  } else {
    root.setAttribute('data-theme', 'dark');
    root.style.setProperty('--color-cyan', '#00D9FF');
    root.style.setProperty('--color-dark-bg', '#0a0a0f');
  }
}
```

### Make Responsive to Audio

```javascript
initAudio() {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  
  // Connect to audio source
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
    });
}

updateWithAudio() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  
  // Use audio data to scale nodes
  this.nodes.forEach((node, i) => {
    const scale = 1 + (dataArray[i] / 255) * 0.5;
    node.scale.set(scale, scale, scale);
  });
}
```

### Add Particle Trails

```javascript
// In main.js
createTrail(position) {
  const geometry = new THREE.SphereGeometry(0.05, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00D9FF,
    transparent: true,
    opacity: 1
  });
  
  const particle = new THREE.Mesh(geometry, material);
  particle.position.copy(position);
  this.scene.add(particle);
  
  // Fade out and remove
  gsap.to(particle.material, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      particle.geometry.dispose();
      particle.material.dispose();
      this.scene.remove(particle);
    }
  });
}
```

---

## Debugging Tips

### View Scene in Browser

```javascript
// Add to main.js
window.scene = this.scene;
window.camera = this.camera;

// In browser console:
console.log(scene.children);
```

### Log Performance Metrics

```javascript
// In animate()
if (this.frameCount % 60 === 0) {
  console.log('FPS:', this.stats.getFPS());
  console.log('Nodes:', this.neuralNetwork.nodes.length);
  console.log('Memory:', performance.memory?.usedJSHeapSize);
}
```

### Add Debug GUI

```bash
npm install dat.gui
```

```javascript
import GUI from 'dat.gui';

initDebug() {
  const gui = new GUI();
  
  const params = {
    nodeCount: 80,
    animationSpeed: 0.0005,
    particleSize: 0.08
  };
  
  gui.add(params, 'nodeCount', 10, 200).onChange((value) => {
    this.neuralNetwork.dispose();
    this.neuralNetwork = new NeuralNetwork(this.scene, value);
  });
  
  gui.add(params, 'animationSpeed', 0.0001, 0.01);
}
```

---

## Best Practices

### 1. Always Dispose Resources
```javascript
dispose() {
  geometry.dispose();
  material.dispose();
  scene.remove(mesh);
}
```

### 2. Use RequestAnimationFrame
```javascript
animate() {
  requestAnimationFrame(() => this.animate());
  // Your animation code
}
```

### 3. Throttle Heavy Operations
```javascript
// Use lodash throttle or custom implementation
const throttledUpdate = throttle(() => {
  // Heavy operation
}, 100);
```

### 4. Profile Performance
```javascript
console.time('operation');
// Your code
console.timeEnd('operation');
```

### 5. Handle Errors Gracefully
```javascript
try {
  this.renderer = new THREE.WebGLRenderer();
} catch (error) {
  console.error('WebGL not supported', error);
  // Show fallback content
}
```

---

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Need Help?

1. Check the inline code comments
2. Review the DOCUMENTATION.md
3. Look at the examples in Three.js docs
4. Use browser DevTools to inspect elements
5. Check console for errors
