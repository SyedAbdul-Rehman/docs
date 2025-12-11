import * as THREE from 'three';

export class FloatingShapes {
  constructor(scene) {
    this.scene = scene;
    this.shapes = [];
    this.shapeCount = this.getShapeCount();
    
    this.init();
  }
  
  getShapeCount() {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 5 : 10;
  }
  
  init() {
    this.createShapes();
  }
  
  createShapes() {
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TorusGeometry(0.3, 0.1, 16, 32),
      new THREE.ConeGeometry(0.3, 0.6, 8)
    ];
    
    const colors = [0x00D9FF, 0xFF006E, 0x8338EC];
    
    for (let i = 0; i < this.shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.3,
        wireframe: Math.random() > 0.5
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      // Random position
      shape.position.x = (Math.random() - 0.5) * 30;
      shape.position.y = (Math.random() - 0.5) * 30;
      shape.position.z = (Math.random() - 0.5) * 20 - 10;
      
      // Random rotation
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      shape.rotation.z = Math.random() * Math.PI;
      
      // Store animation data
      shape.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.001 + 0.0005,
        floatRange: Math.random() * 2 + 1,
        initialY: shape.position.y,
        phase: Math.random() * Math.PI * 2,
        parallaxStrength: Math.random() * 2 + 1
      };
      
      this.scene.add(shape);
      this.shapes.push(shape);
    }
  }
  
  update(mouse) {
    const time = Date.now();
    
    this.shapes.forEach((shape) => {
      const {
        rotationSpeed,
        floatSpeed,
        floatRange,
        initialY,
        phase,
        parallaxStrength
      } = shape.userData;
      
      // Rotation animation
      shape.rotation.x += rotationSpeed.x;
      shape.rotation.y += rotationSpeed.y;
      shape.rotation.z += rotationSpeed.z;
      
      // Floating animation
      shape.position.y = initialY + Math.sin(time * floatSpeed + phase) * floatRange;
      
      // Mouse parallax effect
      if (mouse) {
        shape.position.x += (mouse.x * parallaxStrength - shape.position.x * 0.01) * 0.05;
        shape.position.z += (mouse.y * parallaxStrength - shape.position.z * 0.01) * 0.05;
      }
      
      // Pulsing opacity
      shape.material.opacity = 0.2 + Math.sin(time * 0.001 + phase) * 0.1;
    });
  }
  
  dispose() {
    this.shapes.forEach((shape) => {
      shape.geometry.dispose();
      shape.material.dispose();
      this.scene.remove(shape);
    });
    
    this.shapes = [];
  }
}
