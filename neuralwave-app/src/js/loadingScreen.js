import { gsap } from 'gsap';

export class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingPercentage = document.getElementById('loading-percentage');
    this.progress = 0;
    this.targetProgress = 0;
  }
  
  async start() {
    return new Promise((resolve) => {
      // Simulate loading progress
      this.simulateLoading();
      
      // Wait for minimum loading time
      setTimeout(() => {
        this.targetProgress = 100;
        resolve();
      }, 2000);
    });
  }
  
  simulateLoading() {
    // Increment progress gradually
    const increment = () => {
      if (this.progress < this.targetProgress) {
        this.progress += (this.targetProgress - this.progress) * 0.1;
        
        // Update percentage display
        const displayProgress = Math.floor(this.progress);
        this.loadingPercentage.textContent = displayProgress;
        
        // Continue animation
        requestAnimationFrame(increment);
      }
    };
    
    // Start with random progress increments
    const randomProgress = () => {
      if (this.targetProgress < 90) {
        this.targetProgress += Math.random() * 20;
        this.targetProgress = Math.min(this.targetProgress, 90);
        
        setTimeout(randomProgress, Math.random() * 300 + 200);
      }
    };
    
    randomProgress();
    increment();
  }
  
  async finish() {
    return new Promise((resolve) => {
      // Ensure we reach 100%
      gsap.to(this, {
        progress: 100,
        duration: 0.5,
        onUpdate: () => {
          this.loadingPercentage.textContent = Math.floor(this.progress);
        },
        onComplete: () => {
          // Fade out loading screen
          gsap.to(this.loadingScreen, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              this.loadingScreen.classList.add('hidden');
              resolve();
            }
          });
        }
      });
    });
  }
}
