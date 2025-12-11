import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Stats from 'stats.js';
import { NeuralNetwork } from './neuralNetwork.js';
import { FloatingShapes } from './floatingShapes.js';
import { CustomCursor } from './customCursor.js';
import { LoadingScreen } from './loadingScreen.js';

gsap.registerPlugin(ScrollTrigger);

class NeuralWaveApp {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.neuralNetwork = null;
    this.floatingShapes = null;
    this.customCursor = null;
    this.loadingScreen = null;
    this.stats = null;
    this.lenis = null;
    
    this.mouse = { x: 0, y: 0 };
    this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.init();
  }
  
  async init() {
    // Initialize loading screen
    this.loadingScreen = new LoadingScreen();
    await this.loadingScreen.start();
    
    // Initialize smooth scrolling
    this.initSmoothScroll();
    
    // Initialize Three.js scene
    this.initThree();
    
    // Initialize neural network
    this.neuralNetwork = new NeuralNetwork(this.scene);
    
    // Initialize floating shapes
    this.floatingShapes = new FloatingShapes(this.scene);
    
    // Initialize custom cursor
    this.customCursor = new CustomCursor();
    
    // Initialize FPS monitor (toggle with 'F' key)
    this.initFPSMonitor();
    
    // Initialize animations
    this.initAnimations();
    
    // Event listeners
    this.addEventListeners();
    
    // Start animation loop
    this.animate();
    
    // Hide loading screen
    await this.loadingScreen.finish();
  }
  
  initThree() {
    const container = document.getElementById('canvas-container');
    
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 15;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0a0a0f, 1);
    container.appendChild(this.renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00D9FF, 2, 50);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFF006E, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);
  }
  
  initSmoothScroll() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });
    
    this.lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  }
  
  initFPSMonitor() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
    
    const fpsContainer = document.getElementById('fps-monitor');
    fpsContainer.appendChild(this.stats.dom);
    
    // Toggle with 'F' key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        const display = fpsContainer.style.display;
        fpsContainer.style.display = display === 'none' ? 'block' : 'none';
      }
    });
  }
  
  initAnimations() {
    // Title text reveal animation
    const words = document.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
      }
    );
    
    // Subtitle fade in
    gsap.fromTo(
      '.hero-subtitle',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
      }
    );
    
    // CTA button fade in
    gsap.fromTo(
      '.hero-cta',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 2
      }
    );
    
    // CTA button magnetic effect
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', () => {
      gsap.to(ctaButton, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      gsap.to(ctaButton, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    ctaButton.addEventListener('mousemove', (e) => {
      const rect = ctaButton.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(ctaButton, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      gsap.to(ctaButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }
  
  addEventListeners() {
    // Mouse move for parallax
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX - this.windowHalf.x) / this.windowHalf.x;
      this.mouse.y = (e.clientY - this.windowHalf.y) / this.windowHalf.y;
    });
    
    // Window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Handle visibility change for performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.renderer.setAnimationLoop(null);
      } else {
        this.renderer.setAnimationLoop(() => this.animate());
      }
    });
  }
  
  onWindowResize() {
    this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.stats.begin();
    
    // Update neural network
    if (this.neuralNetwork) {
      this.neuralNetwork.update();
    }
    
    // Update floating shapes with mouse parallax
    if (this.floatingShapes) {
      this.floatingShapes.update(this.mouse);
    }
    
    // Camera parallax
    this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouse.y * 2 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    this.stats.end();
  }
  
  dispose() {
    // Clean up resources
    if (this.neuralNetwork) {
      this.neuralNetwork.dispose();
    }
    
    if (this.floatingShapes) {
      this.floatingShapes.dispose();
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NeuralWaveApp();
  });
} else {
  new NeuralWaveApp();
}
