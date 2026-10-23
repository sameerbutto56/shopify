/**
 * ENAMELS ONLINE — VISUAL DRAG-AND-DROP STUDIO CONTROLLER
 * Empowers store owners to manage homepage content, upload images via drag-and-drop,
 * edit text, reorder blocks, toggle section visibility, and tweak fine-grained tokens.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'enamels_studio_config_v1';

  // Default configuration state
  const DEFAULT_CONFIG = {
    announcementText: '✨ FREE NATIONWIDE DELIVERY ON ORDERS OVER RS. 7,000',
    headerPhone: '+92 301 13 31 133',
    customizerTitle: 'Make Your Own Scrubs',
    customizerDesc: 'Experience our interactive customization studio. Select proprietary medical fabrics, approved hospital shades, custom measurements in inches or cm, size auto-fill, C (Custom) fit, and personalized doctor title & hospital crest embroidery.',
    customizerBtn: 'Launch Customizer Studio →',
    homeserviceTitle: 'Home Service — At Your Convenience',
    homeserviceDesc: 'Request an in-person visit from an Enamels representative in Lahore who will bring genuine fabric swatches, assist with precision body measurements, and help place your order at your hospital, clinic, or residence.',
    homeserviceFee: 'Rs. 500 consultation fee • Fully credited towards your order',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/6df1013caab84ae983ea1c32759e663a.mp4',
    videoTitle: 'Engineered for Clinical Endurance',
    videoDesc: 'Proprietary antimicrobial stretch weaves engineered for 24-hour hospital rotations.',
    videoPoster: '',
    colorPrimary: '#008779',
    colorDark: '#102a43',
    gridColumns: '4',
    aspectRatio: '3/4',
    borderRadius: '8px',
    brands: [
      { id: 'brand-vilora', name: 'Vilora Series', badge: 'MICRO-DRAPE', badgeBg: '#be185d', desc: 'Liquid-soft micro-drape with fluid-repellent antimicrobial finishing tailored for female clinicians.', image: '', visible: true },
      { id: 'brand-splender', name: 'Splender Series', badge: '4-WAY STRETCH', badgeBg: '#102a43', desc: 'Athletic mechanical stretch twill, raglan sleeve mobility & 6-pocket functional cargo joggers.', image: '', visible: true },
      { id: 'brand-ground', name: 'Ground Series', badge: 'EXECUTIVE CUT', badgeBg: '#b45309', desc: 'Distinctive standing mandarin collar with concealed front placket tailored for senior consultant rounds.', image: '', visible: true },
      { id: 'brand-flexfit', name: 'FlexFit Series', badge: 'ALL-DAY FLEX', badgeBg: '#0f766e', desc: 'Reinforced stretch seams and deep multi-pocket storage engineered for high-activity ward rotations.', image: '', visible: true },
      { id: 'brand-helium', name: 'Helium Series', badge: 'LAB COATS', badgeBg: '#0369a1', desc: 'Crisp optical white technical doctor coats with reinforced stethoscope loop & tablet pockets.', image: '', visible: true }
    ],
    categories: [
      { id: 'cat-men', name: 'Men', meta: '12 Styles →', image: '', visible: true },
      { id: 'cat-women', name: 'Women', meta: '14 Styles →', image: '', visible: true },
      { id: 'cat-scrubs', name: 'Scrubs', meta: 'All Series →', image: '', visible: true },
      { id: 'cat-labcoat', name: 'Lab Coats', meta: 'Helium White →', image: '', visible: true },
      { id: 'cat-caps', name: 'Caps', meta: 'BunFit™ Series →', image: '', visible: true },
      { id: 'cat-accessories', name: 'Accessories', meta: 'Sleeves & More →', image: '', visible: true }
    ],
    slides: [
      { id: 'slide-1', title: 'Sprinter Autumn Edition', link: '#collection-sprinter', image: '', visible: true },
      { id: 'slide-2', title: 'Clinical Clogs & Footwear', link: '#collection-clogs', image: '', visible: true },
      { id: 'slide-3', title: 'New Arrivals 2026', link: '#collection-new-arrivals', image: '', visible: true },
      { id: 'slide-4', title: 'BunFit™ Surgical Caps', link: '#collection-caps', image: '', visible: true },
      { id: 'slide-5', title: 'Velora Luxury Scrubs', link: '#collection-velora', image: '', visible: true }
    ],
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
      trustBadges: true
    }
  };

  let studioConfig = loadConfig();

  function loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return Object.assign({}, DEFAULT_CONFIG, JSON.parse(saved));
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
    const overlay = document.getElementById('enamels-studio-overlay');
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
    setVal('studio-video-url', studioConfig.videoUrl);
    setVal('studio-video-title', studioConfig.videoTitle);
    setVal('studio-video-desc', studioConfig.videoDesc);

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
    container.innerHTML = studioConfig.brands.map((b, i) => `
      <div class="studio-card" data-brand-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('brands', ${i}, -1)" ${i === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('brands', ${i}, 1)" ${i === studioConfig.brands.length - 1 ? 'disabled' : ''}>▼</button>
            <h4 class="studio-card-title">${escapeHtml(b.name)}</h4>
          </div>
          <div class="studio-card-actions">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${b.visible ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('brands', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Brand Name</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(b.name)}" onchange="window.updateStudioItemProp('brands', ${i}, 'name', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Badge Text</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(b.badge)}" onchange="window.updateStudioItemProp('brands', ${i}, 'badge', this.value)">
          </div>
        </div>
        <div class="studio-field-group">
          <label class="studio-field-label">Short Description</label>
          <input type="text" class="studio-field-input" value="${escapeHtml(b.desc)}" onchange="window.updateStudioItemProp('brands', ${i}, 'desc', this.value)">
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
  };

  // Render Categories List
  window.renderStudioCategories = function () {
    const container = document.getElementById('studio-categories-list');
    if (!container) return;
    container.innerHTML = studioConfig.categories.map((c, i) => `
      <div class="studio-card" data-category-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('categories', ${i}, -1)" ${i === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('categories', ${i}, 1)" ${i === studioConfig.categories.length - 1 ? 'disabled' : ''}>▼</button>
            <h4 class="studio-card-title">${escapeHtml(c.name)}</h4>
          </div>
          <div class="studio-card-actions">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${c.visible ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('categories', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Category Name</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(c.name)}" onchange="window.updateStudioItemProp('categories', ${i}, 'name', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Subtitle / Meta Text</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(c.meta)}" onchange="window.updateStudioItemProp('categories', ${i}, 'meta', this.value)">
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
  };

  // Render Slides List
  window.renderStudioSlides = function () {
    const container = document.getElementById('studio-slides-list');
    if (!container) return;
    container.innerHTML = studioConfig.slides.map((s, i) => `
      <div class="studio-card" data-slide-index="${i}">
        <div class="studio-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('slides', ${i}, -1)" ${i === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="studio-btn-icon" onclick="window.moveStudioItem('slides', ${i}, 1)" ${i === studioConfig.slides.length - 1 ? 'disabled' : ''}>▼</button>
            <h4 class="studio-card-title">Slide ${i + 1}: ${escapeHtml(s.title)}</h4>
          </div>
          <div class="studio-card-actions">
            <label class="studio-switch" title="Toggle visibility">
              <input type="checkbox" ${s.visible ? 'checked' : ''} onchange="window.toggleStudioItemVisibility('slides', ${i}, this.checked)">
              <span class="studio-slider"></span>
            </label>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <label class="studio-field-label">Slide Caption</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(s.title)}" onchange="window.updateStudioItemProp('slides', ${i}, 'title', this.value)">
          </div>
          <div>
            <label class="studio-field-label">Target Link</label>
            <input type="text" class="studio-field-input" value="${escapeHtml(s.link)}" onchange="window.updateStudioItemProp('slides', ${i}, 'link', this.value)">
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
      { key: 'trustBadges', name: '🛡️ Trust & Service Guarantee Badges' }
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
    renderAllStudioLists();
  };

  window.toggleStudioItemVisibility = function (type, index, isVisible) {
    if (studioConfig[type] && studioConfig[type][index]) {
      studioConfig[type][index].visible = isVisible;
    }
  };

  window.updateStudioItemProp = function (type, index, prop, value) {
    if (studioConfig[type] && studioConfig[type][index]) {
      studioConfig[type][index][prop] = value;
    }
  };

  window.toggleStudioSection = function (sectionKey, isVisible) {
    studioConfig.sections[sectionKey] = isVisible;
  };

  // Save Changes & Apply to DOM
  window.saveStudioChanges = function () {
    // Collect simple inputs
    studioConfig.announcementText = getVal('studio-announcement-text', studioConfig.announcementText);
    studioConfig.headerPhone = getVal('studio-header-phone', studioConfig.headerPhone);
    studioConfig.customizerTitle = getVal('studio-customizer-title', studioConfig.customizerTitle);
    studioConfig.customizerDesc = getVal('studio-customizer-desc', studioConfig.customizerDesc);
    studioConfig.customizerBtn = getVal('studio-customizer-btn', studioConfig.customizerBtn);
    studioConfig.homeserviceTitle = getVal('studio-homeservice-title', studioConfig.homeserviceTitle);
    studioConfig.homeserviceDesc = getVal('studio-homeservice-desc', studioConfig.homeserviceDesc);
    studioConfig.homeserviceFee = getVal('studio-homeservice-fee', studioConfig.homeserviceFee);
    studioConfig.videoUrl = getVal('studio-video-url', studioConfig.videoUrl);
    studioConfig.videoTitle = getVal('studio-video-title', studioConfig.videoTitle);
    studioConfig.videoDesc = getVal('studio-video-desc', studioConfig.videoDesc);

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
    if (marqueeTrack && studioConfig.announcementText) {
      marqueeTrack.querySelectorAll('span').forEach(sp => {
        sp.textContent = studioConfig.announcementText;
      });
    }

    // 2. Header Phone
    const phoneBadge = document.querySelector('.customer-service-badge span');
    if (phoneBadge && studioConfig.headerPhone) {
      phoneBadge.textContent = studioConfig.headerPhone;
    }

    // 3. Customizer Banner
    const custTitle = document.querySelector('#homepage-customizer-banner .customizer-banner-title');
    if (custTitle && studioConfig.customizerTitle) custTitle.textContent = studioConfig.customizerTitle;
    const custDesc = document.querySelector('#homepage-customizer-banner .customizer-banner-desc');
    if (custDesc && studioConfig.customizerDesc) custDesc.textContent = studioConfig.customizerDesc;

    // 4. Home Service Banner
    const hsTitle = document.querySelector('#homepage-home-service-banner .home-service-banner-title');
    if (hsTitle && studioConfig.homeserviceTitle) hsTitle.textContent = studioConfig.homeserviceTitle;
    const hsDesc = document.querySelector('#homepage-home-service-banner .home-service-banner-desc');
    if (hsDesc && studioConfig.homeserviceDesc) hsDesc.textContent = studioConfig.homeserviceDesc;

    // 5. Video Banner
    const promoVid = document.getElementById('enamels-brand-promo-video');
    if (promoVid) {
      if (studioConfig.videoPoster) promoVid.poster = studioConfig.videoPoster;
      const vTitle = document.querySelector('.brand-video-title');
      if (vTitle && studioConfig.videoTitle) vTitle.textContent = studioConfig.videoTitle;
      const vDesc = document.querySelector('.brand-video-desc');
      if (vDesc && studioConfig.videoDesc) vDesc.textContent = studioConfig.videoDesc;
    }

    // 6. Section Visibility Toggles
    toggleElementDisplay('.enamels-announcement-bar', studioConfig.sections.announcement);
    toggleElementDisplay('#enamels-main-header', studioConfig.sections.header);
    toggleElementDisplay('#enamels-hero-slideshow', studioConfig.sections.slideshow);
    toggleElementDisplay('#homepage-featured-articles', studioConfig.sections.brands);
    toggleElementDisplay('#homepage-category-video-split', studioConfig.sections.categoryVideo);
    toggleElementDisplay('#homepage-live-catalogue-section', studioConfig.sections.liveCatalogue);
    toggleElementDisplay('#homepage-customizer-banner', studioConfig.sections.customizerBanner);
    toggleElementDisplay('#homepage-home-service-banner', studioConfig.sections.homeService);
    toggleElementDisplay('#homepage-seasonal-editions', studioConfig.sections.seasonalEditions);
    toggleElementDisplay('#homepage-signature-series', studioConfig.sections.signatureSeries);
    toggleElementDisplay('#homepage-hospital-shades', studioConfig.sections.hospitalShades);
    toggleElementDisplay('#homepage-testimonials-section', studioConfig.sections.testimonials);
    toggleElementDisplay('#homepage-trust-badges', studioConfig.sections.trustBadges);

    // 7. Theme tokens (CSS variables)
    if (studioConfig.colorPrimary) {
      document.documentElement.style.setProperty('--color-primary', studioConfig.colorPrimary);
      document.querySelectorAll('.btn-hero-primary, .btn-card-action').forEach(el => {
        el.style.backgroundColor = studioConfig.colorPrimary;
      });
    }

    // 8. Grid columns
    const grid = document.getElementById('homepage-live-products-grid');
    if (grid && studioConfig.gridColumns) {
      const minCol = studioConfig.gridColumns === '3' ? '320px' : studioConfig.gridColumns === '2' ? '420px' : '260px';
      grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minCol}, 1fr))`;
    }
  }

  function toggleElementDisplay(selector, isVisible) {
    const el = document.querySelector(selector);
    if (el) {
      el.style.display = isVisible !== false ? '' : 'none';
    }
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

  // Apply on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStudioConfigToStorefront);
  } else {
    applyStudioConfigToStorefront();
  }
})();
