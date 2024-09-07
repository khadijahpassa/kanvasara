let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')
}

window.onscroll = () => {
  menuIcon.classList.remove('bx-x')
  navbar.classList.remove('active')
}

// Pelukis - previous & next buttons
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.container-slider');
  const items = document.querySelectorAll('.item-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let itemsPerView = calculateItemsPerView();
  const itemWidth = items[0].clientWidth + parseInt(getComputedStyle(slider).gap);
  let currentIndex = 0;

  function calculateItemsPerView() {
    if (window.innerWidth <= 480) {
      return 1;
    } else if (window.innerWidth <= 767) {
      return 1;
    } else if (window.innerWidth <= 968) {
      return 1;
    } else if (window.innerWidth <= 1020) {
      return 1;
    } else if (window.innerWidth <= 1120) {
      return 2;
    } else {
      return 3;
    }
  }

  function updateButtons() {
    if (currentIndex === 0) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = 0.5;
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = 1;
      prevBtn.style.cursor = 'pointer';
    }

    if (currentIndex >= items.length - itemsPerView) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = 0.5;
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = 1;
      nextBtn.style.cursor = 'pointer';
    }
  }

  function moveToIndex(index) {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${itemWidth * index}px)`;
    currentIndex = index;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      moveToIndex(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - itemsPerView) {
      moveToIndex(currentIndex + 1);
    }
  });

  window.addEventListener('resize', () => {
    itemsPerView = calculateItemsPerView();
    updateButtons();
    moveToIndex(currentIndex); 
  });

  updateButtons();
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.item-slider').forEach(item => {
    item.addEventListener('click', () => {
      const href = item.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });
});


