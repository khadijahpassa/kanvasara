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

document.addEventListener("DOMContentLoaded", () => {
  //===== MICRO-SLIDER begin
  const __ms = document.querySelector(".micro-slider");
  const __msSlider = new MicroSlider(__ms, {
    indicators: false,
    indicatorText: "",
    onChange: updateActiveSlide,
  });
  const hammer = new Hammer(__ms);
  const __msTimer = 2000;
  let __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);

  // Update active slide
  function updateActiveSlide(index) {
    document.querySelectorAll('.slider-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });
  }

  // Set the initial active slide
  updateActiveSlide(0);

  //detect mouseenter event
  __ms.onmouseenter = function (e) {
    clearInterval(__msAutoplay);
    console.log(e.type + " mouse detected");
  };

  //detect mouseleave event
  __ms.onmouseleave = function (e) {
    clearInterval(__msAutoplay);
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
  };

  //detect mouseclick event
  __ms.onclick = function (e) {
    clearInterval(__msAutoplay);
  };

  //detect gesture tap event with hammer js library
  hammer.on("tap", function (e) {
    clearInterval(__msAutoplay);
  });

  //detect gesture swipe event with hammer js library
  hammer.on("swipe", function (e) {
    clearInterval(__msAutoplay);
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
  });

  let slideLink = document.querySelectorAll(".slider-item");
  if (slideLink && slideLink !== null && slideLink.length > 0) {
    slideLink.forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        let href = el.dataset.href;
        if (href !== "#") window.open(href);
      })
    );
  }

  // Manual slide on hover
  const slideItems = document.querySelectorAll('.slider-item');
  slideItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      clearInterval(__msAutoplay);
      updateActiveSlide(index);
    });

    item.addEventListener("mouseleave", () => {
      __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
    });
  });


  //===== MICRO-SLIDER end
});