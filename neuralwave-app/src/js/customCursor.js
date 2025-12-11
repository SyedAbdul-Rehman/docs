import { gsap } from 'gsap';

export class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorDot = document.querySelector('.cursor-dot');
    this.cursorOutline = document.querySelector('.cursor-outline');
    this.cursorPos = { x: 0, y: 0 };
    this.mousePos = { x: 0, y: 0 };
    
    // Check if device has mouse
    this.hasMouse = window.matchMedia('(pointer: fine)').matches;
    
    if (this.hasMouse) {
      this.init();
    } else {
      this.cursor.style.display = 'none';
    }
  }
  
  init() {
    this.addEventListeners();
    this.animate();
  }
  
  addEventListeners() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });
    
    // Handle interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('pointer');
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('pointer');
      });
    });
    
    // Handle canvas for grab cursor
    const canvas = document.querySelector('#canvas-container');
    if (canvas) {
      canvas.addEventListener('mouseenter', () => {
        this.cursor.classList.add('grab');
      });
      
      canvas.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('grab');
      });
      
      canvas.addEventListener('mousedown', () => {
        gsap.to(this.cursorOutline, {
          scale: 0.8,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
      
      canvas.addEventListener('mouseup', () => {
        gsap.to(this.cursorOutline, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    }
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to(this.cursor, {
        opacity: 0,
        duration: 0.2
      });
    });
    
    document.addEventListener('mouseenter', () => {
      gsap.to(this.cursor, {
        opacity: 1,
        duration: 0.2
      });
    });
  }
  
  animate() {
    // Smooth cursor movement with lerp
    this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * 0.15;
    this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * 0.15;
    
    this.cursor.style.transform = `translate(${this.cursorPos.x}px, ${this.cursorPos.y}px)`;
    
    requestAnimationFrame(() => this.animate());
  }
}
