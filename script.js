// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    
    // Fade in monster element
    const monster = document.querySelector('.loadFadeIn');
    if (monster) {
        monster.style.opacity = '0';
        monster.style.transition = 'opacity 1s ease';
        
        setTimeout(function() {
            monster.style.opacity = '1';
        }, 50);
    }
    
    // Separate function for scroll logic
    function handleScrollFade() {
        const hidemeElements = document.querySelectorAll('.hideme');
        
        hidemeElements.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate when 50% of the element is visible
            // Element is 50% visible when its midpoint is in the viewport
            const elementMidpoint = rect.top + (rect.height / 3);
            
            // Check if the midpoint is within the viewport
            if (elementMidpoint > 0 && elementMidpoint < windowHeight) {
                element.style.transition = 'opacity 1.5s ease';
                element.style.opacity = '1';
            }
        });
        const hidemeFastElements = document.querySelectorAll('.hidemeFast');
        
        hidemeFastElements.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate height for when the element is visible
            const elementHeight = rect.top + (rect.height / 10);
            
            // Check if the midpoint is within the viewport
            if (elementHeight > 0 && elementHeight < windowHeight) {
                element.style.transition = 'opacity 1s ease';
                element.style.opacity = '1';
            }
        });
    }
    
    // Debounce function
    function enhancedDebounce(func, delay = 100) {
        let timeout;
        let rafId;
        
        return function() {
            clearTimeout(timeout);
            
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
            
            timeout = setTimeout(() => {
                rafId = window.requestAnimationFrame(() => {
                    func();
                    rafId = null;
                });
            }, delay);
        };
    }
    
    // Apply debounce to scroll handler
    const debouncedScrollHandler = enhancedDebounce(handleScrollFade, 50);
    
    // Add scroll event listener
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Trigger once on page load
    handleScrollFade();
    
});