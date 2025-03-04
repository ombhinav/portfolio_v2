// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100
    });
  
    // Typing effect for the greeting
    const textElement = document.getElementById('typing-text');
    const phrases = ["नमस्ते:","Namaste:", "Welcome:", "Bonjour:", "Hola:"];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 150;
  
    function typeEffect() {
      // Current phrase being typed/deleted
      const phrase = phrases[currentPhrase];
      
      // Handle typing or deleting
      if (isDeleting) {
        // Remove a character
        textElement.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;
        typingSpeed = 80; // Faster when deleting
      } else {
        // Add a character
        textElement.textContent = phrase.substring(0, currentChar + 1);
        currentChar++;
        typingSpeed = 150; // Normal typing speed
      }
      
      // Handle transition between phrases
      if (!isDeleting && currentChar === phrase.length) {
        // Complete word - pause before deleting
        isDeleting = true;
        typingSpeed = 1000; // Pause at end of word
      } else if (isDeleting && currentChar === 0) {
        // Word completely deleted
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length; // Move to next phrase
        typingSpeed = 500; // Pause before starting new word
      }
      
      // Schedule next frame
      setTimeout(typeEffect, typingSpeed);
    }

  
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.height = scrollPercentage + '%';
    });
    
    // Start the typing animation
    typeEffect();
  });