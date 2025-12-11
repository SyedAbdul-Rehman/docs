import * as THREE from 'three';

export class NeuralNetwork {
  constructor(scene) {
    this.scene = scene;
    this.nodes = [];
    this.connections = [];
    this.nodeCount = this.getNodeCount();
    this.animationSpeed = 0.0005;
    
    this.init();
  }
  
  getNodeCount() {
    // Adjust node count based on device performance
    const isMobile = window.innerWidth < 768;
    const isLowEnd = !window.matchMedia('(min-resolution: 2dppx)').matches;
    
    if (isMobile) return 30;
    if (isLowEnd) return 50;
    return 80;
  }
  
  init() {
    this.createNodes();
    this.createConnections();
  }
  
  createNodes() {
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const colors = [0x00D9FF, 0xFF006E, 0x8338EC];
    
    for (let i = 0; i < this.nodeCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
      });
      
      const node = new THREE.Mesh(nodeGeometry, material);
      
      // Position nodes in a 3D space
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      node.position.x = radius * Math.sin(phi) * Math.cos(theta);
      node.position.y = radius * Math.sin(phi) * Math.sin(theta);
      node.position.z = radius * Math.cos(phi);
      
      // Store initial position for animation
      node.userData = {
        initialPosition: node.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        phase: Math.random() * Math.PI * 2
      };
      
      this.scene.add(node);
      this.nodes.push(node);
    }
  }
  
  createConnections() {
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    // Create connections between nearby nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const distance = this.nodes[i].position.distanceTo(this.nodes[j].position);
        
        // Only connect nodes within a certain distance
        if (distance < 3) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(6);
          
          positions[0] = this.nodes[i].position.x;
          positions[1] = this.nodes[i].position.y;
          positions[2] = this.nodes[i].position.z;
          positions[3] = this.nodes[j].position.x;
          positions[4] = this.nodes[j].position.y;
          positions[5] = this.nodes[j].position.z;
          
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          const line = new THREE.Line(geometry, connectionMaterial);
          line.userData = {
            nodeA: this.nodes[i],
            nodeB: this.nodes[j],
            pulsePhase: Math.random() * Math.PI * 2
          };
          
          this.scene.add(line);
          this.connections.push(line);
        }
      }
    }
  }
  
  update() {
    const time = Date.now() * this.animationSpeed;
    
    // Update nodes
    this.nodes.forEach((node) => {
      const { initialPosition, velocity, phase } = node.userData;
      
      // Floating animation
      node.position.x = initialPosition.x + Math.sin(time + phase) * 0.5;
      node.position.y = initialPosition.y + Math.cos(time + phase * 1.5) * 0.5;
      node.position.z = initialPosition.z + Math.sin(time + phase * 0.5) * 0.5;
      
      // Rotation
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2 + phase) * 0.2;
      node.scale.set(scale, scale, scale);
      
      // Update emissive intensity
      node.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + phase) * 0.2;
    });
    
    // Update connections
    this.connections.forEach((connection) => {
      const { nodeA, nodeB, pulsePhase } = connection.userData;
      const positions = connection.geometry.attributes.position.array;
      
      // Update line positions
      positions[0] = nodeA.position.x;
      positions[1] = nodeA.position.y;
      positions[2] = nodeA.position.z;
      positions[3] = nodeB.position.x;
      positions[4] = nodeB.position.y;
      positions[5] = nodeB.position.z;
      
      connection.geometry.attributes.position.needsUpdate = true;
      
      // Pulsing opacity effect
      const opacity = 0.1 + Math.sin(time * 2 + pulsePhase) * 0.1;
      connection.material.opacity = opacity;
      
      // Color cycling
      const hue = (time + pulsePhase) % 1;
      const color = new THREE.Color().setHSL(hue * 0.3 + 0.5, 1, 0.5);
      connection.material.color = color;
    });
  }
  
  dispose() {
    // Clean up nodes
    this.nodes.forEach((node) => {
      node.geometry.dispose();
      node.material.dispose();
      this.scene.remove(node);
    });
    
    // Clean up connections
    this.connections.forEach((connection) => {
      connection.geometry.dispose();
      connection.material.dispose();
      this.scene.remove(connection);
    });
    
    this.nodes = [];
    this.connections = [];
  }
}
