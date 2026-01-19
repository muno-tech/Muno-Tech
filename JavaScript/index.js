  // Mobile Menu Toggle
  function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
  }
  
  function closeMenu() {
    document.getElementById('mainNav').classList.remove('active');
  }
  
  // Theme Toggle
  function themeToggle() {
    document.body.classList.toggle('light');
  }

  // Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Check if logo loaded
  const logoImg = document.querySelector('.logo img');
  const logoFallback = document.querySelector('.logo span');
  
  if (logoImg && logoFallback) {
    if (logoImg.complete && logoImg.naturalHeight === 0) {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    } else {
      logoImg.onerror = function() {
        this.style.display = 'none';
        logoFallback.style.display = 'flex';
      };
    }
  }
  
  // Check if hero image loaded
  const heroImg = document.querySelector('.hero img');
  const heroFallback = document.querySelector('.hero img + div');
  
  if (heroImg && heroFallback) {
    if (heroImg.complete && heroImg.naturalHeight === 0) {
      heroImg.style.display = 'none';
      heroFallback.style.display = 'flex';
    } else {
      heroImg.onerror = function() {
        this.style.display = 'none';
        heroFallback.style.display = 'flex';
      };
    }
  }
});
  
  // Main Slider Functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const sliderDotsContainer = document.getElementById('sliderDots');
  
  // Create dots for slider
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    sliderDotsContainer.appendChild(dot);
  });
  
  function updateSlider() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }
  
  // Auto slide every 5 seconds
  setInterval(nextSlide, 3000);
  
  // Poster Slider Functionality
  let currentPoster = 0;
  let postersPerView = 3;
  let posterInterval;
  
  // Function to update posters per view based on screen size
  function updatePostersPerView() {
    if (window.innerWidth <= 768) {
      postersPerView = 1;
    } else if (window.innerWidth <= 1024) {
      postersPerView = 2;
    } else {
      postersPerView = 3;
    }
  }
  
  // Initialize poster dots from HTML content
  function initPosterDots() {
    const posterItems = document.querySelectorAll('.poster-item');
    const posterDotsContainer = document.getElementById('posterDots');
    posterDotsContainer.innerHTML = ''; // Clear existing dots
    
    posterItems.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `poster-dot ${index === 0 ? 'active' : ''}`;
      dot.onclick = () => goToPoster(index);
      posterDotsContainer.appendChild(dot);
    });
  }
  
  function updatePosterSlider() {
    updatePostersPerView();
    const posterItems = document.querySelectorAll('.poster-item');
    const posterTrack = document.getElementById('posterTrack');
    const itemWidth = 100 / postersPerView;
    
    // Update active class and width
    posterItems.forEach((item, index) => {
      item.classList.remove('active');
      item.style.width = `${itemWidth}%`;
      
      // Center the active item
      if (index >= currentPoster && index < currentPoster + postersPerView) {
        const centerIndex = Math.floor(postersPerView / 2);
        if (index === currentPoster + centerIndex) {
          item.classList.add('active');
        }
      }
    });
    
    // Update track position
    const translateX = -(currentPoster * (100 / postersPerView));
    posterTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    document.querySelectorAll('.poster-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPoster);
    });
  }
  
  function movePoster(direction) {
    const posterItems = document.querySelectorAll('.poster-item');
    const totalPosters = posterItems.length;
    
    currentPoster += direction;
    
    if (currentPoster < 0) {
      currentPoster = totalPosters - postersPerView;
    } else if (currentPoster > totalPosters - postersPerView) {
      currentPoster = 0;
    }
    
    updatePosterSlider();
  }
  
  function goToPoster(index) {
    const posterItems = document.querySelectorAll('.poster-item');
    currentPoster = Math.min(index, posterItems.length - postersPerView);
    updatePosterSlider();
  }
  
  // Start auto sliding
  function startPosterAutoSlide() {
    clearInterval(posterInterval);
    posterInterval = setInterval(() => movePoster(1), 4000);
  }
  
  // Initialize everything when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize poster slider
    initPosterDots();
    updatePosterSlider();
    startPosterAutoSlide();
    
    // Pause auto-slide on hover
    const posterWrapper = document.querySelector('.poster-wrapper');
    if (posterWrapper) {
      posterWrapper.addEventListener('mouseenter', () => clearInterval(posterInterval));
      posterWrapper.addEventListener('mouseleave', startPosterAutoSlide);
      
      // Handle touch events for mobile
      let startX = 0;
      posterWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearInterval(posterInterval);
      });
      
      posterWrapper.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
          movePoster(1); // Swipe left
        } else if (endX - startX > 50) {
          movePoster(-1); // Swipe right
        }
        startPosterAutoSlide();
      });
    }
  });
  
  // Update on window resize
  window.addEventListener('resize', function() {
    updatePosterSlider();
  });
  
  // FAQ Toggle
  function toggleFAQ(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  }
  
  // Enrollment Form with Email + WhatsApp
  document.getElementById("enrollForm").addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("number").value,
          course: document.getElementById("course").value,
          timestamp: new Date().toLocaleString()
      };
      
      // 1. FIRST: Open WhatsApp IMMEDIATELY (no waiting)
      const whatsappText = `Assalam-o-Alaikum, I want to enroll in Muno Tech.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0AWhatsApp: ${formData.phone}%0ACourse: ${formData.course}`;
      window.open(`https://wa.me/923148068523?text=${whatsappText}`, "_blank");
      
      // 2. THEN: Send email in BACKGROUND (user doesn't wait)
      sendEmailBackground(formData);
      
      // 3. Show success message
      const btn = this.querySelector("button");
      const originalText = btn.textContent;
      btn.textContent = "✓ Enrollment Sent!";
      btn.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";
      
      // 4. Reset form
      setTimeout(() => {
          this.reset();
          btn.textContent = originalText;
          btn.style.background = "linear-gradient(135deg,var(--accent),#0066ff)";
      }, 2000);
  });
  
  // Email function that runs in background
  function sendEmailBackground(data) {
      // Use fetch with NO waiting for response
      fetch("https://formsubmit.co/ajax/munotech00@gmail.com", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              _subject: "📚 New Enrollment - Muno Tech",
              name: data.name,
              email: data.email,
              phone: data.phone,
              course: data.course,
              time: data.timestamp,
              _template: "table",
              _autoresponse: `Thank you ${data.name} for enrolling in ${data.course}! We'll contact you on WhatsApp shortly.`,
              _captcha: "false"
          })
      })
      .then(response => response.json())
      .then(data => console.log("Email sent successfully"))
      .catch(error => console.log("Email failed (but WhatsApp worked)"));
      
      // ALSO send to Web3Forms as backup
      fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              access_key: "76a283bd-4dd6-4363-a8b7-891acf198ac5",
              subject: "Muno Tech Enrollment",
              name: data.name,
              email: data.email,
              phone: data.phone,
              course: data.course,
              from_name: "Muno Tech Website"
          })
      })
      .catch(err => console.log("Web3Forms backup failed"));
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });