// Preloader functionality
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(function() {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
  }, 2000);
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
  } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
  }
});

// Mobile menu functionality
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const closeNav = document.getElementById('closeNav');

mobileToggle.addEventListener('click', function() {
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeNav.addEventListener('click', function() {
  mobileNav.classList.remove('active');
  document.body.style.overflow = '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (mobileNav.classList.contains('active') && 
      !mobileNav.contains(event.target) && 
      !mobileToggle.contains(event.target)) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
  }
});

// Scroll animations for elements
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .stat-item, .feature-card');
  
  elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(elementPosition < screenPosition) {
          element.classList.add('visible');
      }
  });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize on page load
animateOnScroll();

// Counter animation for stats
function startCounterAnimation() {
  const counter1 = document.getElementById('counter1');
  const counter2 = document.getElementById('counter2');
  const counter3 = document.getElementById('counter3');
  const counter4 = document.getElementById('counter4');
  
  const target1 = 250;
  const target2 = 98;
  const target3 = 120;
  const target4 = 15;
  
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  
  const duration = 2000; // ms
  const increment1 = target1 / (duration / 20);
  const increment2 = target2 / (duration / 20);
  const increment3 = target3 / (duration / 20);
  const increment4 = target4 / (duration / 20);
  
  const timer = setInterval(() => {
      count1 += increment1;
      count2 += increment2;
      count3 += increment3;
      count4 += increment4;
      
      if (count1 > target1) count1 = target1;
      if (count2 > target2) count2 = target2;
      if (count3 > target3) count3 = target3;
      if (count4 > target4) count4 = target4;
      
      counter1.textContent = Math.floor(count1) + '+';
      counter2.textContent = Math.floor(count2) + '%';
      counter3.textContent = Math.floor(count3) + '+';
      counter4.textContent = Math.floor(count4) + 'K+';
      
      if (count1 >= target1 && count2 >= target2 && 
          count3 >= target3 && count4 >= target4) {
          clearInterval(timer);
      }
  }, 20);
}

// Only start counter when stats section is visible
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          startCounterAnimation();
          observer.disconnect();
      }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Quote Calculator Functionality
const quoteForm = document.getElementById('quoteForm');
const priceDisplay = document.getElementById('priceDisplay');
const originDisplay = document.getElementById('originDisplay');
const destDisplay = document.getElementById('destDisplay');
const weightDisplay = document.getElementById('weightDisplay');
const volumeDisplay = document.getElementById('volumeDisplay');
const serviceDisplay = document.getElementById('serviceDisplay');
const authPrompt = document.getElementById('authPrompt');

// Initially hide auth prompt
authPrompt.style.display = 'none';

quoteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const volume = parseFloat(document.getElementById('volume').value);
  const service = document.getElementById('service').value;
  
  // Calculate price based on inputs
  let basePrice = 0;
  
  // Base price based on distance (simplified)
  if (origin === destination) {
      basePrice = 5000; // Naira for domestic
  } else {
      basePrice = 30000; // Naira for international
  }
  
  // Add weight cost (₦100 per kg)
  basePrice += weight * 100;
  
  // Add volume cost (₦5000 per m³)
  basePrice += volume * 5000;
  
  // Apply service multiplier
  if (service === 'express') {
      basePrice *= 1.8;
  } else if (service === 'priority') {
      basePrice *= 2.5;
  }
  
  // Format as currency
  const formattedPrice = '₦' + basePrice.toLocaleString('en-NG');
  
  // Update display
  priceDisplay.textContent = formattedPrice;
  
  // Update details
  originDisplay.textContent = document.getElementById('origin').options[document.getElementById('origin').selectedIndex].text;
  destDisplay.textContent = document.getElementById('destination').options[document.getElementById('destination').selectedIndex].text;
  weightDisplay.textContent = weight + ' kg';
  volumeDisplay.textContent = volume + ' m³';
  serviceDisplay.textContent = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
  
  // Show auth prompt
  authPrompt.style.display = 'block';
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
      header.style.padding = '1rem 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
  }
});