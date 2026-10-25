/**
 * Enamels Medical Apparel — Master Preview & Storefront Catalogue Configuration
 * Real products from Shopify Admin (collections.all.products / /products.json) are merged first.
 * Structured preview products populate missing categories (Men/Women Sprinter, Ground, Vilora,
 * Lab Coats, Caps, Sleeves, Accessories) for approval and end-to-end shopping journey testing.
 */

window.EnamelsCatalogue = [
  // 1. Men → Scrubs → Sprinter
  {
    id: 'preview-men-sprinter-scrub-set',
    handle: 'men-sprinter-athletic-scrub-set',
    sku: 'ENM-SPR-M-01',
    title: 'Men’s Sprinter Athletic 4-Way Stretch Scrub Set (Preview)',
    cleanTitle: 'Men’s Sprinter Athletic Scrub Set',
    category: 'scrub-set',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 6250,
    comparePrice: 7200,
    badge: '4-WAY STRETCH',
    fabric: 'Flexi-Tech AeroStretch Twill (72% Poly, 21% Rayon, 7% Spandex)',
    description: 'Purpose-built athletic scrub set featuring 4-way mechanical stretch twill, ergonomic raglan sleeves for surgical freedom, and 6-pocket cargo jogger trousers with secure zippered phone stash.',
    image: 'demo-hang-scrub-navy.png',
    images: [
      { src: 'demo-hang-scrub-navy.png', alt: 'Men’s Sprinter Athletic Scrub Set Front View' },
      { src: 'demo-hang-scrub-olive.png', alt: 'Men’s Sprinter Athletic Scrub Set Olive View' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Hunter Green', hex: '#14532D', image: 'demo-hang-scrub-olive.png' },
      { name: 'Ceil Blue', hex: '#6BA4B8', image: 'demo-hang-scrub-teal.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 2. Men → Scrubs → Crown
  {
    id: 'preview-men-crown-mandarin-scrub-set',
    handle: 'men-crown-executive-mandarin-scrub-set',
    sku: 'ENM-CRW-M-02',
    title: 'Men’s Crown Executive Mandarin Collar Scrub Set (Preview)',
    cleanTitle: 'Men’s Crown Mandarin Scrub Set',
    category: 'scrub-set',
    gender: 'men',
    series: 'Crown',
    basePrice: 6850,
    comparePrice: 7800,
    badge: 'EXECUTIVE MANDARIN',
    fabric: 'Executive High-Density Antimicrobial Micro-Twill with Fluid Barrier',
    description: 'Sophisticated standing mandarin collar with concealed front button placket. Tailored for department heads, senior surgical consultants, and clinical rounds.',
    image: 'demo-hang-scrub-burgundy.png',
    images: [
      { src: 'demo-hang-scrub-burgundy.png', alt: 'Men’s Crown Executive Mandarin Scrub Set Front View' },
      { src: 'demo-hang-scrub-navy.png', alt: 'Men’s Crown Mandarin Navy View' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Burgundy Maroon', hex: '#581C87', image: 'demo-hang-scrub-burgundy.png' },
      { name: 'Olive Shine', hex: '#3F4E3B', image: 'demo-hang-scrub-olive.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 2B. Men → Scrubs → Ground
  {
    id: 'preview-men-ground-tactical-scrub-set',
    handle: 'men-ground-heavy-duty-scrub-set',
    sku: 'ENM-GRD-M-02B',
    title: 'Men’s Ground Heavy-Duty Tactical Scrub Set (Preview)',
    cleanTitle: 'Men’s Ground Tactical Scrub Set',
    category: 'scrub-set',
    gender: 'men',
    series: 'Ground',
    basePrice: 6650,
    comparePrice: 7600,
    badge: 'HEAVY-DUTY TWILL',
    fabric: 'Reinforced High-Density Tactical Gabardine with Fluid-Shield Barrier',
    description: 'Heavy-duty clinical scrub set engineered for high-intensity emergency room resilience. Deep cargo utility pockets and reinforced stress points.',
    image: 'demo-hang-scrub-black.png',
    images: [
      { src: 'demo-hang-scrub-black.png', alt: 'Men’s Ground Tactical Scrub Set' }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' },
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Hunter Green', hex: '#14532D', image: 'demo-hang-scrub-olive.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 3. Women → Scrubs → Sprinter
  {
    id: 'preview-women-sprinter-scrub-set',
    handle: 'women-sprinter-athletic-scrub-set',
    sku: 'ENM-SPR-W-03',
    title: 'Women’s Sprinter Athletic 4-Way Stretch Scrub Set (Preview)',
    cleanTitle: 'Women’s Sprinter Athletic Scrub Set',
    category: 'scrub-set',
    gender: 'women',
    series: 'Sprinter',
    basePrice: 6250,
    comparePrice: 7200,
    badge: '4-WAY STRETCH',
    fabric: 'Flexi-Tech AeroStretch Twill (72% Poly, 21% Rayon, 7% Spandex)',
    description: 'Feminine contour cut with princess seams, 4-way mechanical stretch, reinforced double-needle stitching, and multi-pocket high-waisted comfort waistband joggers.',
    image: 'demo-hang-scrub-navy.png',
    images: [
      { src: 'demo-hang-scrub-navy.png', alt: 'Women’s Sprinter Scrub Set' },
      { src: 'demo-hang-scrub-teal.png', alt: 'Women’s Scrub Styling' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Clinical Teal', hex: '#00B8A9', image: 'demo-hang-scrub-teal.png' },
      { name: 'Ceil Blue', hex: '#6BA4B8', image: 'demo-hang-scrub-teal.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 4. Women → Scrubs → Crown
  {
    id: 'preview-women-crown-mandarin-scrub-set',
    handle: 'women-crown-executive-mandarin-scrub-set',
    sku: 'ENM-CRW-W-04',
    title: 'Women’s Crown Executive Mandarin Collar Scrub Set (Preview)',
    cleanTitle: 'Women’s Crown Mandarin Scrub Set',
    category: 'scrub-set',
    gender: 'women',
    series: 'Crown',
    basePrice: 6850,
    comparePrice: 7800,
    badge: 'EXECUTIVE CUT',
    fabric: 'Executive High-Density Antimicrobial Micro-Twill with Fluid Barrier',
    description: 'Precision mandarin collar tailored specifically for female physicians and specialists. Concealed placket, tapered silhouette, and wrinkle-defying clinical performance.',
    image: 'demo-hang-scrub-burgundy.png',
    images: [
      { src: 'demo-hang-scrub-burgundy.png', alt: 'Women’s Crown Scrub Set' },
      { src: 'demo-hang-scrub-navy.png', alt: 'Women’s Mandarin Detail' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Burgundy Maroon', hex: '#581C87', image: 'demo-hang-scrub-burgundy.png' },
      { name: 'Hunter Green', hex: '#14532D', image: 'demo-hang-scrub-olive.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 4B. Women → Scrubs → Ground
  {
    id: 'preview-women-ground-tactical-scrub-set',
    handle: 'women-ground-heavy-duty-scrub-set',
    sku: 'ENM-GRD-W-04B',
    title: 'Women’s Ground Heavy-Duty Performance Scrub Set (Preview)',
    cleanTitle: 'Women’s Ground Performance Scrub Set',
    category: 'scrub-set',
    gender: 'women',
    series: 'Ground',
    basePrice: 6650,
    comparePrice: 7600,
    badge: 'HEAVY-DUTY TWILL',
    fabric: 'Reinforced Antimicrobial Tactical Twill with Liquid Barrier',
    description: 'Robust clinical performance scrub tailored for intensive nursing rounds, triage, and operating duty.',
    image: 'demo-hang-scrub-black.png',
    images: [
      { src: 'demo-hang-scrub-black.png', alt: 'Women’s Ground Performance Scrub Set' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' },
      { name: 'Clinical Teal', hex: '#00B8A9', image: 'demo-hang-scrub-teal.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 5. Women → Scrubs → Vilora
  {
    id: 'preview-women-vilora-luxury-scrub-set',
    handle: 'women-vilora-luxury-micro-drape-scrub-set',
    sku: 'ENM-VLR-W-05',
    title: 'Women’s Vilora Luxury Tailored Micro-Drape Scrub Set (Preview)',
    cleanTitle: 'Women’s Vilora Micro-Drape Scrub Set',
    category: 'scrub-set',
    gender: 'women',
    series: 'Vilora',
    basePrice: 6500,
    comparePrice: 7500,
    badge: 'MICRO-DRAPE',
    fabric: 'Liquid-Soft Micro-Drape (Fluid-Repellent & 24hr Wrinkle-Free)',
    description: 'Liquid-soft touch with graceful fluid drape. Infused with silver-ion antimicrobial barrier and wrinkle-release weave that stays impeccable through emergency calls.',
    image: 'demo-hang-scrub-teal.png',
    images: [
      { src: 'demo-hang-scrub-teal.png', alt: 'Women’s Vilora Scrub Set' },
      { src: 'demo-hang-scrub-navy.png', alt: 'Vilora Tailored Detail' }
    ],
    colors: [
      { name: 'Clinical Teal', hex: '#00B8A9', image: 'demo-hang-scrub-teal.png' },
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-hang-scrub-navy.png' },
      { name: 'Burgundy Maroon', hex: '#581C87', image: 'demo-hang-scrub-burgundy.png' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'demo-hang-scrub-black.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 6. Men → Lab Coats (Helium / Wrinkle-Free)
  {
    id: 'preview-men-helium-lab-coat',
    handle: 'men-helium-technical-white-lab-coat',
    sku: 'ENM-HLM-M-06',
    title: 'Men’s Helium Technical Optical White Lab Coat (Preview)',
    cleanTitle: 'Men’s Helium Technical Lab Coat',
    category: 'lab-coat',
    gender: 'men',
    series: 'Helium',
    basePrice: 7500,
    comparePrice: 8500,
    badge: 'WRINKLE-FREE',
    fabric: 'Shield-Barrier Antimicrobial Optical White Cotton-Blend',
    description: 'Crisp optical white technical doctor coat featuring reinforced stethoscope collar loop, dual oversized iPad/tablet pocket, pass-through side slits, and French-cuff finish.',
    image: 'demo-hang-labcoat-white.png',
    images: [
      { src: 'demo-hang-labcoat-white.png', alt: 'Men’s Helium Technical Lab Coat' }
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF', image: 'demo-hang-labcoat-white.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 6B. Men → Lab Coats (Suiting Range)
  {
    id: 'preview-men-suiting-lab-coat',
    handle: 'men-suiting-executive-consultant-lab-coat',
    sku: 'ENM-SUT-M-06B',
    title: 'Men’s Suiting Executive Consultant Lab Coat (Preview)',
    cleanTitle: 'Men’s Suiting Executive Lab Coat',
    category: 'lab-coat',
    gender: 'men',
    series: 'Suiting',
    basePrice: 8500,
    comparePrice: 9500,
    badge: 'EXECUTIVE SUITING',
    fabric: 'Dense Structured Gabardine Twill with Teflon Stain-Defend',
    description: 'Bespoke structured consultant coat featuring notched lapels, chest welt pocket, and vented back pleating tailored for senior clinical leaders.',
    image: 'demo-hang-labcoat-white.png',
    images: [
      { src: 'demo-hang-labcoat-white.png', alt: 'Men’s Suiting Executive Lab Coat' }
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF', image: 'demo-hang-labcoat-white.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 7. Women → Lab Coats (Helium / Wrinkle-Free)
  {
    id: 'preview-women-helium-lab-coat',
    handle: 'women-helium-technical-white-lab-coat',
    sku: 'ENM-HLM-W-07',
    title: 'Women’s Helium Technical Optical White Lab Coat (Preview)',
    cleanTitle: 'Women’s Helium Technical Lab Coat',
    category: 'lab-coat',
    gender: 'women',
    series: 'Helium',
    basePrice: 7500,
    comparePrice: 8500,
    badge: 'WRINKLE-FREE',
    fabric: 'Shield-Barrier Antimicrobial Optical White Cotton-Blend',
    description: 'Elegantly tailored consultant coat with back pleating, ergonomic lapels, tablet-sized pockets, and stain-resistant Teflon shield engineered for clinical leadership.',
    image: 'demo-hang-labcoat-white.png',
    images: [
      { src: 'demo-hang-labcoat-white.png', alt: 'Women’s Helium Technical Lab Coat' }
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF', image: 'demo-hang-labcoat-white.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 7B. Women → Lab Coats (Suiting Range)
  {
    id: 'preview-women-suiting-lab-coat',
    handle: 'women-suiting-tailored-consultant-lab-coat',
    sku: 'ENM-SUT-W-07B',
    title: 'Women’s Suiting Tailored Executive Lab Coat (Preview)',
    cleanTitle: 'Women’s Suiting Tailored Lab Coat',
    category: 'lab-coat',
    gender: 'women',
    series: 'Suiting',
    basePrice: 8500,
    comparePrice: 9500,
    badge: 'EXECUTIVE SUITING',
    fabric: 'Dense Structured Gabardine Twill with Teflon Stain-Defend',
    description: 'Tailored feminine silhouette with contoured waist seam, notched lapels, hidden tablet pockets, and optical white finish.',
    image: 'demo-hang-labcoat-white.png',
    images: [
      { src: 'demo-hang-labcoat-white.png', alt: 'Women’s Suiting Tailored Lab Coat' }
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF', image: 'demo-hang-labcoat-white.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: true,
    companionIds: ['preview-bunfit-cap-navy', 'preview-compression-sleeves']
  },

  // 8. Caps (BunFit™ Series)
  {
    id: 'preview-bunfit-cap-navy',
    handle: 'bunfit-ergonomic-surgical-scrub-cap',
    sku: 'ENM-CAP-08',
    title: 'BunFit™ Ergonomic Surgical Scrub Cap (Preview)',
    cleanTitle: 'BunFit™ Surgical Scrub Cap',
    category: 'caps',
    gender: 'unisex',
    series: 'BunFit',
    basePrice: 1650,
    comparePrice: 1950,
    badge: 'SURGICAL GRADE',
    fabric: '100% Breathable Egyptian Cotton with Absorbent Forehead Terry Band',
    description: 'Engineered for full hair containment and pony/bun comfort. Features built-in mask ear-relief buttons, sweat-absorbing forehead band, and adjustable rear tie closure.',
    image: 'cat-caps.jpg',
    images: [
      { src: 'cat-caps.jpg', alt: 'BunFit™ Surgical Cap' }
    ],
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'cat-caps.jpg' },
      { name: 'Clinical Teal', hex: '#00B8A9', image: 'cat-caps.jpg' },
      { name: 'Burgundy Maroon', hex: '#581C87', image: 'cat-caps.jpg' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'cat-caps.jpg' }
    ],
    sizes: ['One Size (Adjustable)'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: false
  },

  // 9. Sleeves (Compression Sleeves)
  {
    id: 'preview-compression-sleeves',
    handle: 'clinical-graduated-compression-arm-sleeves',
    sku: 'ENM-SLV-09',
    title: 'Clinical Graduated Compression Arm Sleeves (Preview)',
    cleanTitle: 'Clinical Compression Arm Sleeves',
    category: 'sleeves',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 1450,
    comparePrice: 1750,
    badge: 'GRADUATED COMPRESSION',
    fabric: 'Moisture-Wicking UV-Shield Poly-Spandex with Silicone Grip Bands',
    description: 'Medical-grade 15-20 mmHg graduated arm compression to prevent fatigue during lengthy operating theater procedures. Non-slip upper bicep silicone band.',
    image: 'cat-flexfit.jpg',
    images: [
      { src: 'cat-flexfit.jpg', alt: 'Clinical Compression Arm Sleeves' }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', image: 'cat-flexfit.jpg' },
      { name: 'Deep Navy', hex: '#102A43', image: 'cat-flexfit.jpg' },
      { name: 'Optical White', hex: '#FFFFFF', image: 'cat-flexfit.jpg' }
    ],
    sizes: ['S/M', 'L/XL'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: false
  },

  // 10. Accessories (Clinical Clogs)
  {
    id: 'preview-clinical-ortho-clogs',
    handle: 'antimicrobial-eva-surgical-ortho-clogs',
    sku: 'ENM-CLG-10',
    title: 'Antimicrobial EVA Surgical Ortho Clogs (Preview)',
    cleanTitle: 'Antimicrobial Clinical Clogs',
    category: 'accessories',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 4200,
    comparePrice: 4800,
    badge: 'ORTHOPEDIC',
    fabric: 'Closed-Cell Water-Resistant Shock-Absorbing EVA Foam',
    description: 'Ultra-lightweight surgical theatre clogs with arch support, slip-resistant grooved tread, washable surface, and pivot heel strap for 12+ hour standing support.',
    image: 'cat-clogs.jpg',
    images: [
      { src: 'cat-clogs.jpg', alt: 'Antimicrobial Clinical Ortho Clogs' }
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF', image: 'cat-clogs.jpg' },
      { name: 'Deep Navy', hex: '#102A43', image: 'cat-clogs.jpg' },
      { name: 'Obsidian Black', hex: '#18181B', image: 'cat-clogs.jpg' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    variantId: 67718805684512,
    isPreview: true,
    supportsCustomization: false
  }
];
