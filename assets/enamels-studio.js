/**
 * ENAMELS ONLINE — VISUAL DRAG-AND-DROP STUDIO CONTROLLER
 * Empowers store owners to manage homepage content, upload images via drag-and-drop,
 * edit text, reorder blocks, toggle section visibility, and tweak fine-grained tokens.
 * Synchronizes Edit Studio changes in real-time with the live preview and storefront.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'enamels_studio_config_v1';

  // Default configuration state
  const DEFAULT_CONFIG = {
    announcementText: '',
    headerPhone: '',
    customizerTitle: 'Make Your Own Scrubs',
    customizerDesc: 'Experience our interactive customization studio. Select proprietary medical fabrics, approved hospital shades, custom measurements in inches or cm, size auto-fill, C (Custom) fit, and personalized doctor title & hospital crest embroidery.',
    customizerBtn: 'Launch Customizer Studio →',
    homeserviceTitle: 'Home Service — At Your Convenience',
    homeserviceDesc: 'Request an in-person visit from an Enamels representative in Lahore who will bring genuine fabric swatches, assist with precision body measurements, and help place your order at your hospital, clinic, or residence.',
    homeserviceFee: '',
    
    // Category Layout & Alignment Controls
    categorySectionAlign: 'center',
    categorySectionMaxWidth: 1320,
    categoryColumnsVerticalAlign: 'start',
    categoryHeaderAlign: 'left',
    categoryThumbnailsAlign: 'center',
    categoryTextAlign: 'left',
    categoryThumbWidth: 160,
    categoryTitle: 'Shop by Category',
    categoryTag: 'QUICK CATALOGUE DISCOVERY',
    categorySub: 'Browse clinical apparel, scrubs, lab coats, and medical accessories tailored for every role.',
    showCategoryTitle: true,
    showCategoryTag: true,
    showCategorySub: true,

    // Video Positioning & Elements
    videoUrl: '',
    videoTitle: '',
    videoDesc: '',
    videoBadge: 'CINEMATIC SHOWCASE',
    videoPoster: '',
    videoCtaLabel: 'Explore Collection →',
    videoCtaLink: '',
    videoOffsetTop: 20,
    videoHorizontalAlign: 'center',
    videoMaxWidth: 560,
    videoAspectRatio: '16_9',
    videoObjectFit: 'cover',
    showPauseButton: true,
    showVideoOverlay: true,
    showVideoCta: true,
    showVideoBadge: true,
    showVideoTitle: true,
    showVideoDesc: true,
    videoAutoplay: true,
    videoMuted: true,
    videoLoop: true,

    colorPrimary: '#008779',
    colorDark: '#102a43',
    gridColumns: '4',
    aspectRatio: '3/4',
    borderRadius: '8px',
    brands: [],
    categories: [],
    slides: [],
    sections: {
      announcement: true,
      header: true,
      slideshow: true,
      brands: true,
      categoryVideo: true,
      liveCatalogue: true,
      customizerBanner: true,
      homeService: true,
      seasonalEditions: true,
      signatureSeries: true,
      hospitalShades: true,
      testimonials: true,
      trustBadges: true,
      hangingRail: true
    }
  };

  let studioConfig = loadConfig();

  function loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          sections: { ...DEFAULT_CONFIG.sections, ...(parsed.sections || {}) },
          brands: Array.isArray(parsed.brands) ? parsed.brands : [],
          categories: Array.isArray(parsed.categories) ? parsed.categories : [],
          slides: Array.isArray(parsed.slides) ? parsed.slides : []
        };
      }
    } catch (e) {
      console.warn('Enamels Studio: error loading config', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studioConfig));
    } catch (e) {
      console.error('Enamels Studio: error saving config', e);
    }
  }

  // Panel Open / Close / Toggle
  window.toggleStudioPanel = function () {
    const drawer = document.getElementById('enamels-studio-drawer');
    if (!drawer) return;
    const isActive = drawer.classList.contains('active');
    if (isActive) {
      window.closeStudioPanel();
    } else {
      window.openStudioPanel();
    }
  };

  window.openStudioPanel = function () {
    const drawer = document.getElementById('enamels-studio-drawer');
    const overlay = document.getElementById('enamels-studio-overlay');
    if (!drawer) return;
    populateStudioInputs();
    renderAllStudioLists();
    bindRealtimeStudioInputs();
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeStudioPanel = function () {
    const drawer = document.getElementById('enamels-studio-drawer');
    const overlay = document.getElementById('enamels-studio-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Tab Switching
  window.switchStudioTab = function (tabName) {
    document.querySelectorAll('.enamels-studio-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.enamels-studio-panel-content').forEach(p => p.classList.remove('active'));

    const activeBtn = document.getElementById(`studio-tab-${tabName}`);
    const activePanel = document.getElementById(`studio-content-${tabName}`);
    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
  };

  // Populate Input Fields from State
  function populateStudioInputs() {
    setVal('studio-announcement-text', studioConfig.announcementText);
    setVal('studio-header-phone', studioConfig.headerPhone);
    setVal('studio-customizer-title', studioConfig.customizerTitle);
    setVal('studio-customizer-desc', studioConfig.customizerDesc);
    setVal('studio-customizer-btn', studioConfig.customizerBtn);
    setVal('studio-homeservice-title', studioConfig.homeserviceTitle);
    setVal('studio-homeservice-desc', studioConfig.homeserviceDesc);
    setVal('studio-homeservice-fee', studioConfig.homeserviceFee);

    // Category Section Alignment & Dimensions
    setBtnGroupActive('btn-group-cat-section-align', studioConfig.categorySectionAlign || 'center');
    setVal('studio-cat-max-width', studioConfig.categorySectionMaxWidth || 1320);
    const badgeCatMax = document.getElementById('badge-cat-max-width');
    if (badgeCatMax) badgeCatMax.textContent = (studioConfig.categorySectionMaxWidth || 1320) + 'px';

    setBtnGroupActive('btn-group-cat-col-valign', studioConfig.categoryColumnsVerticalAlign || 'start');
    setBtnGroupActive('btn-group-cat-header-align', studioConfig.categoryHeaderAlign || 'left');
    setBtnGroupActive('btn-group-cat-thumbs-align', studioConfig.categoryThumbnailsAlign || 'center');
    setBtnGroupActive('btn-group-cat-text-align', studioConfig.categoryTextAlign || 'left');

    setVal('studio-cat-thumb-width', studioConfig.categoryThumbWidth || 160);
    const badgeCatThumb = document.getElementById('badge-cat-thumb-width');
    if (badgeCatThumb) badgeCatThumb.textContent = (studioConfig.categoryThumbWidth || 160) + 'px';

    setVal('studio-category-title', studioConfig.categoryTitle);
    setVal('studio-category-tag', studioConfig.categoryTag);
    setVal('studio-category-sub', studioConfig.categorySub);

    // Video Positioning & Sizing
    setVal('studio-video-offset-top', studioConfig.videoOffsetTop !== undefined ? studioConfig.videoOffsetTop : 20);
    const badgeVidOffset = document.getElementById('badge-video-offset-top');
    if (badgeVidOffset) badgeVidOffset.textContent = (studioConfig.videoOffsetTop !== undefined ? studioConfig.videoOffsetTop : 20) + 'px';

    setBtnGroupActive('btn-group-video-align', studioConfig.videoHorizontalAlign || 'center');
    setVal('studio-video-max-width', studioConfig.videoMaxWidth || 560);
    const badgeVidWidth = document.getElementById('badge-video-max-width');
    if (badgeVidWidth) badgeVidWidth.textContent = (studioConfig.videoMaxWidth || 560) + 'px';

    setVal('studio-video-aspect-ratio', studioConfig.videoAspectRatio || '16_9');
    setVal('studio-video-object-fit', studioConfig.videoObjectFit || 'cover');

    // Video Visibility & Switches
    setCheckbox('studio-video-show-pause', studioConfig.showPauseButton !== false);
    setCheckbox('studio-video-show-overlay', studioConfig.showVideoOverlay !== false);
    setCheckbox('studio-video-show-cta', studioConfig.showVideoCta !== false);
    setCheckbox('studio-video-show-badge', studioConfig.showVideoBadge !== false);
    setCheckbox('studio-video-show-title', studioConfig.showVideoTitle !== false);
    setCheckbox('studio-video-show-desc', studioConfig.showVideoDesc !== false);
    setCheckbox('studio-video-autoplay', studioConfig.videoAutoplay !== false);
    setCheckbox('studio-video-muted', studioConfig.videoMuted !== false);
    setCheckbox('studio-video-loop', studioConfig.videoLoop !== false);

    // Video Media & Text
    setVal('studio-video-url', studioConfig.videoUrl);
    setVal('studio-video-badge', studioConfig.videoBadge);
    setVal('studio-video-title', studioConfig.videoTitle);
    setVal('studio-video-desc', studioConfig.videoDesc);
    setVal('studio-video-cta-label', studioConfig.videoCtaLabel);
    setVal('studio-video-cta-link', studioConfig.videoCtaLink);

    setVal('studio-color-primary', studioConfig.colorPrimary);
    setVal('studio-color-primary-text', studioConfig.colorPrimary);
    setVal('studio-color-dark', studioConfig.colorDark);
    setVal('studio-color-dark-text', studioConfig.colorDark);
    setVal('studio-grid-columns', studioConfig.gridColumns);
    setVal('studio-aspect-ratio', studioConfig.aspectRatio);
    setVal('studio-border-radius', studioConfig.borderRadius);

    if (studioConfig.videoPoster) {
      showPreviewBox('video-poster', studioConfig.videoPoster);
    }
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }

  function setCheckbox(id, checked) {
    const el = document.getElementById(id);
    if (el && checked !== undefined) el.checked = Boolean(checked);
  }

  function setBtnGroupActive(groupId, activeVal) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.querySelectorAll('.studio-btn-group-item').forEach(btn => {
      const match = btn.getAttribute('data-align') === String(activeVal);
      btn.classList.toggle('active', match);
    });
  }

  window.setStudioAlignment = function (key, val, btnEl) {
    studioConfig[key] = val;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.studio-btn-group-item').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    saveConfig();
    applyStudioConfigToStorefront();
  };

  window.updateStudioRange = function (key, val, badgeId, unit) {
    studioConfig[key] = Number(val);
    const badge = document.getElementById(badgeId);
    if (badge) badge.textContent = val + (unit || '');
    saveConfig();
    applyStudioConfigToStorefront();
  };

  // Real-Time Two-Way Input Binding
  let realtimeBound = false;
  function bindRealtimeStudioInputs() {
    if (realtimeBound) return;
    realtimeBound = true;

    const liveFields = [
      { id: 'studio-announcement-text', key: 'announcementText' },
      { id: 'studio-header-phone', key: 'headerPhone' },
      { id: 'studio-customizer-title', key: 'customizerTitle' },
      { id: 'studio-customizer-desc', key: 'customizerDesc' },
      { id: 'studio-customizer-btn', key: 'customizerBtn' },
      { id: 'studio-homeservice-title', key: 'homeserviceTitle' },
      { id: 'studio-homeservice-desc', key: 'homeserviceDesc' },
      { id: 'studio-homeservice-fee', key: 'homeserviceFee' },
      { id: 'studio-category-title', key: 'categoryTitle' },
      { id: 'studio-category-tag', key: 'categoryTag' },
      { id: 'studio-category-sub', key: 'categorySub' },
      { id: 'studio-video-url', key: 'videoUrl' },
      { id: 'studio-video-badge', key: 'videoBadge' },
      { id: 'studio-video-title', key: 'videoTitle' },
      { id: 'studio-video-desc', key: 'videoDesc' },
      { id: 'studio-video-cta-label', key: 'videoCtaLabel' },
      { id: 'studio-video-cta-link', key: 'videoCtaLink' }
    ];

    liveFields.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function (e) {
          studioConfig[key] = e.target.value;
          saveConfig();
          applyStudioConfigToStorefront();
        });
      }
    });

    // Video switches
    const switchFields = [
      { id: 'studio-video-show-pause', key: 'showPauseButton' },
      { id: 'studio-video-show-overlay', key: 'showVideoOverlay' },
      { id: 'studio-video-show-cta', key: 'showVideoCta' },
      { id: 'studio-video-show-badge', key: 'showVideoBadge' },
      { id: 'studio-video-show-title', key: 'showVideoTitle' },
      { id: 'studio-video-show-desc', key: 'showVideoDesc' },
      { id: 'studio-video-autoplay', key: 'videoAutoplay' },
      { id: 'studio-video-muted', key: 'videoMuted' },
      { id: 'studio-video-loop', key: 'videoLoop' }
    ];

    switchFields.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', function (e) {
          studioConfig[key] = e.target.checked;
          saveConfig();
          applyStudioConfigToStorefront();
        });
      }
    });

    // Video dropdown selects
    const selectFields = [
      { id: 'studio-video-aspect-ratio', key: 'videoAspectRatio' },
      { id: 'studio-video-object-fit', key: 'videoObjectFit' },
      { id: 'studio-grid-columns', key: 'gridColumns' },
      { id: 'studio-aspect-ratio', key: 'aspectRatio' },
      { id: 'studio-border-radius', key: 'borderRadius' }
    ];

    selectFields.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', function (e) {
          studioConfig[key] = e.target.value;
          saveConfig();
          applyStudioConfigToStorefront();
        });
      }
    });

    // Color Pickers Bi-directional Sync
    const primaryPicker = document.getElementById('studio-color-primary');
    const primaryText = document.getElementById('studio-color-primary-text');
    if (primaryPicker && primaryText) {
      primaryPicker.addEventListener('input', function (e) {
        primaryText.value = e.target.value;
        studioConfig.colorPrimary = e.target.value;
        saveConfig();
        applyStudioConfigToStorefront();
      });
      primaryText.addEventListener('input', function (e) {
        if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
          primaryPicker.value = e.target.value;
        }
        studioConfig.colorPrimary = e.target.value;
        saveConfig();
        applyStudioConfigToStorefront();
      });
    }

    const darkPicker = document.getElementById('studio-color-dark');
    const darkText = document.getElementById('studio-color-dark-text');
    if (darkPicker && darkText) {
      darkPicker.addEventListener('input', function (e) {
        darkText.value = e.target.value;
        studioConfig.colorDark = e.target.value;
        saveConfig();
        applyStudioConfigToStorefront();
      });
      darkText.addEventListener('input', function (e) {
        if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
          darkPicker.value = e.target.value;
        }
        studioConfig.colorDark = e.target.value;
        saveConfig();
        applyStudioConfigToStorefront();
      });
    }
  }

  // Render Brands List
  function renderAllStudioLists() {
    renderStudioBrands();
    renderStudioCategories();
    renderStudioSlides();
    renderStudioSections();
  }

  window.renderStudioBrands = function () {
    const container = document.getElementById('studio-brands-list');
    if (!container) return;
    const cardsHtml = studioConfig.brands.map((b, i) => `
      <div class="studio-card" data-brand-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('brands', ${i}, -1)" ${i === 0 ? 'disabled' : ''} title="Move Up">▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('brands', ${i}, 1)" ${i === studioConfig.brands.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
            <h4 class="studio-card-title">${escapeHtml(b.name || 'Untitled Brand')}</h4>
          </div>
          <div class="studio-card-actions" style="display: flex; align-items: center; gap: 8px;">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${b.visible !== false ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('brands', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
            <button type="button" class="studio-btn-icon" style="color: #ef4444; font-size: 14px;" title="Delete this brand" onclick="window.deleteStudioItem('brands', ${i})">🗑️</button>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Brand Name</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(b.name)}" oninput="window.updateStudioItemProp('brands', ${i}, 'name', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Badge Text</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(b.badge)}" oninput="window.updateStudioItemProp('brands', ${i}, 'badge', this.value)">
          </div>
        </div>
        <div class="studio-field-group">
          <label class="studio-field-label">Short Description</label>
          <input type="text" class="studio-field-input" value="${escapeHtml(b.desc)}" oninput="window.updateStudioItemProp('brands', ${i}, 'desc', this.value)">
        </div>
        <div class="studio-field-group">
          <label class="studio-field-label">Thumbnail Image</label>
          <div class="studio-dropzone" ondragover="window.handleStudioDragOver(event)" ondragleave="window.handleStudioDragLeave(event)" ondrop="window.handleStudioDrop(event, 'brand-${i}')" onclick="document.getElementById('file-upload-brand-${i}').click()">
            <div class="studio-dropzone-icon">📁</div>
            <p class="studio-dropzone-text">Drag & drop thumbnail or click to browse</p>
            <input type="file" id="file-upload-brand-${i}" accept="image/*" style="display: none;" onchange="window.handleStudioFileSelect(event, 'brand-${i}')">
          </div>
          <div class="studio-preview-box" id="preview-box-brand-${i}" style="${b.image ? 'display: flex;' : 'display: none;'}">
            <img id="preview-img-brand-${i}" class="studio-preview-img" src="${b.image || ''}" alt="Preview">
            <div class="studio-preview-actions">
              <button type="button" class="studio-btn-tiny" onclick="window.removeStudioImage('brand-${i}')">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = cardsHtml + `
      <div style="margin-top: 14px; text-align: center;">
        <button type="button" class="studio-save-btn" style="background: #0f766e; font-size: 13px; padding: 8px 18px;" onclick="window.addStudioItem('brands')">
          ➕ Add Brand Tile
        </button>
      </div>
    `;
  };

  // Render Categories List
  window.renderStudioCategories = function () {
    const container = document.getElementById('studio-categories-list');
    if (!container) return;
    const cardsHtml = studioConfig.categories.map((c, i) => `
      <div class="studio-card" data-category-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('categories', ${i}, -1)" ${i === 0 ? 'disabled' : ''} title="Move Up">▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('categories', ${i}, 1)" ${i === studioConfig.categories.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
            <h4 class="studio-card-title">${escapeHtml(c.name || 'Untitled Category')}</h4>
          </div>
          <div class="studio-card-actions" style="display: flex; align-items: center; gap: 8px;">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${c.visible !== false ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('categories', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
            <button type="button" class="studio-btn-icon" style="color: #ef4444; font-size: 14px;" title="Delete this category" onclick="window.deleteStudioItem('categories', ${i})">🗑️</button>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Category Name</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(c.name)}" oninput="window.updateStudioItemProp('categories', ${i}, 'name', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Subtitle / Meta Text</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(c.meta)}" oninput="window.updateStudioItemProp('categories', ${i}, 'meta', this.value)">
          </div>
        </div>
        <div class="studio-field-group">
          <label class="studio-field-label">Thumbnail Image</label>
          <div class="studio-dropzone" ondragover="window.handleStudioDragOver(event)" ondragleave="window.handleStudioDragLeave(event)" ondrop="window.handleStudioDrop(event, 'cat-${i}')" onclick="document.getElementById('file-upload-cat-${i}').click()">
            <div class="studio-dropzone-icon">📁</div>
            <p class="studio-dropzone-text">Drag & drop image or browse</p>
            <input type="file" id="file-upload-cat-${i}" accept="image/*" style="display: none;" onchange="window.handleStudioFileSelect(event, 'cat-${i}')">
          </div>
          <div class="studio-preview-box" id="preview-box-cat-${i}" style="${c.image ? 'display: flex;' : 'display: none;'}">
            <img id="preview-img-cat-${i}" class="studio-preview-img" src="${c.image || ''}" alt="Preview">
            <div class="studio-preview-actions">
              <button type="button" class="studio-btn-tiny" onclick="window.removeStudioImage('cat-${i}')">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = cardsHtml + `
      <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
        <button type="button" class="studio-save-btn" style="background: #0f766e; font-size: 13px; padding: 8px 16px;" onclick="window.addStudioItem('categories')">
          ➕ Add Category Tile
        </button>
        <button type="button" class="studio-save-btn" style="background: #1e40af; font-size: 13px; padding: 8px 16px;" onclick="window.addStudioItem('categories', { name: 'Men', meta: 'Clinical Tops & Cargo Joggers →' })">
          👔 Add Men
        </button>
        <button type="button" class="studio-save-btn" style="background: #be185d; font-size: 13px; padding: 8px 16px;" onclick="window.addStudioItem('categories', { name: 'Women', meta: 'Tailored Tops & Wide-Leg Cuts →' })">
          👗 Add Women
        </button>
      </div>
    `;
  };

  // Render Slides List
  window.renderStudioSlides = function () {
    const container = document.getElementById('studio-slides-list');
    if (!container) return;
    const cardsHtml = studioConfig.slides.map((s, i) => `
      <div class="studio-card" data-slide-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('slides', ${i}, -1)" ${i === 0 ? 'disabled' : ''} title="Move Up">▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('slides', ${i}, 1)" ${i === studioConfig.slides.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
            <h4 class="studio-card-title">Slide ${i + 1}: ${escapeHtml(s.title || 'Untitled Banner')}</h4>
          </div>
          <div class="studio-card-actions" style="display: flex; align-items: center; gap: 8px;">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${s.visible !== false ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('slides', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
            <button type="button" class="studio-btn-icon" style="color: #ef4444; font-size: 14px;" title="Delete this slide" onclick="window.deleteStudioItem('slides', ${i})">🗑️</button>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Slide Caption</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(s.title)}" oninput="window.updateStudioItemProp('slides', ${i}, 'title', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Target Link</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(s.link)}" oninput="window.updateStudioItemProp('slides', ${i}, 'link', this.value)">
          </div>
        </div>
        <div class="studio-field-group">
          <label class="studio-field-label">Banner Image</label>
          <div class="studio-dropzone" ondragover="window.handleStudioDragOver(event)" ondragleave="window.handleStudioDragLeave(event)" ondrop="window.handleStudioDrop(event, 'slide-${i}')" onclick="document.getElementById('file-upload-slide-${i}').click()">
            <div class="studio-dropzone-icon">📁</div>
            <p class="studio-dropzone-text">Drag & drop banner image or browse</p>
            <input type="file" id="file-upload-slide-${i}" accept="image/*" style="display: none;" onchange="window.handleStudioFileSelect(event, 'slide-${i}')">
          </div>
          <div class="studio-preview-box" id="preview-box-slide-${i}" style="${s.image ? 'display: flex;' : 'display: none;'}">
            <img id="preview-img-slide-${i}" class="studio-preview-img" src="${s.image || ''}" alt="Preview">
            <div class="studio-preview-actions">
              <button type="button" class="studio-btn-tiny" onclick="window.removeStudioImage('slide-${i}')">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = cardsHtml + `
      <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
        <button type="button" class="studio-save-btn" style="background: #0f766e; font-size: 13px; padding: 8px 16px;" onclick="window.addStudioItem('slides')">
          ➕ Add Hero Slide
        </button>
        <button type="button" class="studio-save-btn" style="background: #0284c7; font-size: 13px; padding: 8px 16px;" onclick="window.addStudioItem('slides', { title: 'Special Promotional Banner', link: '#collection-all' })">
          🖼️ Add Promotional Banner
        </button>
      </div>
    `;
  };

  // Render Section Visibility Controls
  window.renderStudioSections = function () {
    const container = document.getElementById('studio-sections-list');
    if (!container) return;
    const sectionsMeta = [
      { key: 'announcement', name: '📢 Top Announcement Bar' },
      { key: 'header', name: '🧭 Header & Navigation Bar' },
      { key: 'slideshow', name: '🖼️ Hero Banner Slideshow' },
      { key: 'brands', name: '🏷️ Brand & Article Gallery' },
      { key: 'categoryVideo', name: '🎬 Category & Brand Video Split' },
      { key: 'liveCatalogue', name: '🛍️ Curated Live Catalogue' },
      { key: 'customizerBanner', name: '✨ Make Your Own Scrubs Banner' },
      { key: 'homeService', name: '📍 Lahore Home Service Concierge' },
      { key: 'seasonalEditions', name: '❄️ Seasonal Wardrobes (Summer & Winter)' },
      { key: 'signatureSeries', name: '🩺 Signature Scrub Lines' },
      { key: 'hospitalShades', name: '🎨 Clinical Hospital Color Shades' },
      { key: 'testimonials', name: '⭐ Customer & Doctor Reviews' },
      { key: 'trustBadges', name: '🛡️ Trust & Service Guarantee Badges' },
      { key: 'hangingRail', name: '👔 Boutique Hanging Clothing Rail' }
    ];

    container.innerHTML = sectionsMeta.map(sec => `
      <div class="studio-card" style="margin-bottom: 10px; padding: 12px 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 13px; font-weight: 600; color: #1e293b;">${sec.name}</span>
          <label class="studio-switch">
            <input type="checkbox" ${studioConfig.sections[sec.key] !== false ? 'checked' : ''} onchange="window.toggleStudioSection('${sec.key}', this.checked)">
            <span class="studio-slider"></span>
          </label>
        </div>
      </div>
    `).join('');
  };

  // Delete & Add Item Actions
  window.deleteStudioItem = function (type, index) {
    if (!studioConfig[type] || !studioConfig[type][index]) return;
    const item = studioConfig[type][index];
    const itemName = item.name || item.title || `Item ${index + 1}`;
    studioConfig[type].splice(index, 1);
    saveConfig();
    renderAllStudioLists();
    applyStudioConfigToStorefront();
    showToast(`Removed "${itemName}"`);
  };

  window.addStudioItem = function (type, preset = null) {
    if (!Array.isArray(studioConfig[type])) studioConfig[type] = [];
    if (type === 'brands') {
      studioConfig.brands.push({
        id: 'brand-custom-' + Date.now(),
        name: preset && preset.name ? preset.name : 'New Series',
        badge: preset && preset.badge ? preset.badge : 'NEW',
        badgeBg: preset && preset.badgeBg ? preset.badgeBg : '#008779',
        desc: preset && preset.desc ? preset.desc : 'Purpose-built clinical apparel engineered with stretch fabrics.',
        image: preset && preset.image ? preset.image : '',
        visible: true
      });
    } else if (type === 'categories') {
      studioConfig.categories.push({
        id: 'cat-custom-' + Date.now(),
        name: preset && preset.name ? preset.name : 'New Category',
        meta: preset && preset.meta ? preset.meta : 'Explore Styles →',
        image: preset && preset.image ? preset.image : '',
        visible: true
      });
    } else if (type === 'slides') {
      studioConfig.slides.push({
        id: 'slide-custom-' + Date.now(),
        title: preset && preset.title ? preset.title : 'New Clinical Collection',
        link: preset && preset.link ? preset.link : '#collection-all',
        image: preset && preset.image ? preset.image : '',
        visible: true
      });
    }
    saveConfig();
    renderAllStudioLists();
    applyStudioConfigToStorefront();
    const label = preset && (preset.name || preset.title) ? (preset.name || preset.title) : (type === 'slides' ? 'Hero Slide' : type === 'categories' ? 'Category Tile' : 'Brand Tile');
    showToast(`Added "${label}"!`);
  };

  // Drag and Drop Upload Event Handlers
  window.handleStudioDragOver = function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
  };

  window.handleStudioDragLeave = function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
  };

  window.handleStudioDrop = function (e, slotKey) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processStudioUploadedFile(files[0], slotKey);
    }
  };

  window.handleStudioFileSelect = function (e, slotKey) {
    const files = e.target.files;
    if (files && files.length > 0) {
      processStudioUploadedFile(files[0], slotKey);
    }
  };

  function processStudioUploadedFile(file, slotKey) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (evt) {
      const dataUrl = evt.target.result;
      applyUploadedImageToSlot(slotKey, dataUrl);
      showPreviewBox(slotKey, dataUrl);
      saveConfig();
      applyStudioConfigToStorefront();
      showToast('Image uploaded and preview updated!');
    };
    reader.readAsDataURL(file);
  }

  function applyUploadedImageToSlot(slotKey, dataUrl) {
    if (slotKey === 'video-poster') {
      studioConfig.videoPoster = dataUrl;
    } else if (slotKey.startsWith('brand-')) {
      const idx = parseInt(slotKey.replace('brand-', ''), 10);
      if (studioConfig.brands[idx]) studioConfig.brands[idx].image = dataUrl;
    } else if (slotKey.startsWith('cat-')) {
      const idx = parseInt(slotKey.replace('cat-', ''), 10);
      if (studioConfig.categories[idx]) studioConfig.categories[idx].image = dataUrl;
    } else if (slotKey.startsWith('slide-')) {
      const idx = parseInt(slotKey.replace('slide-', ''), 10);
      if (studioConfig.slides[idx]) studioConfig.slides[idx].image = dataUrl;
    }
  }

  function showPreviewBox(slotKey, src) {
    const box = document.getElementById(`preview-box-${slotKey}`);
    const img = document.getElementById(`preview-img-${slotKey}`);
    if (box && img) {
      img.src = src;
      box.style.display = 'flex';
    }
  }

  window.removeStudioImage = function (slotKey) {
    applyUploadedImageToSlot(slotKey, '');
    const box = document.getElementById(`preview-box-${slotKey}`);
    if (box) box.style.display = 'none';
    saveConfig();
    applyStudioConfigToStorefront();
    showToast('Image removed.');
  };

  // Reordering and Property Updates
  window.moveStudioItem = function (type, index, direction) {
    const list = studioConfig[type];
    if (!list) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;
    saveConfig();
    renderAllStudioLists();
    applyStudioConfigToStorefront();
  };

  window.toggleStudioItemVisibility = function (type, index, isVisible) {
    if (studioConfig[type] && studioConfig[type][index]) {
      studioConfig[type][index].visible = isVisible;
      saveConfig();
      applyStudioConfigToStorefront();
    }
  };

  window.updateStudioItemProp = function (type, index, prop, value) {
    if (studioConfig[type] && studioConfig[type][index]) {
      studioConfig[type][index][prop] = value;
      saveConfig();
      applyStudioConfigToStorefront();
    }
  };

  window.toggleStudioSection = function (sectionKey, isVisible) {
    studioConfig.sections[sectionKey] = isVisible;
    saveConfig();
    applyStudioConfigToStorefront();
  };

  // Save Changes & Apply to DOM
  window.saveStudioChanges = function () {
    // Collect all simple inputs
    studioConfig.announcementText = getVal('studio-announcement-text', studioConfig.announcementText);
    studioConfig.headerPhone = getVal('studio-header-phone', studioConfig.headerPhone);
    studioConfig.customizerTitle = getVal('studio-customizer-title', studioConfig.customizerTitle);
    studioConfig.customizerDesc = getVal('studio-customizer-desc', studioConfig.customizerDesc);
    studioConfig.customizerBtn = getVal('studio-customizer-btn', studioConfig.customizerBtn);
    studioConfig.homeserviceTitle = getVal('studio-homeservice-title', studioConfig.homeserviceTitle);
    studioConfig.homeserviceDesc = getVal('studio-homeservice-desc', studioConfig.homeserviceDesc);
    studioConfig.homeserviceFee = getVal('studio-homeservice-fee', studioConfig.homeserviceFee);

    studioConfig.categoryTitle = getVal('studio-category-title', studioConfig.categoryTitle);
    studioConfig.categoryTag = getVal('studio-category-tag', studioConfig.categoryTag);
    studioConfig.categorySub = getVal('studio-category-sub', studioConfig.categorySub);

    studioConfig.videoUrl = getVal('studio-video-url', studioConfig.videoUrl);
    studioConfig.videoBadge = getVal('studio-video-badge', studioConfig.videoBadge);
    studioConfig.videoTitle = getVal('studio-video-title', studioConfig.videoTitle);
    studioConfig.videoDesc = getVal('studio-video-desc', studioConfig.videoDesc);
    studioConfig.videoCtaLabel = getVal('studio-video-cta-label', studioConfig.videoCtaLabel);
    studioConfig.videoCtaLink = getVal('studio-video-cta-link', studioConfig.videoCtaLink);

    studioConfig.colorPrimary = getVal('studio-color-primary-text', studioConfig.colorPrimary);
    studioConfig.colorDark = getVal('studio-color-dark-text', studioConfig.colorDark);
    studioConfig.gridColumns = getVal('studio-grid-columns', studioConfig.gridColumns);
    studioConfig.aspectRatio = getVal('studio-aspect-ratio', studioConfig.aspectRatio);
    studioConfig.borderRadius = getVal('studio-border-radius', studioConfig.borderRadius);

    saveConfig();
    applyStudioConfigToStorefront();
    showToast('✅ All Studio changes saved and live on storefront!');
  };

  function getVal(id, fallback) {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  }

  // Reset to Defaults
  window.resetStudioDefaults = function () {
    if (confirm('Reset all Studio customizations back to default theme configuration?')) {
      localStorage.removeItem(STORAGE_KEY);
      studioConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      populateStudioInputs();
      renderAllStudioLists();
      applyStudioConfigToStorefront();
      showToast('Theme defaults restored.');
    }
  };

  // Live Storefront DOM Applicator
  function applyStudioConfigToStorefront() {
    // 1. Announcement bar
    const marqueeTrack = document.querySelector('.enamels-announcement-track');
    if (marqueeTrack) {
      if (studioConfig.announcementText !== undefined) {
        marqueeTrack.querySelectorAll('span').forEach(sp => {
          sp.textContent = studioConfig.announcementText;
        });
        const bar = marqueeTrack.closest('.enamels-announcement-bar, #enamels-announcement-bar');
        if (bar) {
          if (!studioConfig.announcementText.trim()) {
            bar.style.display = 'none';
          } else if (studioConfig.sections.announcement !== false) {
            bar.style.display = '';
          }
        }
      }
    }

    // 2. Header Phone
    const phoneBadge = document.querySelector('.customer-service-badge span');
    if (phoneBadge && studioConfig.headerPhone !== undefined) {
      phoneBadge.textContent = studioConfig.headerPhone;
      const phoneLink = phoneBadge.closest('.customer-service-badge');
      if (phoneLink) {
        phoneLink.style.display = studioConfig.headerPhone.trim() ? '' : 'none';
      }
    }

    // 3. Customizer Banner
    const custTitle = document.querySelector('#homepage-customizer-banner .customizer-banner-title');
    if (custTitle && studioConfig.customizerTitle !== undefined) {
      custTitle.textContent = studioConfig.customizerTitle;
      custTitle.style.display = studioConfig.customizerTitle.trim() ? '' : 'none';
    }
    const custDesc = document.querySelector('#homepage-customizer-banner .customizer-banner-desc');
    if (custDesc && studioConfig.customizerDesc !== undefined) {
      custDesc.textContent = studioConfig.customizerDesc;
      custDesc.style.display = studioConfig.customizerDesc.trim() ? '' : 'none';
    }
    const custBtn = document.querySelector('#homepage-customizer-banner .btn-hero-primary');
    if (custBtn && studioConfig.customizerBtn !== undefined) {
      custBtn.textContent = studioConfig.customizerBtn;
      custBtn.style.display = studioConfig.customizerBtn.trim() ? '' : 'none';
    }

    // 4. Home Service Banner
    const hsTitle = document.querySelector('#homepage-home-service-banner .home-service-banner-title');
    if (hsTitle && studioConfig.homeserviceTitle !== undefined) {
      hsTitle.textContent = studioConfig.homeserviceTitle;
      hsTitle.style.display = studioConfig.homeserviceTitle.trim() ? '' : 'none';
    }
    const hsDesc = document.querySelector('#homepage-home-service-banner .home-service-banner-desc');
    if (hsDesc && studioConfig.homeserviceDesc !== undefined) {
      hsDesc.textContent = studioConfig.homeserviceDesc;
      hsDesc.style.display = studioConfig.homeserviceDesc.trim() ? '' : 'none';
    }
    const hsFee = document.querySelector('#homepage-home-service-banner .home-service-banner-content span[style*="color: #64748b"]');
    if (hsFee && studioConfig.homeserviceFee !== undefined) {
      hsFee.textContent = studioConfig.homeserviceFee;
      hsFee.style.display = studioConfig.homeserviceFee.trim() ? '' : 'none';
    }

    // 5. Category Section Layout & Centering Controls
    const catSection = document.getElementById('homepage-category-video-split');
    if (catSection) {
      if (studioConfig.categorySectionMaxWidth) {
        catSection.style.maxWidth = studioConfig.categorySectionMaxWidth + 'px';
      }
      const align = studioConfig.categorySectionAlign || 'center';
      if (align === 'left') {
        catSection.style.marginLeft = '0';
        catSection.style.marginRight = 'auto';
      } else if (align === 'right') {
        catSection.style.marginLeft = 'auto';
        catSection.style.marginRight = '0';
      } else {
        catSection.style.marginLeft = 'auto';
        catSection.style.marginRight = 'auto';
      }
    }

    const catGrid = document.querySelector('#homepage-category-video-split .split-cat-video-grid');
    if (catGrid && studioConfig.categoryColumnsVerticalAlign) {
      catGrid.style.alignItems = studioConfig.categoryColumnsVerticalAlign;
    }

    const catHeader = document.querySelector('#homepage-category-video-split .split-column-header');
    if (catHeader && studioConfig.categoryHeaderAlign) {
      catHeader.style.textAlign = studioConfig.categoryHeaderAlign;
      catHeader.style.alignItems = studioConfig.categoryHeaderAlign === 'center' ? 'center' : (studioConfig.categoryHeaderAlign === 'right' ? 'flex-end' : 'flex-start');
    }

    const catTagEl = document.querySelector('#homepage-category-video-split .categories-section-tag');
    if (catTagEl && studioConfig.categoryTag !== undefined) {
      catTagEl.textContent = studioConfig.categoryTag;
      catTagEl.style.display = (studioConfig.showCategoryTag !== false && studioConfig.categoryTag.trim()) ? '' : 'none';
    }

    const catTitleEl = document.querySelector('#homepage-category-video-split .split-column-title');
    if (catTitleEl && studioConfig.categoryTitle !== undefined) {
      catTitleEl.textContent = studioConfig.categoryTitle;
      catTitleEl.style.display = (studioConfig.showCategoryTitle !== false && studioConfig.categoryTitle.trim()) ? '' : 'none';
    }

    const catSubEl = document.querySelector('#homepage-category-video-split .split-column-sub');
    if (catSubEl && studioConfig.categorySub !== undefined) {
      catSubEl.textContent = studioConfig.categorySub;
      catSubEl.style.display = (studioConfig.showCategorySub !== false && studioConfig.categorySub.trim()) ? '' : 'none';
    }

    const catThumbs = document.querySelector('#homepage-category-video-split .split-thumbnails-grid');
    if (catThumbs) {
      const tAlign = studioConfig.categoryThumbnailsAlign || 'center';
      catThumbs.style.justifyContent = tAlign === 'left' ? 'flex-start' : (tAlign === 'right' ? 'flex-end' : 'center');
      if (studioConfig.categoryThumbWidth) {
        catThumbs.style.gridTemplateColumns = `repeat(auto-fill, minmax(${studioConfig.categoryThumbWidth}px, ${studioConfig.categoryThumbWidth}px))`;
      }
      if (studioConfig.categoryTextAlign) {
        catThumbs.querySelectorAll('.split-category-tile, .split-category-info').forEach(el => {
          el.style.textAlign = studioConfig.categoryTextAlign;
        });
      }
    }

    // 6. Video Positioning, Offsets & Controls
    const vidCol = document.querySelector('#homepage-category-video-split .split-video-column');
    if (vidCol) {
      if (studioConfig.videoOffsetTop !== undefined) {
        vidCol.style.marginTop = studioConfig.videoOffsetTop + 'px';
      }
      const vHAlign = studioConfig.videoHorizontalAlign || 'center';
      vidCol.style.alignItems = vHAlign === 'left' ? 'flex-start' : (vHAlign === 'right' ? 'flex-end' : 'center');
    }

    const vidCard = document.querySelector('#homepage-category-video-split .brand-video-card-container');
    if (vidCard) {
      if (studioConfig.videoMaxWidth) {
        vidCard.style.maxWidth = studioConfig.videoMaxWidth + 'px';
      }
      if (studioConfig.videoAspectRatio && studioConfig.videoAspectRatio !== 'custom') {
        const ratios = { '16_9': '16 / 9', '4_3': '4 / 3', '1_1': '1 / 1', '4_5': '4 / 5' };
        vidCard.style.aspectRatio = ratios[studioConfig.videoAspectRatio] || '16 / 9';
      }
    }

    // Video Pause Button (Explicit visibility control)
    const pauseBtn = document.getElementById('brand-video-play-pause-btn');
    if (pauseBtn) {
      pauseBtn.style.display = studioConfig.showPauseButton !== false ? '' : 'none';
    }

    // Video Overlay Banner
    const vOverlay = document.querySelector('#homepage-category-video-split .brand-video-overlay-banner');
    if (vOverlay) {
      vOverlay.style.display = studioConfig.showVideoOverlay !== false ? '' : 'none';
    }

    // Video Badge, Title, Desc, CTA
    const vBadge = document.querySelector('#homepage-category-video-split .brand-video-badge');
    if (vBadge) {
      if (studioConfig.videoBadge !== undefined) vBadge.textContent = studioConfig.videoBadge;
      vBadge.style.display = (studioConfig.showVideoBadge !== false && (studioConfig.videoBadge ? studioConfig.videoBadge.trim() : vBadge.textContent.trim())) ? '' : 'none';
    }

    const vTitle = document.querySelector('#homepage-category-video-split .brand-video-title');
    if (vTitle) {
      if (studioConfig.videoTitle !== undefined) vTitle.textContent = studioConfig.videoTitle;
      vTitle.style.display = (studioConfig.showVideoTitle !== false && (studioConfig.videoTitle ? studioConfig.videoTitle.trim() : vTitle.textContent.trim())) ? '' : 'none';
    }

    const vDesc = document.querySelector('#homepage-category-video-split .brand-video-desc');
    if (vDesc) {
      if (studioConfig.videoDesc !== undefined) vDesc.textContent = studioConfig.videoDesc;
      vDesc.style.display = (studioConfig.showVideoDesc !== false && (studioConfig.videoDesc ? studioConfig.videoDesc.trim() : vDesc.textContent.trim())) ? '' : 'none';
    }

    const vCta = document.querySelector('#homepage-category-video-split .brand-video-cta-link-btn');
    if (vCta) {
      if (studioConfig.videoCtaLabel !== undefined) vCta.textContent = studioConfig.videoCtaLabel;
      if (studioConfig.videoCtaLink !== undefined) vCta.href = studioConfig.videoCtaLink;
      vCta.style.display = (studioConfig.showVideoCta !== false && (studioConfig.videoCtaLabel ? studioConfig.videoCtaLabel.trim() : vCta.textContent.trim())) ? '' : 'none';
    }

    // Video Element Media Source & Playback
    const promoVid = document.getElementById('enamels-brand-promo-video');
    if (promoVid) {
      if (studioConfig.videoPoster !== undefined && studioConfig.videoPoster) {
        promoVid.poster = studioConfig.videoPoster;
      }
      if (studioConfig.videoUrl && promoVid.src !== studioConfig.videoUrl) {
        const srcEl = promoVid.querySelector('source');
        if (srcEl) srcEl.src = studioConfig.videoUrl;
        else promoVid.src = studioConfig.videoUrl;
        promoVid.load();
      }
      if (studioConfig.videoObjectFit) {
        promoVid.style.objectFit = studioConfig.videoObjectFit;
      }
      if (studioConfig.videoAutoplay !== undefined) promoVid.autoplay = Boolean(studioConfig.videoAutoplay);
      if (studioConfig.videoMuted !== undefined) promoVid.muted = Boolean(studioConfig.videoMuted);
      if (studioConfig.videoLoop !== undefined) promoVid.loop = Boolean(studioConfig.videoLoop);
    }

    // 7. Brands Grid Storefront Synchronization
    applyStudioBrandsToStorefront();

    // 8. Categories Grid Storefront Synchronization
    applyStudioCategoriesToStorefront();

    // 9. Slideshow Storefront Synchronization
    applyStudioSlidesToStorefront();

    // 9. Section Visibility Toggles
    toggleElementDisplay('.enamels-announcement-bar, #enamels-announcement-bar', studioConfig.sections.announcement);
    toggleElementDisplay('#enamels-main-header, .enamels-main-header', studioConfig.sections.header);
    toggleElementDisplay('#enamels-hero-slideshow, .enamels-slideshow-container', studioConfig.sections.slideshow);
    toggleElementDisplay('#homepage-featured-articles, .frubs-brands-section', studioConfig.sections.brands);
    toggleElementDisplay('#homepage-category-video-split, .split-cat-video-section', studioConfig.sections.categoryVideo);
    toggleElementDisplay('#homepage-live-catalogue-section, .enamels-live-catalogue-wrapper', studioConfig.sections.liveCatalogue);
    toggleElementDisplay('#homepage-customizer-banner, .enamels-customizer-banner-wrapper', studioConfig.sections.customizerBanner);
    toggleElementDisplay('#homepage-home-service-banner, .enamels-home-service-wrapper', studioConfig.sections.homeService);
    toggleElementDisplay('#homepage-seasonal-editions, .enamels-seasonal-collections-wrapper', studioConfig.sections.seasonalEditions);
    toggleElementDisplay('#homepage-signature-series, .enamels-signature-series-wrapper', studioConfig.sections.signatureSeries);
    toggleElementDisplay('#homepage-hospital-shades, .enamels-hospital-shades-wrapper', studioConfig.sections.hospitalShades);
    toggleElementDisplay('#homepage-testimonials-section, .enamels-testimonials-wrapper', studioConfig.sections.testimonials);
    toggleElementDisplay('#homepage-trust-badges, .enamels-trust-badges-wrapper', studioConfig.sections.trustBadges);
    toggleElementDisplay('#enamels-hanging-rail-container, .enamels-hanging-rail-section', studioConfig.sections.hangingRail);

    // 10. Theme tokens (CSS variables)
    if (studioConfig.colorPrimary) {
      document.documentElement.style.setProperty('--color-primary', studioConfig.colorPrimary);
      document.documentElement.style.setProperty('--color-teal', studioConfig.colorPrimary);
      document.documentElement.style.setProperty('--rail-accent', studioConfig.colorPrimary);
      document.querySelectorAll('.btn-hero-primary, .btn-card-action').forEach(el => {
        el.style.backgroundColor = studioConfig.colorPrimary;
      });
    }
    if (studioConfig.colorDark) {
      document.documentElement.style.setProperty('--color-navy', studioConfig.colorDark);
      document.documentElement.style.setProperty('--rail-navy', studioConfig.colorDark);
    }

    // 11. Grid columns
    const grid = document.getElementById('homepage-live-products-grid');
    if (grid && studioConfig.gridColumns) {
      const minCol = studioConfig.gridColumns === '3' ? '320px' : studioConfig.gridColumns === '2' ? '420px' : '260px';
      grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minCol}, 1fr))`;
    }

    // 12. Card border radius
    if (studioConfig.borderRadius) {
      document.documentElement.style.setProperty('--card-radius', studioConfig.borderRadius);
      document.querySelectorAll('.frubs-brand-tile, .split-category-tile, .category-tile-card').forEach(tile => {
        tile.style.borderRadius = studioConfig.borderRadius;
      });
    }
  }

  // Brands Grid Dynamic DOM Renderer
  function applyStudioBrandsToStorefront() {
    const grid = document.querySelector('#homepage-featured-articles .frubs-brands-grid');
    if (!grid) return;
    if (!Array.isArray(studioConfig.brands) || studioConfig.brands.length === 0) {
      return; // Keep existing Liquid blocks if no studio brands defined
    }

    const visibleBrands = studioConfig.brands.filter(b => b.visible !== false);
    if (visibleBrands.length === 0) {
      grid.innerHTML = '<p class="studio-empty-state" style="padding: 24px; text-align: center; color: #64748b; font-size: 13px; grid-column: 1 / -1;">No visible brand tiles configured.</p>';
      return;
    }

    grid.innerHTML = visibleBrands.map(b => {
      const badgeHtml = b.badge ? `<span class="frubs-brand-tile-badge" style="background: ${b.badgeBg || '#102a43'}; color: #ffffff;">${escapeHtml(b.badge)}</span>` : '';
      const titleHtml = b.name ? `<h3 class="frubs-brand-tile-title">${escapeHtml(b.name)}</h3>` : '';
      const descHtml = b.desc ? `<p class="frubs-brand-tile-sub">${escapeHtml(b.desc)}</p>` : '';
      const ctaHtml = b.name ? `<span class="frubs-brand-tile-cta">Explore ${escapeHtml(b.name)} →</span>` : '';
      const hasBody = Boolean(b.name || b.desc);
      const mediaHtml = b.image
        ? `<img src="${b.image}" alt="${escapeHtml(b.name || 'Brand Thumbnail')}" width="300" height="400" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" />`
        : `<div class="frubs-brand-placeholder" style="background: #f1f5f9; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 200px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>`;

      return `
        <a
          href="#collection-${escapeHtml((b.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'))}"
          class="frubs-brand-tile${hasBody ? '' : ' is-image-only'}"
          onclick="if (typeof window.navigateToBrand === 'function') { window.navigateToBrand('${escapeHtml(b.name)}'); return false; }"
          aria-label="Explore ${escapeHtml(b.name || 'Brand')}"
        >
          <div class="frubs-brand-tile-media" style="${b.image ? 'background-color: #ffffff;' : ''}">
            ${badgeHtml}
            ${mediaHtml}
          </div>
          ${hasBody ? `
          <div class="frubs-brand-tile-body">
            ${titleHtml}
            ${descHtml}
            ${ctaHtml}
          </div>
          ` : ''}
        </a>
      `;
    }).join('');
  }

  // Categories Grid Dynamic DOM Renderer
  function applyStudioCategoriesToStorefront() {
    const grid = document.querySelector('#homepage-category-video-split .split-thumbnails-grid');
    if (!grid) return;
    if (!Array.isArray(studioConfig.categories) || studioConfig.categories.length === 0) {
      return; // Keep existing Liquid blocks if no studio categories defined
    }

    const visibleCategories = studioConfig.categories.filter(c => c.visible !== false);
    if (visibleCategories.length === 0) {
      grid.innerHTML = '<p class="studio-empty-state" style="padding: 24px; text-align: center; color: #64748b; font-size: 13px; grid-column: 1 / -1;">No visible categories configured.</p>';
      return;
    }

    grid.innerHTML = visibleCategories.map(c => {
      const catName = c.name || '';
      const catMeta = c.meta || '';
      const catLower = catName.toLowerCase();
      let onclickCode = '';
      if (catLower.includes('men') && !catLower.includes('women')) {
        onclickCode = "if (typeof window.navigateToGender === 'function') { window.navigateToGender('men'); return false; }";
      } else if (catLower.includes('women')) {
        onclickCode = "if (typeof window.navigateToGender === 'function') { window.navigateToGender('women'); return false; }";
      } else if (catLower.includes('scrub')) {
        onclickCode = "if (typeof window.selectProductCategory === 'function') { window.selectProductCategory('scrubs'); return false; }";
      } else if (catLower.includes('lab') || catLower.includes('coat')) {
        onclickCode = "if (typeof window.selectProductCategory === 'function') { window.selectProductCategory('lab-coat'); return false; }";
      } else if (catLower.includes('cap')) {
        onclickCode = "if (typeof window.selectProductCategory === 'function') { window.selectProductCategory('caps'); return false; }";
      } else if (catLower.includes('sleeve')) {
        onclickCode = "if (typeof window.selectProductCategory === 'function') { window.selectProductCategory('sleeves'); return false; }";
      } else if (catLower.includes('access')) {
        onclickCode = "if (typeof window.navigateToAccessories === 'function') { window.navigateToAccessories(); return false; }";
      } else {
        onclickCode = `if (typeof window.selectProductCategory === 'function') { window.selectProductCategory('${escapeHtml(catLower)}'); return false; }`;
      }

      const sectionEl = document.querySelector('#homepage-category-video-split');
      const isContain = (sectionEl && sectionEl.querySelector('.split-category-img[data-fit="contain"]')) || (studioConfig && studioConfig.imageFitMode === 'contain');
      const fitStyle = isContain ? 'object-fit: contain; transform: none; width: 100%; height: 100%; display: block;' : 'object-fit: cover; width: 100%; height: 100%; display: block;';

      const hasInfo = Boolean(catName || catMeta);
      const mediaHtml = c.image
        ? `<img src="${c.image}" alt="${escapeHtml(catName || 'Category Thumbnail')}" width="200" height="200" loading="lazy" class="split-category-img" data-fit="${isContain ? 'contain' : 'cover'}" style="${fitStyle}" />`
        : `<div class="split-category-placeholder" style="background: #f1f5f9; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 120px;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>`;

      return `
        <a
          href="#${escapeHtml(catLower)}"
          class="split-category-tile${hasInfo ? '' : ' is-image-only'}"
          onclick="${onclickCode}"
          aria-label="Shop ${escapeHtml(catName || 'Category')}"
          style="height: fit-content; align-self: start; max-width: ${studioConfig.categoryThumbWidth || 160}px; text-align: ${studioConfig.categoryTextAlign || 'left'};"
        >
          <div class="split-category-thumb${isContain ? ' is-contain' : ''}">
            ${mediaHtml}
          </div>
          ${hasInfo ? `
          <div class="split-category-info">
            ${catName ? `<h3 class="split-category-name">${escapeHtml(catName)}</h3>` : ''}
            ${catMeta ? `<span class="split-category-meta">${escapeHtml(catMeta)}</span>` : ''}
          </div>
          ` : ''}
        </a>
      `;
    }).join('');
  }

  // Slideshow Dynamic DOM Renderer
  function applyStudioSlidesToStorefront() {
    const track = document.getElementById('enamels-slideshow-track');
    if (!track) return;
    if (!Array.isArray(studioConfig.slides) || studioConfig.slides.length === 0) {
      return; // Keep existing Liquid slides if no studio slides defined
    }

    const visibleSlides = studioConfig.slides.filter(s => s.visible !== false);
    if (visibleSlides.length === 0) {
      track.innerHTML = '<div class="slide-panel is-active" style="padding: 40px; text-align: center; color: #94a3b8;">No visible slides configured. Click "Add Hero Slide" in Studio.</div>';
      return;
    }

    track.innerHTML = visibleSlides.map((s, idx) => {
      const linkHref = s.link || '#collection-all';
      const titleHtml = s.title ? `<h3 class="slide-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin-bottom: 8px;">${escapeHtml(s.title)}</h3>` : '';
      const mediaHtml = s.image
        ? `<img src="${s.image}" alt="${escapeHtml(s.title || 'Slide Banner')}" class="slide-img-full" style="width: 100%; height: 100%; object-fit: cover;" loading="${idx === 0 ? 'eager' : 'lazy'}" />`
        : `<div class="slide-placeholder" style="background: #1e293b; width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
          </div>`;

      return `
        <div class="slide-panel${idx === 0 ? ' is-active' : ''}" data-slide-index="${idx}" style="position: relative;">
          <div class="slide-media-wrap">
            <a href="${escapeHtml(linkHref)}" class="slide-media-link" aria-label="${escapeHtml(s.title || 'Slide Banner')}">
              ${mediaHtml}
            </a>
            ${s.title ? `
            <div class="slide-caption-layer" style="position: absolute; bottom: 32px; left: 32px; z-index: 2; background: rgba(16, 42, 67, 0.65); padding: 16px 24px; border-radius: 8px; backdrop-filter: blur(4px);">
              ${titleHtml}
            </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Re-initialize indicator dots if container exists
    const dotsContainer = document.getElementById('enamels-slideshow-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = visibleSlides.map((_, i) => `
        <button type="button" class="slideshow-dot${i === 0 ? ' active' : ''}" data-dot-index="${i}" onclick="window.goToSlide(${i})" aria-label="Go to slide ${i + 1}"></button>
      `).join('');
    }
  }

  function toggleElementDisplay(selector, isVisible) {
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = isVisible !== false ? '' : 'none';
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('studio-toast');
    const msgEl = document.getElementById('studio-toast-message');
    if (!toast) return;
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Keyboard Shortcut: Shift + S to open Studio
  document.addEventListener('keydown', function (e) {
    if (e.shiftKey && (e.key === 'S' || e.key === 's') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      window.toggleStudioPanel();
    }
  });

  // URL query parameter: ?studio=true opens automatically
  if (window.location.search.includes('studio=true')) {
    setTimeout(window.openStudioPanel, 300);
  }

  // Handle Shopify Section Re-renders
  document.addEventListener('shopify:section:load', function () {
    applyStudioConfigToStorefront();
  });

  // Apply on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStudioConfigToStorefront);
  } else {
    applyStudioConfigToStorefront();
  }
})();
