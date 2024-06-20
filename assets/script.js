const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const close = document.getElementById("close");

document.addEventListener('DOMContentLoaded', () => {
  const animatedNumbers = document.querySelectorAll('.animated-number');

  animatedNumbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-target'));
    let current = 0;
    const increment = Math.ceil(target / 90); // Adjust the speed here

    const updateNumber = () => {
      if (current < target) {
        current += increment;
        if (current > target) {
          current = target;
        }
        number.textContent = current;
        requestAnimationFrame(updateNumber);
      }
    };

    updateNumber();
  });
  
  const container = document.getElementById('scrollableDiv');
  const cards = document.querySelectorAll('.testimonal-inside .card');
  let isGrabbing = false;
  let scrollInterval;

  container.addEventListener('mousedown', () => {
    isGrabbing = true;
    clearInterval(scrollInterval);
  });

  container.addEventListener('mouseup', () => {
    if (isGrabbing) {
      isGrabbing = false;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = cards[0].clientWidth;
      const activeCardIndex = Math.round(scrollPosition / cardWidth);
      const centerPosition = activeCardIndex * cardWidth + (containerWidth - cardWidth) / 2;
      animateScroll(container, 'scrollLeft', centerPosition, 600);
    }
  });

  function startAutoScroll() {
    scrollInterval = setInterval(() => {
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth + 100;
      const cardWidth = cards[0].clientWidth;
      const nextScrollPosition = scrollPosition + containerWidth;
      const endScrollPosition = container.scrollWidth - containerWidth;

      if (nextScrollPosition >= endScrollPosition) {
        animateScroll(container, 'scrollLeft', 0, 1500);
      } else {
        animateScroll(container, 'scrollLeft', nextScrollPosition, 1500);
      }
    }, 3000);
  }

  function animateScroll(element, property, to, duration) {
    const start = element[property];
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    function animate() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element[property] = val;
      if (currentTime < duration) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  startAutoScroll();
});

window.addEventListener('load', () => {
  // Hide the preloader
  document.getElementById('preloader').style.display = 'none';
  // Show the content
  document.getElementById('content').style.display = 'block';
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const lines = document.querySelectorAll(".hamburger-lines");
    lines.forEach(line => line.classList.toggle("hamburger-active"));
    menu.classList.toggle("menu-active");
  });
}

if (close) {
  close.addEventListener('click', () => {
    const lines = document.querySelectorAll(".hamburger-lines");
    lines.forEach(line => line.classList.toggle("hamburger-active"));
    menu.classList.toggle("menu-active");
  });
}

const scrollableDiv = document.getElementById('scrollableDiv');
let isDragging = false;
let startX, scrollLeft;

scrollableDiv.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scrollableDiv.offsetLeft;
    scrollLeft = scrollableDiv.scrollLeft;
});

scrollableDiv.addEventListener('mouseleave', () => {
    isDragging = false;
});

scrollableDiv.addEventListener('mouseup', () => {
    isDragging = false;
});

scrollableDiv.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollableDiv.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed if needed
    scrollableDiv.scrollLeft = scrollLeft - walk;
});
