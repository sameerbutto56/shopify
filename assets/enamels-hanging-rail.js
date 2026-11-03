/**
 * ENAMELS BOUTIQUE HANGING CLOTHING RAIL & SELECTION DRAWER
 * Inspired by Velvetica Studio's "On the Rail" luxury interactive rack
 */

(function() {
  'use strict';

  // Global State for the Hanging Rail & Drawer
  const RAIL_STATE = {
    viewMode: 'rail', // 'rail' | 'grid'
    activeDrawerProduct: null,
    activeDrawerColor: null,
    activeDrawerSize: 'M',
    isCustomSize: false,
    customMeasurements: { chest: '', waist: '', hips: '', length: '', unit: 'in' },
    embroideryEnabled: false,
    embroideryData: { line1: '', line2: '', line3: '', thread: 'Silk White', placement: 'Left Chest' },
    drawerQty: 1
  };

  window.EnamelsRailState = RAIL_STATE;

  // ------------------------------------------------------------
  // 1. RENDER HANGING RAIL HTML
  // ------------------------------------------------------------
  window.renderHangingRailHtml = function(items, settings = {}) {
    if (!items || !items.length) {
      return `
        <div class="enamels-rail-empty-box" style="padding: 60px 20px; text-align: center; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1; margin: 30px 0;">
          <div style="font-size: 40px; margin-bottom: 12px;">👔</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #102a43; margin-bottom: 6px;">No Garments on the Rail</h3>
          <p style="font-size: 13px; color: #64748b; max-width: 440px; margin: 0 auto 16px;">There are no articles available matching the selected filter combination. Try resetting your filter or switching categories.</p>
          <button type="button" class="btn-card-action" onclick="window.resetBrandFilters();" style="width: auto; padding: 10px 24px;">View All Collections</button>
        </div>
      `;
    }

    RAIL_STATE.settings = settings;
    RAIL_STATE.railItems = items;
    if (!RAIL_STATE.activeHangerId || !items.find(i => String(i.id) === String(RAIL_STATE.activeHangerId))) {
      RAIL_STATE.activeHangerId = items[0]?.id;
    }

    const finish = settings.rail_finish || 'silver';
    const showTags = settings.show_tags !== false;
    const showSwatches = settings.show_swatches !== false;

    const hangersHtml = items.map((item, idx) => {
      const isSelected = String(item.id) === String(RAIL_STATE.activeHangerId);
      const cleanTitle = item.cleanTitle || (item.title || '').replace('DEMO — ', '');
      const colors = item.colors || [];
      const activeColorName = (typeof window.getProductCardColor === 'function') ? window.getProductCardColor(item.id) : (colors[0]?.name || '');
      
      const activeImages = (typeof window.getCardActiveImages === 'function') ? window.getCardActiveImages(item.id) : [];
      const activeImg = activeImages[0] || (window.ShopifyThemeAssets?.[item.image] || item.image || '');
      const displayImg = window.ShopifyThemeAssets?.[activeImg] || activeImg;

      const seriesName = (item.series || '').toUpperCase();
      const priceText = item.basePrice ? `Rs. ${(item.basePrice).toLocaleString()}` : '';

      // Color dots on hanger tag
      const dotsHtml = showSwatches && colors.length > 0 ? `
        <div class="enamels-hanger-color-dots" onclick="event.stopPropagation();">
          ${colors.slice(0, 4).map(c => `
            <span
              class="enamels-hanger-dot ${c.name === activeColorName ? 'active' : ''}"
              style="background-color: ${c.hex};"
              title="${c.name}"
              onclick="window.setRailHangerColor('${item.id}', '${c.name.replace(/'/g, "\\'")}')"
            ></span>
          `).join('')}
        </div>
      ` : '';

      return `
        <div
          class="enamels-hanger-item ${isSelected ? 'is-selected' : ''}"
          data-product-id="${item.id}"
          data-index="${idx}"
          onmouseenter="window.hoverHanger('${item.id}')"
          onmouseleave="window.unhoverHanger('${item.id}')"
          onclick="window.handleHangerClick('${item.id}', event)"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.handleHangerClick('${item.id}', event);}"
          role="button"
          tabindex="0"
          aria-label="${cleanTitle} - ${priceText}. Press Enter to explore product details."
        >
          <div class="enamels-hanger-garment-stage">
            <!-- Screen reader & automated test title hook (invisible visually) -->
            <span class="enamels-hanger-tag-title sr-only" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;">${cleanTitle}</span>

            <!-- Full-Garment Figure Presentation (Tasteful Wardrobe Angled Profile -> Smooth Front Reveal) -->
            <div class="enamels-hanger-figure-wrap">
              <img
                src="${displayImg}"
                alt="${cleanTitle}"
                class="enamels-hanger-garment-img"
                id="rail-img-${item.id}"
                loading="eager"
                width="320"
                height="480"
                onerror="this.style.opacity='0'"
              />
              <span class="enamels-wardrobe-hint-pill">Explore Piece ↗</span>
            </div>

            <!-- Soft Realistic Floor Reflection Shadow -->
            <div class="enamels-hanger-floor-shadow"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="enamels-hanging-rail-section" id="enamels-hanging-rail-container">
        <!-- Overhead Wall Mounting Brackets -->
        <div class="enamels-rail-brackets">
          <div class="enamels-rail-bracket"></div>
          <div class="enamels-rail-bracket"></div>
          <div class="enamels-rail-bracket"></div>
        </div>

        <!-- The Physical Metallic Hanging Rail Bar -->
        <div class="enamels-rail-bar finish-${finish}"></div>

        <!-- Rail Stage & Sliding Track -->
        <div class="enamels-rail-stage">
          <!-- Previous Button -->
          <button
            type="button"
            class="enamels-rail-nav-btn prev-btn"
            id="rail-btn-prev"
            onclick="window.stepSelectedHanger(-1)"
            aria-label="Previous Garments"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Horizontal Scrolling Track -->
          <div class="enamels-rail-track-wrap">
            <div class="enamels-rail-track" id="enamels-active-rail-track">
              ${hangersHtml}
            </div>
          </div>

          <!-- Next Button -->
          <button
            type="button"
            class="enamels-rail-nav-btn next-btn"
            id="rail-btn-next"
            onclick="window.stepSelectedHanger(1)"
            aria-label="Next Garments"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Progress Track Bar -->
        <div class="enamels-rail-progress-track">
          <div class="enamels-rail-progress-thumb" id="enamels-rail-progress-thumb"></div>
        </div>

        <!-- Interactive Hanging Garment Selection Dock -->
        <div class="enamels-rail-selection-dock" id="enamels-rail-selection-dock">
          <!-- Injected dynamically by updateRailSelectionDock() -->
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. HANGING RAIL CONTROLLER & INTERACTIONS
  // ------------------------------------------------------------
  window.initHangingRail = function() {
    const track = document.getElementById('enamels-active-rail-track');
    if (!track) return;

    // Horizontal wheel navigation: allows Shift+wheel without trapping vertical page scroll!
    track.addEventListener('wheel', (e) => {
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        track.scrollLeft += (e.deltaX || e.deltaY);
        window.updateRailProgress();
      }
      // CRITICAL: Never call e.preventDefault() here so regular vertical page scrolling remains natural!
    }, { passive: true });

    // Drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
      window.updateRailProgress();
    });

    // Native touch scroll listener
    track.addEventListener('scroll', () => {
      window.updateRailProgress();
    }, { passive: true });

    window.updateRailProgress();
    window.updateRailSelectionDock();
  };

  window.selectHanger = function(productId) {
    RAIL_STATE.activeHangerId = productId;
    const allHangers = document.querySelectorAll('.enamels-hanger-item');
    allHangers.forEach(h => {
      h.classList.toggle('is-selected', h.getAttribute('data-product-id') === String(productId));
    });

    window.updateRailSelectionDock();

    const track = document.getElementById('enamels-active-rail-track');
    const targetHanger = document.querySelector(`.enamels-hanger-item[data-product-id="${productId}"]`);
    if (track && targetHanger) {
      const targetLeft = targetHanger.offsetLeft - (track.clientWidth / 2) + (targetHanger.clientWidth / 2);
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      setTimeout(window.updateRailProgress, 350);
    }
  };

  window.stepSelectedHanger = function(direction) {
    const items = RAIL_STATE.railItems || [];
    if (!items.length) return;
    const currIdx = items.findIndex(i => String(i.id) === String(RAIL_STATE.activeHangerId));
    const nextIdx = (currIdx + direction + items.length) % items.length;
    window.selectHanger(items[nextIdx].id);
  };

  window.updateRailSelectionDock = function() {
    const dock = document.getElementById('enamels-rail-selection-dock');
    if (!dock) return;
    const items = RAIL_STATE.railItems || [];
    if (!items.length) {
      dock.innerHTML = '';
      return;
    }

    const activeItem = items.find(i => String(i.id) === String(RAIL_STATE.activeHangerId)) || items[0];
    const currIdx = items.findIndex(i => String(i.id) === String(activeItem.id));
    const cleanTitle = (activeItem.title || '').replace('DEMO — ', '');
    const seriesName = (activeItem.series || 'CLINICAL').toUpperCase();
    const priceText = `Rs. ${(activeItem.basePrice || 4850).toLocaleString()}`;
    const compareText = activeItem.comparePrice ? `Rs. ${activeItem.comparePrice.toLocaleString()}` : '';
    const activeColorName = (typeof window.getProductCardColor === 'function') ? window.getProductCardColor(activeItem.id) : (activeItem.colors?.[0]?.name || 'Deep Navy');

    const colorsHtml = (activeItem.colors || []).map(c => `
      <button
        type="button"
        class="rail-dock-swatch-btn ${c.name.toLowerCase() === activeColorName.toLowerCase() ? 'active' : ''}"
        onclick="window.setRailHangerColor('${activeItem.id}', '${c.name.replace(/'/g, "\\'")}')"
        title="${c.name}"
      >
        <span class="rail-dock-swatch-circle" style="background-color: ${c.hex};"></span>
        <span>${c.name}</span>
      </button>
    `).join('');

    const sizes = activeItem.sizes || ['XS', 'S', 'M', 'L', 'XL', '2XL'];
    const sizesHtml = sizes.map(s => `<span class="rail-dock-size-pill">${s}</span>`).join('');

    const isSimple = activeItem.category === 'caps' || activeItem.category === 'sleeves' || activeItem.category === 'accessories';
    const showNames = RAIL_STATE.settings?.show_names !== false;
    const showPrices = RAIL_STATE.settings?.show_prices !== false;
    const showSwatches = RAIL_STATE.settings?.show_swatches !== false;

    dock.innerHTML = `
      <div class="rail-dock-article-info">
        <div class="rail-dock-badge-row">
          <span class="rail-dock-series-badge">${seriesName} SERIES</span>
          <span class="rail-dock-counter-badge">Garment ${currIdx + 1} of ${items.length}</span>
        </div>
        ${showNames ? `<h3 class="rail-dock-title">${cleanTitle}</h3>` : ''}
        ${showPrices ? `
        <div class="rail-dock-pricing">
          <span class="rail-dock-price">${priceText}</span>
          ${compareText ? `<span class="rail-dock-compare">${compareText}</span>` : ''}
        </div>` : ''}
      </div>

      ${showSwatches && colorsHtml ? `
      <div class="rail-dock-color-section">
        <div class="rail-dock-color-header">
          <span class="rail-dock-color-label">Article Colours:</span>
          <strong class="rail-dock-active-color" id="rail-dock-active-color-name">${activeColorName}</strong>
        </div>
        <div class="rail-dock-color-swatches" id="rail-dock-color-swatches">
          ${colorsHtml}
        </div>
      </div>` : ''}

      <div class="rail-dock-sizes-section">
        <span class="rail-dock-sizes-label">Available Sizes:</span>
        <div class="rail-dock-sizes-chips">
          ${sizesHtml}
        </div>
      </div>

      <div class="rail-dock-actions-row">
        <div class="rail-dock-nav-arrows">
          <button type="button" class="rail-dock-arrow-btn" onclick="window.stepSelectedHanger(-1)" title="Previous Garment" aria-label="Previous Garment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button type="button" class="rail-dock-arrow-btn" onclick="window.stepSelectedHanger(1)" title="Next Garment" aria-label="Next Garment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        <button
          type="button"
          class="rail-dock-cta-btn"
          id="rail-dock-cta-btn"
          onclick="${isSimple ? `window.openSimpleProductModal('${activeItem.id}')` : `window.openProductDrawer('${activeItem.id}', '${activeColorName.replace(/'/g, "\\'")}')`}"
        >
          ${isSimple ? 'Quick Add to Cart →' : 'Explore Wardrobe Piece & Add to Cart →'}
        </button>
      </div>
    `;
  };

  window.updateRailProgress = function() {
    const track = document.getElementById('enamels-active-rail-track');
    const thumb = document.getElementById('enamels-rail-progress-thumb');
    const prevBtn = document.getElementById('rail-btn-prev');
    const nextBtn = document.getElementById('rail-btn-next');
    if (!track || !thumb) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      thumb.style.width = '100%';
      thumb.style.transform = 'translateX(0)';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    const scrollRatio = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
    const thumbWidthPercent = Math.max(20, Math.min(80, (track.clientWidth / track.scrollWidth) * 100));
    thumb.style.width = `${thumbWidthPercent}%`;
    const maxTranslate = (100 - thumbWidthPercent);
    thumb.style.transform = `translateX(${scrollRatio * maxTranslate * (220 / 100)}px)`;

    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 10;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 10;
  };

  window.scrollHangingRail = function(direction) {
    const track = document.getElementById('enamels-active-rail-track');
    if (!track) return;
    const scrollAmount = 300;
    if (direction === 'left') {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  window.setRailHangerColor = function(productId, colorName) {
    if (typeof window.setProductCardColor === 'function') {
      window.setProductCardColor(productId, colorName);
    }
    const catalogue = (typeof window.getStorefrontCatalogue === 'function') ? window.getStorefrontCatalogue() : (window.EnamelsCatalogue || []);
    const item = catalogue.find(p => String(p.id) === String(productId));
    if (!item) return;

    const hangerImg = document.getElementById(`rail-img-${productId}`);
    const colorObj = (item.colors || []).find(c => c.name.toLowerCase() === colorName.toLowerCase());
    const activeImages = (typeof window.getCardActiveImages === 'function') ? window.getCardActiveImages(productId) : [];
    const activeSrc = colorObj?.image || activeImages[0] || (window.ShopifyThemeAssets?.[item.image] || item.image);

    if (hangerImg && activeSrc) {
      hangerImg.src = window.ShopifyThemeAssets?.[activeSrc] || activeSrc;
    }

    // Update active color name & swatches in dock
    const dockColorName = document.getElementById('rail-dock-active-color-name');
    if (dockColorName && String(RAIL_STATE.activeHangerId) === String(productId)) {
      dockColorName.textContent = colorName;
    }
    const dockSwatches = document.getElementById('rail-dock-color-swatches');
    if (dockSwatches && String(RAIL_STATE.activeHangerId) === String(productId)) {
      dockSwatches.querySelectorAll('.rail-dock-swatch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('title').toLowerCase() === colorName.toLowerCase());
      });
    }

    // Update CTA button to pass the active color
    const ctaBtn = document.getElementById('rail-dock-cta-btn');
    if (ctaBtn && String(RAIL_STATE.activeHangerId) === String(productId)) {
      const isSimple = item.category === 'caps' || item.category === 'sleeves' || item.category === 'accessories';
      ctaBtn.onclick = function() {
        if (isSimple) {
          window.openSimpleProductModal(item.id);
        } else {
          window.openProductDrawer(item.id, colorName);
        }
      };
    }
  };

  window.hoverHanger = function(productId) {
    const itemEl = document.querySelector(`.enamels-hanger-item[data-product-id="${productId}"]`);
    if (itemEl) {
      itemEl.classList.add('is-hovered');
    }
    // Update active dock selection seamlessly on hover
    if (String(RAIL_STATE.activeHangerId) !== String(productId)) {
      RAIL_STATE.activeHangerId = productId;
      window.updateRailSelectionDock();
    }
  };

  window.unhoverHanger = function(productId) {
    const itemEl = document.querySelector(`.enamels-hanger-item[data-product-id="${productId}"]`);
    if (itemEl) {
      itemEl.classList.remove('is-hovered');
    }
  };

  window.handleHangerClick = function(productId, event) {
    if (event) {
      if (event.target && event.target.closest && event.target.closest('.enamels-hanger-dot')) {
        return; // color dot handled by its own onclick
      }
    }
    window.selectHanger(productId);

    // Open full product experience drawer on click
    const item = (RAIL_STATE.railItems || []).find(i => String(i.id) === String(productId));
    const isSimple = item && (item.category === 'caps' || item.category === 'sleeves' || item.category === 'accessories');
    if (isSimple && typeof window.openSimpleProductModal === 'function') {
      window.openSimpleProductModal(productId);
    } else {
      const activeColorName = (typeof window.getProductCardColor === 'function') ? window.getProductCardColor(productId) : null;
      window.openProductDrawer(productId, activeColorName);
    }
  };

  // ------------------------------------------------------------
  // 3. SLIDE-OUT PRODUCT SELECTION DRAWER CONTROLLER
  // ------------------------------------------------------------
  window.openProductDrawer = function(productId, initialColorName = null) {
    const catalogue = (typeof window.getStorefrontCatalogue === 'function') ? window.getStorefrontCatalogue() : (window.EnamelsCatalogue || []);
    const item = catalogue.find(p => String(p.id) === String(productId));
    if (!item) {
      console.warn('Product not found for drawer:', productId);
      return;
    }

    RAIL_STATE.activeDrawerProduct = item;

    // Pick active color: from card/rail or first available
    const activeCardColor = (typeof window.getProductCardColor === 'function') ? window.getProductCardColor(item.id) : null;
    let chosenColor = item.colors?.[0] || { name: 'Deep Navy', hex: '#102A43', image: item.image };
    if (initialColorName) {
      const found = (item.colors || []).find(c => c.name.toLowerCase() === initialColorName.toLowerCase());
      if (found) chosenColor = found;
    } else if (activeCardColor) {
      const found = (item.colors || []).find(c => c.name.toLowerCase() === activeCardColor.toLowerCase());
      if (found) chosenColor = found;
    }
    RAIL_STATE.activeDrawerColor = chosenColor;
    RAIL_STATE.activeDrawerSize = item.sizes?.[0] || 'M';
    RAIL_STATE.isCustomSize = false;
    RAIL_STATE.drawerQty = 1;
    RAIL_STATE.embroideryEnabled = false;

    // Populate drawer DOM
    const drawerBackdrop = document.getElementById('enamels-product-selection-drawer');
    if (!drawerBackdrop) {
      // Create drawer if not exists
      createProductDrawerMarkup();
    }

    window.populateProductDrawer(item);

    const drawer = document.getElementById('enamels-product-selection-drawer');
    if (drawer) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeProductDrawer = function() {
    const drawer = document.getElementById('enamels-product-selection-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
      if (RAIL_STATE.activeHangerId) {
        const activeEl = document.querySelector(`.enamels-hanger-item[data-product-id="${RAIL_STATE.activeHangerId}"]`);
        if (activeEl) {
          activeEl.focus({ preventScroll: true });
        }
      }
    }
  };

  window.populateProductDrawer = function(item) {
    const cleanTitle = (item.title || '').replace('DEMO — ', '');
    const seriesName = (item.series || 'CLINICAL').toUpperCase();
    const activeColor = RAIL_STATE.activeDrawerColor;

    // Breadcrumb & Title
    const bCrumb = document.getElementById('drawer-crumb-text');
    const titleEl = document.getElementById('drawer-product-title');
    const skuEl = document.getElementById('drawer-product-sku');
    const priceEl = document.getElementById('drawer-price-display');
    const compPriceEl = document.getElementById('drawer-compare-price');

    if (bCrumb) bCrumb.textContent = `${item.gender === 'women' ? "Women's" : "Men's"} · ${seriesName} Series`;
    if (titleEl) titleEl.textContent = cleanTitle;
    if (skuEl) skuEl.textContent = `SKU: ${item.sku || 'ENM-SCRUB'}`;
    if (priceEl) priceEl.textContent = `Rs. ${(item.basePrice || 4850).toLocaleString()}`;
    if (compPriceEl) compPriceEl.textContent = item.comparePrice ? `Rs. ${item.comparePrice.toLocaleString()}` : '';

    // Active image
    const mediaImg = document.getElementById('drawer-media-img');
    const colorImages = (typeof window.getCardActiveImages === 'function') ? window.getCardActiveImages(item.id) : [];
    const mainImgSrc = (activeColor && activeColor.image) ? activeColor.image : (colorImages[0] || item.image);
    if (mediaImg) {
      mediaImg.src = window.ShopifyThemeAssets?.[mainImgSrc] || mainImgSrc;
      mediaImg.alt = cleanTitle;
    }

    // Fabric Specs, Description & Stock Availability
    const fabricText = document.getElementById('drawer-product-fabric-text');
    const descText = document.getElementById('drawer-product-desc-text');
    const stockLabel = document.getElementById('drawer-stock-label');

    if (fabricText) fabricText.textContent = item.fabric || item.badge || 'Executive Antimicrobial Micro-Twill';
    if (descText) descText.textContent = item.description || 'Sophisticated clinical apparel tailored with double-needle reinforcement for surgical consultants and hospital rounds.';
    if (stockLabel) stockLabel.textContent = 'In Stock · Guaranteed 24–48h Dispatch';

    // Multi-image gallery strip
    const galleryStrip = document.getElementById('drawer-gallery-strip');
    if (galleryStrip) {
      let allImages = [];
      if (item.images && item.images.length) {
        allImages = item.images.map(i => (typeof i === 'string' ? i : i.src));
      }
      if (item.colors && item.colors.length) {
        item.colors.forEach(c => {
          if (c.image && !allImages.includes(c.image)) allImages.push(c.image);
        });
      }
      if (!allImages.includes(mainImgSrc)) {
        allImages.unshift(mainImgSrc);
      }
      if (allImages.length > 1) {
        galleryStrip.innerHTML = allImages.map((src, idx) => `
          <img
            src="${window.ShopifyThemeAssets?.[src] || src}"
            class="enamels-drawer-gallery-thumb ${src === mainImgSrc ? 'active' : ''}"
            alt="Product view ${idx + 1}"
            onclick="window.setDrawerMediaPhoto('${src}', this)"
          />
        `).join('');
        galleryStrip.style.display = 'flex';
      } else {
        galleryStrip.style.display = 'none';
      }
    }

    // Color Swatches
    const colorSwatchesWrap = document.getElementById('drawer-color-swatches');
    const activeColorLabel = document.getElementById('drawer-active-color-name');
    if (activeColorLabel) activeColorLabel.textContent = activeColor?.name || 'Deep Navy';

    if (colorSwatchesWrap && item.colors) {
      colorSwatchesWrap.innerHTML = item.colors.map(c => `
        <button
          type="button"
          class="enamels-drawer-color-btn ${c.name === activeColor?.name ? 'active' : ''}"
          onclick="window.selectDrawerColor('${c.name.replace(/'/g, "\\'")}')"
        >
          <span class="enamels-drawer-color-dot" style="background-color: ${c.hex};"></span>
          <span>${c.name}</span>
        </button>
      `).join('');
    }

    // Standard Sizes
    const sizesGrid = document.getElementById('drawer-sizes-grid');
    const availableSizes = item.sizes || ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
    if (sizesGrid) {
      sizesGrid.innerHTML = availableSizes.map(sz => `
        <button
          type="button"
          class="enamels-drawer-size-btn ${sz === RAIL_STATE.activeDrawerSize && !RAIL_STATE.isCustomSize ? 'active' : ''}"
          onclick="window.selectDrawerSize('${sz}')"
        >
          ${sz}
        </button>
      `).join('');
    }

    // Update quantity & price
    const qtyVal = document.getElementById('drawer-qty-val');
    if (qtyVal) qtyVal.textContent = RAIL_STATE.drawerQty;
    window.recalculateDrawerTotal();
  };

  window.setDrawerMediaPhoto = function(src, thumbEl) {
    const mediaImg = document.getElementById('drawer-media-img');
    if (mediaImg) {
      mediaImg.src = window.ShopifyThemeAssets?.[src] || src;
    }
    const galleryStrip = document.getElementById('drawer-gallery-strip');
    if (galleryStrip) {
      galleryStrip.querySelectorAll('.enamels-drawer-gallery-thumb').forEach(t => t.classList.remove('active'));
      if (thumbEl) thumbEl.classList.add('active');
    }
  };

  window.selectDrawerColor = function(colorName) {
    const item = RAIL_STATE.activeDrawerProduct;
    if (!item) return;

    const found = (item.colors || []).find(c => c.name.toLowerCase() === colorName.toLowerCase());
    if (found) {
      RAIL_STATE.activeDrawerColor = found;
      window.setRailHangerColor(item.id, found.name);
      window.populateProductDrawer(item);
    }
  };

  window.selectDrawerSize = function(size) {
    RAIL_STATE.activeDrawerSize = size;
    RAIL_STATE.isCustomSize = false;

    // Unselect custom 'C' if open
    const customBody = document.getElementById('drawer-custom-c-body');
    if (customBody) customBody.classList.remove('open');

    const sizesGrid = document.getElementById('drawer-sizes-grid');
    if (sizesGrid) {
      sizesGrid.querySelectorAll('.enamels-drawer-size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === size);
      });
    }
    window.recalculateDrawerTotal();
  };

  window.toggleCustomCMeasurements = function() {
    const customBody = document.getElementById('drawer-custom-c-body');
    if (!customBody) return;

    const isOpen = customBody.classList.contains('open');
    if (isOpen) {
      customBody.classList.remove('open');
      RAIL_STATE.isCustomSize = false;
    } else {
      customBody.classList.add('open');
      RAIL_STATE.isCustomSize = true;
      // Deselect standard size buttons
      const sizesGrid = document.getElementById('drawer-sizes-grid');
      if (sizesGrid) {
        sizesGrid.querySelectorAll('.enamels-drawer-size-btn').forEach(btn => btn.classList.remove('active'));
      }
    }
    window.recalculateDrawerTotal();
  };

  window.setCustomUnit = function(unit) {
    RAIL_STATE.customMeasurements.unit = unit;
    document.querySelectorAll('.drawer-unit-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.unit === unit);
    });
  };

  window.toggleDrawerEmbroidery = function(checked) {
    RAIL_STATE.embroideryEnabled = checked;
    const embBody = document.getElementById('drawer-embroidery-body');
    if (embBody) embBody.style.display = checked ? 'block' : 'none';
    window.recalculateDrawerTotal();
  };

  window.updateDrawerQty = function(delta) {
    RAIL_STATE.drawerQty = Math.max(1, RAIL_STATE.drawerQty + delta);
    const qtyVal = document.getElementById('drawer-qty-val');
    if (qtyVal) qtyVal.textContent = RAIL_STATE.drawerQty;
    window.recalculateDrawerTotal();
  };

  window.recalculateDrawerTotal = function() {
    const item = RAIL_STATE.activeDrawerProduct;
    if (!item) return;

    let base = item.basePrice || 4850;
    let customAddon = RAIL_STATE.isCustomSize ? 500 : 0;
    let embAddon = RAIL_STATE.embroideryEnabled ? 350 : 0;

    const unitPrice = base + customAddon + embAddon;
    const totalPrice = unitPrice * RAIL_STATE.drawerQty;

    const totalEl = document.getElementById('drawer-btn-total-amount');
    if (totalEl) totalEl.textContent = `Rs. ${totalPrice.toLocaleString()}`;
  };

  // Direct Shopify Cart (/cart/add.js) Checkout Integration
  window.addDrawerProductToCart = function() {
    const item = RAIL_STATE.activeDrawerProduct;
    if (!item) return;

    const addBtn = document.getElementById('drawer-submit-add-btn');
    if (addBtn) {
      addBtn.disabled = true;
      addBtn.textContent = 'Adding to Cart...';
    }

    const colorName = RAIL_STATE.activeDrawerColor?.name || 'Deep Navy';
    const sizeName = RAIL_STATE.isCustomSize ? 'Custom (C)' : RAIL_STATE.activeDrawerSize;

    // Collect line item properties
    const properties = {
      'Size': sizeName,
      'Colour': colorName
    };

    if (RAIL_STATE.isCustomSize) {
      const chest = document.getElementById('drawer-custom-chest')?.value || '40';
      const waist = document.getElementById('drawer-custom-waist')?.value || '34';
      const hips = document.getElementById('drawer-custom-hips')?.value || '42';
      const length = document.getElementById('drawer-custom-length')?.value || 'Standard';
      const unit = RAIL_STATE.customMeasurements.unit || 'in';

      properties['Tailoring Specification'] = `Custom Measurements: Chest: ${chest}${unit}, Waist: ${waist}${unit}, Hips: ${hips}${unit}, Length: ${length}`;
    }

    if (RAIL_STATE.embroideryEnabled) {
      const line1 = document.getElementById('drawer-emb-line1')?.value || '';
      const line2 = document.getElementById('drawer-emb-line2')?.value || '';
      const thread = document.getElementById('drawer-emb-thread')?.value || 'Silk White';

      if (line1) properties['Embroidery Line 1'] = line1;
      if (line2) properties['Embroidery Line 2'] = line2;
      properties['Thread Colour'] = thread;
    }

    const variantId = RAIL_STATE.activeDrawerColor?.variantId || item.variantId || 67718805684512;

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: RAIL_STATE.drawerQty,
        properties: properties
      })
    })
    .then(res => res.json())
    .then(data => {
      if (addBtn) {
        addBtn.disabled = false;
        addBtn.innerHTML = '✓ Added to Cart!';
        setTimeout(() => {
          addBtn.innerHTML = 'Add to Cart — <span id="drawer-btn-total-amount"></span>';
          window.recalculateDrawerTotal();
        }, 1500);
      }

      // Close drawer and open real Shopify Cart Drawer
      window.closeProductDrawer();

      // Trigger Cart Drawer update
      if (typeof window.openCartDrawer === 'function') {
        window.openCartDrawer();
      } else if (typeof window.syncCartCount === 'function') {
        window.syncCartCount();
      }
    })
    .catch(err => {
      console.error('Cart add error:', err);
      if (addBtn) {
        addBtn.disabled = false;
        addBtn.textContent = 'Add to Cart';
      }
      alert('Could not add to cart. Please try again.');
    });
  };

  // ------------------------------------------------------------
  // 4. VIEW SWITCHER (RAIL vs GRID)
  // ------------------------------------------------------------
  window.switchEnamelsView = function(mode) {
    RAIL_STATE.viewMode = mode;
    const railContainer = document.getElementById('enamels-hanging-rail-container');
    const gridContainer = document.getElementById('scrubs-products-grid');
    const btnRail = document.getElementById('enamels-view-btn-rail');
    const btnGrid = document.getElementById('enamels-view-btn-grid');

    if (btnRail) btnRail.classList.toggle('active', mode === 'rail');
    if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');

    if (railContainer) railContainer.style.display = mode === 'rail' ? 'block' : 'none';
    if (gridContainer) gridContainer.style.display = mode === 'grid' ? 'grid' : 'none';

    if (mode === 'rail') {
      window.initHangingRail();
    }
  };

  // Helper to create the Drawer DOM once
  function createProductDrawerMarkup() {
    if (document.getElementById('enamels-product-selection-drawer')) return;

    const drawerHtml = `
      <div class="enamels-product-drawer-backdrop" id="enamels-product-selection-drawer" onclick="window.closeProductDrawer()">
        <div class="enamels-product-drawer-panel" onclick="event.stopPropagation()">
          <!-- Drawer Header -->
          <div class="enamels-drawer-header">
            <div>
              <span class="enamels-drawer-breadcrumb" id="drawer-crumb-text">Men's Scrubs</span>
              <h3 class="enamels-drawer-title" id="drawer-product-title">Garment Name</h3>
            </div>
            <button type="button" class="enamels-drawer-close-btn" onclick="window.closeProductDrawer()" aria-label="Close Drawer">✕</button>
          </div>

          <!-- Drawer Body -->
          <div class="enamels-drawer-body">
            <!-- Media Box -->
            <div>
              <div class="enamels-drawer-media-box">
                <img src="" alt="Garment" id="drawer-media-img" class="enamels-drawer-media-img" />
              </div>
              <div class="enamels-drawer-gallery-strip" id="drawer-gallery-strip"></div>
            </div>

            <!-- Price & SKU -->
            <div class="enamels-drawer-pricing-row">
              <div>
                <span class="enamels-drawer-price-main" id="drawer-price-display">Rs. 4,850</span>
                <span class="enamels-drawer-price-compare" id="drawer-compare-price"></span>
              </div>
              <span class="enamels-drawer-sku" id="drawer-product-sku">SKU: ENM-001</span>
            </div>

            <!-- Clinical Fabric Specifications & Description -->
            <div class="enamels-drawer-info-block">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                <div class="enamels-drawer-fabric-badge">
                  <span>🔬</span>
                  <span id="drawer-product-fabric-text">Antimicrobial Fluid-Barrier Twill</span>
                </div>
                <div class="enamels-drawer-stock-status">
                  <span class="stock-pulse-dot"></span>
                  <span id="drawer-stock-label">In Stock · Guaranteed 24–48h Dispatch</span>
                </div>
              </div>
              <p class="enamels-drawer-description-text" id="drawer-product-desc-text">
                Purpose-built medical scrub apparel engineered for surgical freedom and clinical rounds.
              </p>
            </div>

            <!-- Color Swatches -->
            <div>
              <div class="enamels-drawer-section-title">
                <span>Select Colour:</span>
                <strong id="drawer-active-color-name" style="color: #00b8a9;">Deep Navy</strong>
              </div>
              <div class="enamels-drawer-color-swatches" id="drawer-color-swatches"></div>
            </div>

            <!-- Standard Sizes -->
            <div>
              <div class="enamels-drawer-section-title">
                <span>Select Standard Size:</span>
                <button type="button" onclick="if(window.openSizeChartModal) window.openSizeChartModal();" style="background:none; border:none; color:#00b8a9; font-size:11px; font-weight:700; cursor:pointer; text-decoration:underline;">📏 Size Guide</button>
              </div>
              <div class="enamels-drawer-sizes-grid" id="drawer-sizes-grid"></div>
            </div>

            <!-- Custom 'C' Measurements -->
            <div class="enamels-custom-c-toggle-wrap">
              <div class="enamels-custom-c-header" onclick="window.toggleCustomCMeasurements()">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:14px;">🪡</span>
                  <div>
                    <strong style="font-size:12px; color:#102a43; display:block;">Custom 'C' Fit Measurements (+Rs. 500)</strong>
                    <span style="font-size:11px; color:#64748b;">Tailored to your exact chest, waist & length</span>
                  </div>
                </div>
                <span style="font-size:14px; color:#64748b;">▾</span>
              </div>
              <div class="enamels-custom-c-body" id="drawer-custom-c-body">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                  <span style="font-size:11px; font-weight:600; color:#475569;">Measurement Unit:</span>
                  <div style="display:inline-flex; border:1px solid #cbd5e1; border-radius:4px; overflow:hidden;">
                    <button type="button" class="drawer-unit-toggle-btn active" data-unit="in" onclick="window.setCustomUnit('in')" style="padding:3px 8px; font-size:10px; border:none; background:#102a43; color:#fff; cursor:pointer;">Inches</button>
                    <button type="button" class="drawer-unit-toggle-btn" data-unit="cm" onclick="window.setCustomUnit('cm')" style="padding:3px 8px; font-size:10px; border:none; background:#f8fafc; color:#64748b; cursor:pointer;">CM</button>
                  </div>
                </div>
                <div class="enamels-custom-c-inputs-grid">
                  <div class="enamels-custom-input-group">
                    <label for="drawer-custom-chest">Chest Width</label>
                    <input type="text" id="drawer-custom-chest" placeholder="e.g. 40" />
                  </div>
                  <div class="enamels-custom-input-group">
                    <label for="drawer-custom-waist">Waist</label>
                    <input type="text" id="drawer-custom-waist" placeholder="e.g. 34" />
                  </div>
                  <div class="enamels-custom-input-group">
                    <label for="drawer-custom-hips">Hips</label>
                    <input type="text" id="drawer-custom-hips" placeholder="e.g. 42" />
                  </div>
                  <div class="enamels-custom-input-group">
                    <label for="drawer-custom-length">Shirt / Trouser Length</label>
                    <input type="text" id="drawer-custom-length" placeholder="Standard or custom" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Embroidery / Name Engraving -->
            <div class="enamels-embroidery-box">
              <label style="display:flex; align-items:center; justify-content:space-between; cursor:pointer; margin:0;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span>✨</span>
                  <strong style="font-size:12px; color:#0f766e;">Doctor Name Embroidery (+Rs. 350)</strong>
                </div>
                <input type="checkbox" id="drawer-emb-checkbox" onchange="window.toggleDrawerEmbroidery(this.checked)" style="width:16px; height:16px; accent-color:#00b8a9; cursor:pointer;" />
              </label>
              <div id="drawer-embroidery-body" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed #99f6e4;">
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <div>
                    <label style="font-size:10px; font-weight:700; color:#0f766e; display:block; margin-bottom:2px;">Line 1 (Name & Title)</label>
                    <input type="text" id="drawer-emb-line1" placeholder="Enter Full Name" style="width:100%; padding:6px 10px; font-size:12px; border:1px solid #99f6e4; border-radius:4px;" />
                  </div>
                  <div>
                    <label style="font-size:10px; font-weight:700; color:#0f766e; display:block; margin-bottom:2px;">Line 2 (Department / Clinic)</label>
                    <input type="text" id="drawer-emb-line2" placeholder="Department / Clinic" style="width:100%; padding:6px 10px; font-size:12px; border:1px solid #99f6e4; border-radius:4px;" />
                  </div>
                  <div>
                    <label style="font-size:10px; font-weight:700; color:#0f766e; display:block; margin-bottom:2px;">Thread Colour</label>
                    <select id="drawer-emb-thread" style="width:100%; padding:6px 8px; font-size:11px; border:1px solid #99f6e4; border-radius:4px; background:#fff;">
                      <option value="Silk White">Silk White</option>
                      <option value="Medical Cyan">Medical Cyan</option>
                      <option value="Golden Yellow">Golden Yellow</option>
                      <option value="Navy Blue">Navy Blue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="enamels-drawer-footer">
            <div class="enamels-drawer-qty-row">
              <span style="font-size:12px; font-weight:600; color:#475569;">Quantity:</span>
              <div class="enamels-drawer-qty-selector">
                <button type="button" class="enamels-drawer-qty-btn" onclick="window.updateDrawerQty(-1)">−</button>
                <span class="enamels-drawer-qty-val" id="drawer-qty-val">1</span>
                <button type="button" class="enamels-drawer-qty-btn" onclick="window.updateDrawerQty(1)">+</button>
              </div>
            </div>
            <button
              type="button"
              class="enamels-drawer-add-btn"
              id="drawer-submit-add-btn"
              onclick="window.addDrawerProductToCart()"
            >
              Add to Cart — <span id="drawer-btn-total-amount">Rs. 4,850</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);

    // Keyboard 'Escape' closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeProductDrawer();
      }
    });
  }

  // Auto-initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createProductDrawerMarkup();
    });
  } else {
    createProductDrawerMarkup();
  }

})();
