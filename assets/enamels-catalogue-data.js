/**
 * Enamels Medical Apparel — Master Demo Catalogue Data Engine
 * 35 Comprehensive, realistic medical fashion products across all categories:
 * Scrubs (Men, Women, Unisex), Series (Sprinter, Velora, Crown), Surgical Caps,
 * Lab Coats, Medical Accessories, and Personalization Services.
 */

window.EnamelsCatalogue = [
  // --- MEN'S SCRUBS ---
  {
    id: 'demo-sprinter-mens-navy',
    sku: 'ENM-SPRN-NVY',
    title: "DEMO — Sprinter Men's Athletic Scrub Set",
    category: 'scrub-set',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 5150,
    comparePrice: 5800,
    badge: 'BEST SELLER',
    fabric: '4-Way Mechanical Stretch (72% Poly, 21% Rayon, 7% Spandex)',
    description: "Engineered for high-tempo emergency shifts and clinical rounds. Tailored raglan sleeves for unrestricted arm mobility, deep chest pocket with pen slot, and 6-pocket functional cargo joggers with ribbed cuffs.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Deep Navy', hex: '#102A43', image: 'demo-sprinter-navy.jpg' },
      { name: 'Royal Blue', hex: '#1e40af', image: 'demo-sprinter-navy.jpg' },
      { name: 'Ceil Blue', hex: '#6ba4b8', image: 'demo-sprinter-navy.jpg' },
      { name: 'Obsidian Black', hex: '#18181b', image: 'demo-sprinter-navy.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-navy', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-sprinter-mens-top-royal',
    sku: 'ENM-SPRN-TOP-RBL',
    title: "DEMO — Sprinter Men's Raglan Scrub Top",
    category: 'scrub-top',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 2650,
    comparePrice: 2950,
    badge: '4-WAY STRETCH',
    fabric: 'Technical Antimicrobial Stretch Fabric',
    description: "Athletic cut scrub top featuring reinforced double needle stitching, ergonomic side vents, badge loop on shoulder seam, and hidden smartphone pocket inside the main chest pocket.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Royal Blue', hex: '#1e40af' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Obsidian Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-sprinter-mens-jogger-black', 'demo-cap-bunfit-navy']
  },
  {
    id: 'demo-sprinter-mens-jogger-black',
    sku: 'ENM-SPRN-PNT-BLK',
    title: "DEMO — Sprinter Men's 6-Pocket Cargo Joggers",
    category: 'scrub-pants',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 2500,
    comparePrice: 2850,
    badge: 'WATER RESISTANT',
    fabric: 'Fluid-Repellent Performance Twill',
    description: "Ultra-comfortable medical scrub pants featuring high-stretch elastic waistband with flat drawstring, two deep hand pockets, two secure zippered cargo pockets, and ribbed ankle cuffs.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Heather Grey', hex: '#475569' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: false,
    companionIds: ['demo-sprinter-mens-top-royal', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-velora-mens-ceil',
    sku: 'ENM-VEL-MEN-CBL',
    title: "DEMO — Velora Men's Executive Scrub Set",
    category: 'scrub-set',
    gender: 'men',
    series: 'Velora',
    basePrice: 5500,
    comparePrice: 6200,
    badge: 'ULTRA SOFT',
    fabric: 'Silky-Soft Micro-Drape Blend',
    description: "Crafted for maximum comfort in OT and ICU environments. Incredibly soft against skin with wrinkle-release properties that stay sharp through 24-hour shifts without ironing.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Ceil Blue', hex: '#6ba4b8' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Olive Shine', hex: '#3f4e3b' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-teal', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-crown-mens-burgundy',
    sku: 'ENM-CRW-MEN-BUR',
    title: "DEMO — Crown Men's Mandarin Collar Scrub Set",
    category: 'scrub-set',
    gender: 'men',
    series: 'Crown',
    basePrice: 6200,
    comparePrice: 6900,
    badge: 'EXECUTIVE',
    fabric: 'Structured Anti-Microbial Gabardine',
    description: "The pinnacle of healthcare sophistication. Structured standing mandarin collar, concealed magnetic zip closure, pen welt, and tailored straight-cut pants with reinforced belt loops.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Burgundy Maroon', hex: '#581c87', image: 'demo-crown-burgundy.jpg' },
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-lab-consultant-white', 'demo-cap-printed-cardiac']
  },
  {
    id: 'demo-flexfit-mens-olive',
    sku: 'ENM-FLX-MEN-OLV',
    title: "DEMO — FlexFit Performance Stretch Scrub Set",
    category: 'scrub-set',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 5400,
    comparePrice: 5950,
    badge: 'NEW ARRIVAL',
    fabric: 'Hyper-Stretch Breathable Technical Weave',
    description: "Military olive shade with subtle sheen. Engineered with laser-cut breathability perforations in the underarm panels and back yoke for superior thermal regulation in warm wards.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Olive Shine', hex: '#3f4e3b' },
      { name: 'Hunter Green', hex: '#14532d' },
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-kennedy-olive', 'demo-acc-socks-teal']
  },

  // --- WOMEN'S SCRUBS ---
  {
    id: 'demo-velora-womens-teal',
    sku: 'ENM-VEL-WMN-TEL',
    title: "DEMO — Velora Women's Tailored Scrub Set",
    category: 'scrub-set',
    gender: 'women',
    series: 'Velora',
    basePrice: 5500,
    comparePrice: 6200,
    badge: 'BEST SELLER',
    fabric: 'Ultra-Soft Fluid Drape Fabric (Antimicrobial)',
    description: "Our signature women's scrub set. Elegant curved v-neck with subtle darts for feminine tailoring, paired with high-waisted jogger pants with elasticated back and flat front tummy-flattering band.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Clinical Teal', hex: '#00B8A9', image: 'demo-velora-teal.jpg' },
      { name: 'Lilac Lavender', hex: '#A855F7' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Burgundy Wine', hex: '#581c87' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-teal', 'demo-acc-sleeves-navy']
  },
  {
    id: 'demo-velora-womens-top-lilac',
    sku: 'ENM-VEL-TOP-LIL',
    title: "DEMO — Velora Summit V-Neck Scrub Top",
    category: 'scrub-top',
    gender: 'women',
    series: 'Velora',
    basePrice: 2800,
    comparePrice: 3150,
    badge: 'TRENDING',
    fabric: 'Silky Touch Breathable Polyester-Rayon',
    description: "Flattering feminine v-neck scrub top featuring contoured princess seams, two deep front patch pockets with inner utility divider, and antimicrobial silver-ion fabric treatment.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Lilac Lavender', hex: '#A855F7' },
      { name: 'Clinical Teal', hex: '#00B8A9' },
      { name: 'Ceil Blue', hex: '#6ba4b8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-velora-womens-pant-hunter', 'demo-cap-printed-flora']
  },
  {
    id: 'demo-velora-womens-pant-hunter',
    sku: 'ENM-VEL-PNT-HGR',
    title: "DEMO — Velora High-Waisted Wide-Leg Scrub Pants",
    category: 'scrub-pants',
    gender: 'women',
    series: 'Velora',
    basePrice: 2700,
    comparePrice: 3000,
    badge: 'MODEST FIT',
    fabric: 'Fluid Non-Cling Stretch Fabric',
    description: "Full-coverage relaxed wide-leg cut designed for modesty and maximum mobility. High-rise elastic waist with inner drawcord and side slash pockets.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Hunter Green', hex: '#14532d' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Obsidian Black', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: false,
    companionIds: ['demo-velora-womens-top-lilac', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-sprinter-womens-grey',
    sku: 'ENM-SPRN-WMN-GRY',
    title: "DEMO — Sprinter Women's Slim Jogger Scrub Set",
    category: 'scrub-set',
    gender: 'women',
    series: 'Sprinter',
    basePrice: 5150,
    comparePrice: 5800,
    badge: '4-WAY STRETCH',
    fabric: 'Technical Athletic Stretch Fabric',
    description: "Slim-cut modern scrub set in versatile Heather Grey. Engineered for doctors on the move with stain-release nanotechnology and 7 ergonomic clinical pockets.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Heather Grey', hex: '#475569' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Clinical Teal', hex: '#00B8A9' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-navy', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-crown-womens-black',
    sku: 'ENM-CRW-WMN-BLK',
    title: "DEMO — Crown Women's Structured Scrub Set",
    category: 'scrub-set',
    gender: 'women',
    series: 'Crown',
    basePrice: 6200,
    comparePrice: 6900,
    badge: 'EXECUTIVE',
    fabric: 'Wrinkle-Free Structured Fabric',
    description: "Formal consultation elegance with sharp mandarin collar, sleek invisible zip placket, tailored back waist cinch, and slim straight-leg trousers.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Burgundy Wine', hex: '#581c87' },
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-lab-helium-white', 'demo-cap-printed-flora']
  },
  {
    id: 'demo-flora-womens-coral',
    sku: 'ENM-FLR-WMN-CRL',
    title: "DEMO — Flora Slim-Fit Contour Scrub Set",
    category: 'scrub-set',
    gender: 'women',
    series: 'Velora',
    basePrice: 5600,
    comparePrice: 6300,
    badge: 'LIMITED EDITION',
    fabric: 'Soft-Drape Spandex Blend',
    description: "Eye-catching Blush Coral tone popular in Pediatrics and Dermatology. Antimicrobial, fade-resistant through 100+ commercial hospital laundries.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Blush Coral', hex: '#FF6B6B' },
      { name: 'Lilac Lavender', hex: '#A855F7' },
      { name: 'Clinical Teal', hex: '#00B8A9' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-printed-flora', 'demo-acc-sleeves-navy']
  },

  // --- UNISEX SCRUBS ---
  {
    id: 'demo-classic-unisex-ceil',
    sku: 'ENM-CLS-UNX-CBL',
    title: "DEMO — Classic All-Shift Unisex Scrub Set",
    category: 'scrub-set',
    gender: 'unisex',
    series: 'Sprinter',
    basePrice: 4200,
    comparePrice: 4800,
    badge: 'ESSENTIAL',
    fabric: 'Durable Poly-Cotton Stretch Poplin',
    description: "The trusted daily workhorse for medical students, house officers, and nursing teams. Roomy comfortable unisex cut, reversible v-neck top, and drawstring scrub trousers.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Ceil Blue', hex: '#6ba4b8' },
      { name: 'Royal Blue', hex: '#1e40af' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Hunter Green', hex: '#14532d' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-navy', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-crown-unisex-burgundy',
    sku: 'ENM-CRW-UNX-BUR',
    title: "DEMO — Crown Unisex Executive Scrub Set",
    category: 'scrub-set',
    gender: 'unisex',
    series: 'Crown',
    basePrice: 6200,
    comparePrice: 6900,
    badge: 'PREMIUM',
    fabric: 'Premium Structured Anti-Microbial Fabric',
    description: "Designed for senior consultants, professors, and surgeons. Features high-density weave that completely repels lint and liquids.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Burgundy Maroon', hex: '#581c87', image: 'demo-crown-burgundy.jpg' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Obsidian Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-lab-consultant-white', 'demo-cap-printed-cardiac']
  },
  {
    id: 'demo-underscrub-tee-white',
    sku: 'ENM-UND-TEE-WHT',
    title: "DEMO — Underscrub Technical Base Layer Tee",
    category: 'scrub-top',
    gender: 'unisex',
    series: 'Sprinter',
    basePrice: 1850,
    comparePrice: 2200,
    badge: 'BREATHABLE',
    fabric: 'Second-Skin Micro-Modal Stretch',
    description: "Worn under scrubs for temperature control in chilled operating rooms and wards. Ultra-fine micro-modal fabric wicks sweat instantly with thumbhole sleeves.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Optic White', hex: '#ffffff' },
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    supportsCustomization: false,
    companionIds: ['demo-sprinter-mens-navy', 'demo-velora-womens-teal']
  },
  {
    id: 'demo-underscrub-mock-black',
    sku: 'ENM-UND-MCK-BLK',
    title: "DEMO — Underscrub Breathable Mock-Neck",
    category: 'scrub-top',
    gender: 'unisex',
    series: 'Sprinter',
    basePrice: 1950,
    comparePrice: 2300,
    badge: 'THERMAL REGULATION',
    fabric: 'Brushed Micro-Fleece Interior',
    description: "Comfortable low mock-neck tee offering collar coverage and core warmth during long cold night shifts in hospital ICUs and emergency units.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    supportsCustomization: false,
    companionIds: ['demo-crown-mens-burgundy', 'demo-velora-womens-teal']
  },

  // --- SURGICAL CAPS ---
  {
    id: 'demo-cap-bunfit-navy',
    sku: 'ENM-CAP-BNF-NVY',
    title: "DEMO — BunFit™ Extra Volume Scrub Cap (Navy)",
    category: 'caps',
    gender: 'unisex',
    series: 'BunFit',
    basePrice: 1450,
    comparePrice: 1650,
    badge: 'PATENTED FIT',
    fabric: '100% Breathable Technical Cotton Poplin',
    description: "Enamels proprietary BunFit™ technology specifically engineered for long hair, voluminous buns, and braids. Pouch back design with elastic and wide cotton tie ribbons prevents pressure headaches.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Clinical Teal', hex: '#00B8A9' },
      { name: 'Obsidian Black', hex: '#18181b' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-sprinter-mens-navy', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-cap-bunfit-teal',
    sku: 'ENM-CAP-BNF-TEL',
    title: "DEMO — BunFit™ Extra Volume Scrub Cap (Teal)",
    category: 'caps',
    gender: 'women',
    series: 'BunFit',
    basePrice: 1450,
    comparePrice: 1650,
    badge: 'BEST SELLER',
    fabric: 'Soft Breathable Stretch Cotton',
    description: "Matches Velora and Sprinter clinical teal scrubs. Includes built-in soft terry cloth forehead sweatband for comfort throughout 10-hour operations.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Clinical Teal', hex: '#00B8A9' },
      { name: 'Lilac Lavender', hex: '#A855F7' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-velora-womens-teal', 'demo-acc-sleeves-navy']
  },
  {
    id: 'demo-cap-kennedy-olive',
    sku: 'ENM-CAP-KND-OLV',
    title: "DEMO — Kennedy Series Tailored Surgical Cap",
    category: 'caps',
    gender: 'men',
    series: 'BunFit',
    basePrice: 1250,
    comparePrice: 1450,
    badge: 'SURGEON CHOICE',
    fabric: 'Lightweight Quick-Dry Ripstop',
    description: "Sleek low-profile skull cap cut designed for short hair. Built-in mask ear buttons prevent ear strain from surgical N95 and 3-ply mask loops.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Olive Shine', hex: '#3f4e3b' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Obsidian Black', hex: '#18181b' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-flexfit-mens-olive', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-cap-printed-cardiac',
    sku: 'ENM-CAP-PRT-CRD',
    title: "DEMO — Printed Surgical Cap: Cardiac Anatomy",
    category: 'caps',
    gender: 'unisex',
    series: 'BunFit',
    basePrice: 1650,
    comparePrice: 1850,
    badge: 'LIMITED EDITION',
    fabric: 'High-Density Printed Japanese Cotton',
    description: "Intricate anatomical heart & ECG rhythm design on deep midnight blue background. Fully colorfast print resistant to high-temp autoclaves and hospital detergents.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Cardiac Navy', hex: '#102A43' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-crown-mens-burgundy', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-cap-printed-anaesthesia',
    sku: 'ENM-CAP-PRT-ANS',
    title: "DEMO — Printed Surgical Cap: Anaesthesia Vitals",
    category: 'caps',
    gender: 'unisex',
    series: 'BunFit',
    basePrice: 1650,
    comparePrice: 1850,
    badge: 'POPULAR',
    fabric: 'Premium Soft-Touch Breathable Cotton',
    description: "Vibrant syringe, pulse-ox, and pharmacological vitals print. Loved by anaesthetists, perfusionists, and critical care teams.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Teal Vitals', hex: '#00B8A9' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-sprinter-mens-navy', 'demo-acc-sleeves-black']
  },
  {
    id: 'demo-cap-printed-flora',
    sku: 'ENM-CAP-PRT-FLR',
    title: "DEMO — Printed Surgical Cap: Royal Botanical Flora",
    category: 'caps',
    gender: 'women',
    series: 'BunFit',
    basePrice: 1650,
    comparePrice: 1850,
    badge: 'TRENDING',
    fabric: 'Pure Organic Cotton Weave',
    description: "Delicate botanical floral foliage in lilac, teal, and blush tones on clinical white. Adds warmth and elegance to pediatric and surgical suites.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Royal Flora', hex: '#A855F7' }
    ],
    sizes: ['One Size Fits All'],
    supportsCustomization: true,
    companionIds: ['demo-velora-womens-teal', 'demo-flora-womens-coral']
  },

  // --- LAB COATS ---
  {
    id: 'demo-lab-helium-white',
    sku: 'ENM-LAB-HLM-WMN',
    title: "DEMO — Helium Series Women's Fitted Lab Coat",
    category: 'lab-coat',
    gender: 'women',
    series: 'Helium',
    basePrice: 2950,
    comparePrice: 3450,
    badge: 'BEST SELLER',
    fabric: 'Fluid-Repellent Anti-Wrinkle Gabardine',
    description: "Engineered specifically for female physicians. Modern slim silhouette with back contour seams, princess cut, tablet-sized reinforced pockets, and stethoscope loop on lapel.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Optic White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-velora-womens-teal', 'demo-srv-name-embroidery']
  },
  {
    id: 'demo-lab-consultant-white',
    sku: 'ENM-LAB-CNS-MEN',
    title: "DEMO — Consultant Series Men's Professional Lab Coat",
    category: 'lab-coat',
    gender: 'men',
    series: 'Helium',
    basePrice: 3450,
    comparePrice: 3950,
    badge: 'EXECUTIVE',
    fabric: 'Heavyweight Premium Twill (Wrinkle-Free)',
    description: "Classic executive 38-inch length consultation coat. Features notched lapel, vented back for easy stride, side access slits to reach scrub pant pockets, and interior chest pocket.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Optic White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-crown-mens-burgundy', 'demo-srv-name-embroidery']
  },
  {
    id: 'demo-lab-short-jacket-white',
    sku: 'ENM-LAB-JKT-WHT',
    title: "DEMO — Short Consultation Lab Jacket",
    category: 'lab-coat',
    gender: 'unisex',
    series: 'Helium',
    basePrice: 2650,
    comparePrice: 2950,
    badge: 'CLINICAL UTILITY',
    fabric: 'Stain-Resistant Lightweight Stretch Weave',
    description: "Modern 30-inch hip-length lab jacket for dentists, dermatologists, and lab technologists. Ribbed cuffs stay securely pushed up on forearms during procedures.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Optic White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    supportsCustomization: true,
    companionIds: ['demo-classic-unisex-ceil', 'demo-srv-name-embroidery']
  },

  // --- ACCESSORIES ---
  {
    id: 'demo-acc-sleeves-black',
    sku: 'ENM-ACC-SLV-BLK',
    title: "DEMO — Med Sleeves Graduated Compression Arm Sleeves",
    category: 'accessories',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 750,
    comparePrice: 950,
    badge: 'ANTI-FATIGUE',
    fabric: 'Seamless 20-30 mmHg Medical Compression Lycra',
    description: "Worn by surgical teams during multi-hour operations to boost venous return, reduce forearm swelling, and provide thermal protection in chilled OT suites.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Deep Navy', hex: '#102A43' },
      { name: 'Optic White', hex: '#ffffff' }
    ],
    sizes: ['S/M', 'L/XL'],
    supportsCustomization: false,
    companionIds: ['demo-sprinter-mens-navy', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-acc-sleeves-navy',
    sku: 'ENM-ACC-SLV-NVY',
    title: "DEMO — Med Sleeves Graduated Compression Arm Sleeves (Navy)",
    category: 'accessories',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 750,
    comparePrice: 950,
    badge: 'ANTI-FATIGUE',
    fabric: 'Seamless Medical Compression Lycra',
    description: "Navy blue pair designed to match Deep Navy Enamels scrub sets. Anti-slip silicone upper band prevents slippage during strenuous clinical work.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Deep Navy', hex: '#102A43' }
    ],
    sizes: ['S/M', 'L/XL'],
    supportsCustomization: false,
    companionIds: ['demo-velora-womens-teal', 'demo-cap-bunfit-navy']
  },
  {
    id: 'demo-acc-socks-teal',
    sku: 'ENM-ACC-SCK-TEL',
    title: "DEMO — All-Day Support Clinical Compression Socks",
    category: 'accessories',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 550,
    comparePrice: 750,
    badge: 'BEST SELLER',
    fabric: 'Graduated Compression Microfiber Knit',
    description: "Designed for hospital staff on their feet for 12+ hours. Knee-high graduated compression promotes blood circulation, prevents varicose veins, and relieves leg heaviness.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Teal/Navy Sport', hex: '#00B8A9' },
      { name: 'Classic Black', hex: '#18181b' }
    ],
    sizes: ['Standard (Shoe 37-44)'],
    supportsCustomization: false,
    companionIds: ['demo-sprinter-mens-navy', 'demo-velora-womens-teal']
  },
  {
    id: 'demo-acc-clogs-black',
    sku: 'ENM-ACC-CLG-BLK',
    title: "DEMO — Ergonomic Orthopaedic Healthcare Clogs",
    category: 'accessories',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 3850,
    comparePrice: 4500,
    badge: 'ANTISLIP',
    fabric: 'Autoclavable Shock-Absorbing EVA Polymer',
    description: "Certified slip-resistant outsole on wet hospital tiles. Removable orthotic footbed with arch support, ventilation side ports, and pivoting heel strap.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    supportsCustomization: false,
    companionIds: ['demo-acc-socks-teal', 'demo-sprinter-mens-navy']
  },

  // --- CUSTOMIZATION SERVICES & PATCHES ---
  {
    id: 'demo-srv-name-embroidery',
    sku: 'ENM-SRV-EMB',
    title: "DEMO — Direct Name & Department Personalization Service",
    category: 'patches',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 450,
    comparePrice: 550,
    badge: 'CUSTOM SERVICE',
    fabric: 'High-Density Rayon Embroidery Thread',
    description: "Computerized chest pocket personalization. Includes up to two lines of crisp text: Doctor Name / Title and Specialty / Hospital Department.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Medical White Thread', hex: '#ffffff' },
      { name: 'Clinical Gold Thread', hex: '#fbbf24' },
      { name: 'Cyan Blue Thread', hex: '#39D5F6' },
      { name: 'Obsidian Black Thread', hex: '#18181b' }
    ],
    sizes: ['Chest Pocket Placement'],
    supportsCustomization: true,
    companionIds: ['demo-sprinter-mens-navy', 'demo-lab-helium-white']
  },
  {
    id: 'demo-srv-velcro-patch',
    sku: 'ENM-SRV-NPT',
    title: "DEMO — Personalized Velcro Name Patch",
    category: 'patches',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 350,
    comparePrice: 450,
    badge: 'REMOVABLE',
    fabric: 'Reinforced Merrowed Edge Fabric with Velcro Hook/Loop',
    description: "Interchangeable military-spec medical name patch. Perfect for hospital departments where badges must be detached before industrial laundry cycles.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Navy Patch / White Text', hex: '#102A43' },
      { name: 'Black Patch / Gold Text', hex: '#18181b' }
    ],
    sizes: ['10cm x 3cm'],
    supportsCustomization: true,
    companionIds: ['demo-sprinter-mens-navy', 'demo-flexfit-mens-olive']
  },
  {
    id: 'demo-srv-logo-patch',
    sku: 'ENM-SRV-LPT',
    title: "DEMO — Custom Hospital / Clinic Logo Patch Service",
    category: 'patches',
    gender: 'unisex',
    series: 'Accessories',
    basePrice: 650,
    comparePrice: 850,
    badge: 'INSTITUTIONAL',
    fabric: 'High-Definition Precision Embroidered Crest',
    description: "Custom digitized institutional crest for hospitals, medical colleges, dental clinics, and surgical departments. Accepts custom artwork upload.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Multi-Color Thread Match', hex: '#00B8A9' }
    ],
    sizes: ['Standard Crest (7cm)'],
    supportsCustomization: true,
    companionIds: ['demo-crown-mens-burgundy', 'demo-lab-consultant-white']
  },

  // --- BUNDLES & SETS ---
  {
    id: 'demo-bnd-shift-duo',
    sku: 'ENM-BND-SHF-DUO',
    title: "DEMO — Sprinter Shift Duo: Scrub Set + Matching BunFit Cap",
    category: 'bundles',
    gender: 'men',
    series: 'Sprinter',
    basePrice: 6100,
    comparePrice: 6600,
    badge: 'SAVE RS. 500',
    fabric: 'Matching 4-Way Stretch Performance Ensemble',
    description: "The complete color-matched scrub set and BunFit™ surgical cap bundle. Save Rs. 500 instantly compared to purchasing pieces separately.",
    image: 'demo-sprinter-navy.jpg',
    colors: [
      { name: 'Deep Navy Duo', hex: '#102A43', image: 'demo-sprinter-navy.jpg' },
      { name: 'Clinical Teal Duo', hex: '#00B8A9' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-acc-sleeves-black', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-bnd-executive-resident',
    sku: 'ENM-BND-EXC-RES',
    title: "DEMO — Executive Resident Bundle: Crown Set + Lab Coat + Embroidery",
    category: 'bundles',
    gender: 'unisex',
    series: 'Crown',
    basePrice: 9450,
    comparePrice: 10250,
    badge: 'SAVE RS. 800',
    fabric: 'Crown Mandarin Scrub Set + Helium Lab Coat + Included Embroidery',
    description: "The ultimate hospital ward leadership kit. Includes tailored Crown mandarin scrub set, Helium consultation lab coat, and complimentary chest embroidery.",
    image: 'demo-crown-burgundy.jpg',
    colors: [
      { name: 'Burgundy & White Coat', hex: '#581c87', image: 'demo-crown-burgundy.jpg' },
      { name: 'Deep Navy & White Coat', hex: '#102A43' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-printed-cardiac', 'demo-acc-socks-teal']
  },
  {
    id: 'demo-bnd-icu-comfort-kit',
    sku: 'ENM-BND-ICU-KIT',
    title: "DEMO — ICU Comfort Kit: Velora Set + Med Sleeves + Socks",
    category: 'bundles',
    gender: 'women',
    series: 'Velora',
    basePrice: 6300,
    comparePrice: 6800,
    badge: 'SAVE RS. 500',
    fabric: 'Velora Scrub Set + Med Compression Sleeves + Compression Socks',
    description: "Everything a critical care clinician needs for fatigue-free 12-hour duty. Silky Velora scrub set bundled with anti-fatigue graduated compression arm sleeves and socks.",
    image: 'demo-velora-teal.jpg',
    colors: [
      { name: 'Clinical Teal Kit', hex: '#00B8A9', image: 'demo-velora-teal.jpg' },
      { name: 'Deep Navy Kit', hex: '#102A43' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    supportsCustomization: true,
    companionIds: ['demo-cap-bunfit-teal', 'demo-srv-name-embroidery']
  }
];
