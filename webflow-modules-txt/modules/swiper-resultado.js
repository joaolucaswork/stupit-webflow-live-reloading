/**
 * Swiper Resultado System - Standalone for Webflow
 * Creates synchronized button and content swipers for results section
 */

class ReinoSwiperResultado {
  constructor() {
    this.menuSwiper = null;
    this.resultadoSwiper = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.waitForSwiper());
    } else {
      this.waitForSwiper();
    }
  }

  waitForSwiper() {
    if (typeof Swiper !== 'undefined') {
      this.initializeSwipers();
    } else {
      setTimeout(() => this.waitForSwiper(), 100);
    }
  }

  initializeSwipers() {
    const buttonContainer = document.querySelector('.swiper.is-button');
    const resultadoContainer = document.querySelector('.swiper.is-resultado');

    if (!buttonContainer || !resultadoContainer) {
      setTimeout(() => this.initializeSwipers(), 100);
      return;
    }

    try {
      // Initialize button swiper (horizontal navigation)
      this.menuSwiper = new Swiper(".swiper.is-button", {
        slidesPerView: 'auto',
        spaceBetween: 24,
        keyboard: true,
        centeredSlides: false,
        on: {
          init: () => {
            this.setupButtonContainer();
            this.updateButtonStyles();
          },
          slideChange: () => {
            this.updateButtonStyles();
          }
        }
      });

      // Initialize content swiper (vertical slides)
      this.resultadoSwiper = new Swiper(".swiper.is-resultado", {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 32,
        followFinger: true,
        keyboard: true,
        slideToClickedSlide: true,
        allowTouchMove: false,
        height: 500,
        centeredSlides: true,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          thresholdDelta: 50,
          thresholdTime: 500
        },
        on: {
          init: () => {
            this.setupResponsiveContainer();
            this.updateSlideOpacity();
          },
          slideChange: () => {
            this.updateSlideOpacity();
            this.updateButtonStyles();
          }
        }
      });

      // Sync swipers together
      if (this.menuSwiper && this.resultadoSwiper) {
        this.menuSwiper.controller.control = this.resultadoSwiper;
        this.resultadoSwiper.controller.control = this.menuSwiper;
      }

      this.setupResponsiveContainer();
      this.setupButtonInteractions();
      this.setupSectionScrollHandler();
      this.updateButtonStyles();
      this.updateSlideOpacity();

      setTimeout(() => {
        this.setInitialState();
      }, 100);

      this.isInitialized = true;
      console.log('✅ Swiper Resultado initialized');

    } catch (error) {
      console.error('❌ Error initializing swipers:', error);
    }
  }

  setupButtonContainer() {
    const buttonContainer = document.querySelector('.swiper.is-button');
    if (buttonContainer) {
      buttonContainer.style.maxWidth = '470px';
      buttonContainer.style.margin = '0 auto';
    }
  }

  setupResponsiveContainer() {
    const resultadoContainer = document.querySelector('.swiper.is-resultado');
    if (resultadoContainer) {
      resultadoContainer.style.maxWidth = '768px';
      resultadoContainer.style.margin = '0 auto';
      resultadoContainer.style.width = '100%';
      resultadoContainer.style.position = 'relative';
    }
  }

  setupButtonInteractions() {
    const buttonSlides = document.querySelectorAll('.swiper-slide.is-button');

    buttonSlides.forEach((slide, index) => {
      slide.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToSlide(index);
      });

      slide.style.cursor = 'pointer';
      slide.style.userSelect = 'none';
    });
  }

  setupSectionScrollHandler() {
    const section = document.querySelector('._5-section-resultado');
    if (section) {
      section.addEventListener('wheel', (e) => {
        if (this.resultadoSwiper) {
          e.preventDefault();
          if (e.deltaY > 0) {
            this.resultadoSwiper.slideNext();
          } else {
            this.resultadoSwiper.slidePrev();
          }
        }
      }, { passive: false });
    }
  }

  updateButtonStyles() {
    const buttonSlides = document.querySelectorAll('.swiper-slide.is-button');
    const activeIndex = this.resultadoSwiper ? this.resultadoSwiper.activeIndex : 0;

    buttonSlides.forEach((slide, index) => {
      slide.style.transition = 'all 0.3s ease';
      slide.style.cursor = 'pointer';

      if (index === activeIndex) {
        slide.style.backgroundColor = '#a2801a';
        slide.style.color = '#ffffff';
      } else {
        slide.style.backgroundColor = 'transparent';
        slide.style.color = '#333333';
      }
    });
  }

  updateSlideOpacity() {
    const resultadoSlides = document.querySelectorAll('.swiper-slide.is-resultado');
    const activeIndex = this.resultadoSwiper ? this.resultadoSwiper.activeIndex : 0;

    resultadoSlides.forEach((slide, index) => {
      slide.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      slide.style.transformOrigin = 'center center';

      if (index === activeIndex) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
        slide.style.zIndex = '2';
        slide.style.pointerEvents = 'auto';
      } else {
        slide.style.opacity = '0.5';
        slide.style.transform = 'scale(0.95)';
        slide.style.zIndex = '1';
        slide.style.pointerEvents = 'none';
      }
    });
  }

  setInitialState() {
    if (this.menuSwiper && this.resultadoSwiper) {
      this.menuSwiper.slideTo(0, 0);
      this.resultadoSwiper.slideTo(0, 0);
      this.updateButtonStyles();
      this.updateSlideOpacity();
    }
  }

  goToSlide(index) {
    if (this.menuSwiper && this.resultadoSwiper) {
      this.menuSwiper.slideTo(index, 300);
      this.resultadoSwiper.slideTo(index, 300);
    }
  }

  getActiveIndex() {
    return this.resultadoSwiper ? this.resultadoSwiper.activeIndex : 0;
  }

  // Public API methods
  slideNext() {
    if (this.resultadoSwiper) {
      this.resultadoSwiper.slideNext();
    }
  }

  slidePrev() {
    if (this.resultadoSwiper) {
      this.resultadoSwiper.slidePrev();
    }
  }

  getCurrentSlide() {
    return this.getActiveIndex();
  }

  getTotalSlides() {
    return this.resultadoSwiper ? this.resultadoSwiper.slides.length : 0;
  }

  destroy() {
    if (this.menuSwiper) {
      this.menuSwiper.destroy(true, true);
      this.menuSwiper = null;
    }
    if (this.resultadoSwiper) {
      this.resultadoSwiper.destroy(true, true);
      this.resultadoSwiper = null;
    }
    this.isInitialized = false;
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    window.ReinoSwiperResultado = new ReinoSwiperResultado();
  } else {
    const waitForSwiper = () => {
      if (typeof Swiper !== 'undefined') {
        window.ReinoSwiperResultado = new ReinoSwiperResultado();
      } else {
        setTimeout(waitForSwiper, 100);
      }
    };
    waitForSwiper();
  }
});

// Also initialize if DOM already loaded
if (document.readyState === 'loading') {
  // Already set up above
} else {
  if (typeof Swiper !== 'undefined') {
    window.ReinoSwiperResultado = new ReinoSwiperResultado();
  } else {
    const waitForSwiper = () => {
      if (typeof Swiper !== 'undefined') {
        window.ReinoSwiperResultado = new ReinoSwiperResultado();
      } else {
        setTimeout(waitForSwiper, 100);
      }
    };
    waitForSwiper();
  }
}

// Global API
window.ReinoSwiper = {
  goToSlide: (index) => {
    if (window.ReinoSwiperResultado) {
      window.ReinoSwiperResultado.goToSlide(index);
    }
  },
  getCurrentSlide: () => {
    return window.ReinoSwiperResultado ? window.ReinoSwiperResultado.getCurrentSlide() : 0;
  },
  slideNext: () => {
    if (window.ReinoSwiperResultado) {
      window.ReinoSwiperResultado.slideNext();
    }
  },
  slidePrev: () => {
    if (window.ReinoSwiperResultado) {
      window.ReinoSwiperResultado.slidePrev();
    }
  }
};
