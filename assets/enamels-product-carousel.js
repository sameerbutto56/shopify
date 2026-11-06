/**
 * Enamels Dynamic Product Carousel & Horizontal Scroller
 * Version: 2.0.0
 * Handles smooth horizontal scrolling, fractional card peek, trackpad wheel,
 * touch gestures, desktop arrow navigation, progress indicators, and inline grid toggle.
 */

(function () {
  'use strict';

  function initCarousel(carouselEl) {
    if (!carouselEl || carouselEl.__enamelsCarouselInitialized) return;
    carouselEl.__enamelsCarouselInitialized = true;

    const track = carouselEl.querySelector('[data-carousel-track]');
    if (!track) return;

    const prevBtn = carouselEl.querySelector('[data-carousel-prev]');
    const nextBtn = carouselEl.querySelector('[data-carousel-next]');
    const progressBar = carouselEl.querySelector('[data-progress-bar]');
    const expandBtn = carouselEl.querySelector('[data-carousel-expand]');

    const isAutoplay = carouselEl.dataset.autoplay === 'true';
    const autoplaySpeed = parseInt(carouselEl.dataset.autoplaySpeed, 10) || 5;
    const enableMouseWheel = carouselEl.dataset.mouseWheel !== 'false';

    let autoplayTimer = null;
    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let hasMoved = false;

    // 1. Update Arrow Navigation & Progress Bar
    function updateControls() {
      if (track.classList.contains('is-grid-mode')) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const currentScroll = track.scrollLeft;

      if (prevBtn) {
        const atStart = currentScroll <= 4;
        prevBtn.disabled = atStart;
        prevBtn.classList.toggle('is-disabled', atStart);
        prevBtn.setAttribute('aria-disabled', atStart ? 'true' : 'false');
      }

      if (nextBtn) {
        const atEnd = currentScroll >= maxScroll - 6;
        nextBtn.disabled = atEnd;
        nextBtn.classList.toggle('is-disabled', atEnd);
        nextBtn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
      }

      if (progressBar && maxScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
        progressBar.style.transform = `translateX(${progress * 0.8}%)`;
        progressBar.style.width = '20%';
      }
    }

    // 2. Arrow Click Handlers
    function getScrollStep() {
      // Step by approximately one viewport page or 3 cards
      const firstCard = track.querySelector('.enamels-carousel-card');
      if (firstCard) {
        const cardWidth = firstCard.getBoundingClientRect().width;
        const visibleCols = Math.max(1, Math.floor(track.clientWidth / cardWidth));
        return cardWidth * Math.max(1, visibleCols - 0.5);
      }
      return track.clientWidth * 0.8;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // 3. Mouse Drag Scrolling on Desktop
    track.addEventListener('mousedown', function (e) {
      if (track.classList.contains('is-grid-mode')) return;
      if (e.target.closest('button, a, input, select, label')) return;

      isDown = true;
      hasMoved = false;
      track.classList.add('is-dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', function () {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
    });

    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      hasMoved = true;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      track.scrollLeft = scrollLeftStart - walk;
    });

    // Prevent inadvertent link navigation when dragging
    track.addEventListener('click', function (e) {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);

    // 4. Mouse-Wheel / Trackpad Horizontal Scrolling
    if (enableMouseWheel) {
      track.addEventListener('wheel', function (e) {
        if (track.classList.contains('is-grid-mode')) return;

        // If deltaY is dominant and Shift is not pressed, provide smooth horizontal scrolling
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
          const maxScroll = track.scrollWidth - track.clientWidth;
          if (maxScroll <= 0) return;

          const atStart = track.scrollLeft <= 0 && e.deltaY < 0;
          const atEnd = track.scrollLeft >= maxScroll - 2 && e.deltaY > 0;

          // If inside scrollable boundaries, scroll horizontally without janking vertical scroll
          if (!atStart && !atEnd) {
            e.preventDefault();
            track.scrollLeft += e.deltaY * 0.9;
          }
        }
      }, { passive: false });
    }

    // 5. Scroll Event Listener (Debounced with RAF)
    let rafId = null;
    track.addEventListener('scroll', function () {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateControls);
    }, { passive: true });

    // 6. Autoplay Support
    function startAutoplay() {
      if (!isAutoplay || autoplayTimer) return;
      autoplayTimer = setInterval(function () {
        if (track.classList.contains('is-grid-mode')) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        }
      }, autoplaySpeed * 1000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (isAutoplay) {
      startAutoplay();
      carouselEl.addEventListener('mouseenter', stopAutoplay);
      carouselEl.addEventListener('mouseleave', startAutoplay);
      carouselEl.addEventListener('focusin', stopAutoplay);
      carouselEl.addEventListener('focusout', startAutoplay);
      carouselEl.addEventListener('touchstart', stopAutoplay, { passive: true });
      carouselEl.addEventListener('touchend', startAutoplay, { passive: true });
    }

    // 7. Inline Expand / Collapse Grid Toggle ("View All" / "Show Less")
    if (expandBtn) {
      expandBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const isGrid = track.classList.toggle('is-grid-mode');
        expandBtn.setAttribute('aria-expanded', isGrid ? 'true' : 'false');

        const expandLabel = expandBtn.dataset.expandLabel || 'View All';
        const collapseLabel = expandBtn.dataset.collapseLabel || 'Show Less';

        const textSpan = expandBtn.querySelector('.enamels-btn-text') || expandBtn;
        textSpan.textContent = isGrid ? collapseLabel : expandLabel;

        const navArrows = carouselEl.querySelector('.enamels-carousel-nav-arrows');
        if (navArrows) {
          navArrows.style.display = isGrid ? 'none' : '';
        }

        const progressBarWrap = carouselEl.querySelector('.enamels-carousel-progress');
        if (progressBarWrap) {
          progressBarWrap.style.display = isGrid ? 'none' : '';
        }

        if (!isGrid) {
          carouselEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          updateControls();
        }
      });
    }

    // 8. Keyboard Arrow Navigation
    track.addEventListener('keydown', function (e) {
      if (track.classList.contains('is-grid-mode')) return;
      if (e.key === 'ArrowRight') {
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    });

    // 9. Window Resize
    window.addEventListener('resize', updateControls);

    // Initial calculation
    updateControls();
  }

  function initAllCarousels() {
    document.querySelectorAll('[data-enamels-carousel]').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }

  // Shopify Theme Editor Integration
  document.addEventListener('shopify:section:load', function (e) {
    const el = e.target.querySelector('[data-enamels-carousel]');
    if (el) {
      el.__enamelsCarouselInitialized = false;
      initCarousel(el);
    }
  });

  document.addEventListener('shopify:section:select', function (e) {
    const el = e.target.querySelector('[data-enamels-carousel]');
    if (el) {
      el.__enamelsCarouselInitialized = false;
      initCarousel(el);
    }
  });

  window.initEnamelsCarousel = initCarousel;
})();
