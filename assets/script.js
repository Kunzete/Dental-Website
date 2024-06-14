document.addEventListener('DOMContentLoaded', function () {
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
});

window.addEventListener('load', function() {
    // Hide the preloader
    document.getElementById('preloader').style.display = 'none';
    // Show the content
    document.getElementById('content').style.display = 'block';
});

      
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const close = document.getElementById("close");
hamburger.addEventListener("click", () => {
  const lines = document.querySelectorAll(".hamburger-lines");
  lines.forEach((line) => {
    line.classList.toggle("hamburger-active");
  });
  menu.classList.toggle("menu-active");
});

close.addEventListener("click", () => {
  const lines = document.querySelectorAll(".hamburger-lines");
  lines.forEach((line) => {
    line.classList.toggle("hamburger-active");
  });
  menu.classList.toggle("menu-active");
});
