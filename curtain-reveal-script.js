const loadingAnimationTime = 2000;
const DELAY_BEFORE_SCALE_OUT = 2000; // Delay in milliseconds between fs animation and scale out

const showMainAnimation = (parent) => {
  const boxContainer = document.createElement("div");
  boxContainer.style.overflow = "hidden";
  
  const box = document.createElement("div");
  box.classList.add("box", "flex");
  
  parent.appendChild(boxContainer);
  boxContainer.appendChild(box);
  
  const quote = ["Chef", "For", "Crews"];
  let delay = 0;
  
  // Add all the words
  for (let i = 0; i < quote.length; i++) {
    let text = document.createElement("span");
    text.textContent = quote[i];
    text.classList.add("animate-slideup");
    delay = delay + 220;
    text.style.animationDelay = delay + "ms";
    box.appendChild(text);
  }
  
  const lastAnimationTime = 1000 + delay; // in ms
  
  // Add full stop
  let text = document.createElement("div");
  text.classList.add("fs", "flex");
  text.style.animationDelay = lastAnimationTime - 100 + "ms";
  box.appendChild(text);
  
  // Return the last animation time so we know when the animation finishes
  return lastAnimationTime;
};

const revealCurtain = (parent) => {
  const curtain = document.createElement("div");
  curtain.classList.add("flex", "curtain");
  parent.appendChild(curtain);
  
  const progressBar = document.createElement("div");
  progressBar.classList.add("progressBar");
  curtain.appendChild(progressBar);
  
  // Add animation class after a tiny delay to ensure DOM is ready
  setTimeout(() => {
    progressBar.classList.add("progressGrow-animation");
  }, 50);
  
  return curtain;
};

const init = () => {
  const container = document.getElementById("main");
  if (!container) return;

  // Decided in the <head> of index.html: intro already played this visit, or reduced motion is on
  if (document.documentElement.classList.contains("no-intro")) {
    container.style.display = "none";
    return;
  }
  try {
    sessionStorage.setItem("introPlayed", "true");
  } catch (e) { /* storage unavailable: the intro will simply play again */ }
  
  // Set the container to be on top of everything
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100vh";
  container.style.zIndex = "10";
  container.style.backgroundColor = "black";
  container.style.transition = "transform 1.5s cubic-bezier(0.65, 0, 0.35, 1)";
  container.style.transformOrigin = "top center";
  container.style.transform = "scaleY(1)";
  container.style.overflow = "hidden";
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Show the curtain with progress bar
  let curtain = revealCurtain(container);
  
  // After initial loading time, show main animation
  setTimeout(() => {
    // Clear curtain and show main animation
    container.innerHTML = '';
    const animationDuration = showMainAnimation(container);
    
    // Wait for the main animation to finish, then add a delay before scale out
    setTimeout(() => {
      // Add an extra delay after fs animation completes
      setTimeout(() => {
        // Scale out from top to bottom
        container.style.transform = "scaleY(0)";
        
        // Remove from DOM after scale completes
        setTimeout(() => {
          if (container.parentNode) {
            container.style.display = "none";
          }
        }, 1500); // Match the transition duration
        
      }, DELAY_BEFORE_SCALE_OUT); // Configurable delay
      
    }, animationDuration); // Wait for main animation to complete
    
  }, loadingAnimationTime); // Wait for curtain animation
};

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', init);