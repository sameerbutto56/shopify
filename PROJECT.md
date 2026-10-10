# Enamels Medical Apparel — Master Project Specification

## 1. Brand Identity & Objectives
- **Brand**: Enamels (`enamelsonline.com`)
- **Industry**: Premium Healthcare Fashion & Technical Medical Apparel
- **Tagline / Value Proposition**: Pakistan's Leading Premium Medical Scrubs, Surgical Caps & Lab Coats. 4-Way Stretch, Wrinkle-Free, Breathable Technical Fabrics.
- **Primary References**:
  - Enamels: https://enamelsonline.com/ (Catalogue, Series, Fabrics, Pricing)
  - Medfit: https://wearmedfit.com/ (Category navigation, clean medical UI)
  - DR. SCRUBS: https://drscrubspk.com/
  - Scrubs.pk: https://scrubs.pk/

## 2. Core Category Hierarchy & Series
- **Scrubs**:
  - **Men**: Sprinter Series, Velora Series, Crown Series, FlexFit Stretch, Cargo Joggers
  - **Women**: Sprinter Series, Velora Series (Summit & Wide Leg), Crown Series, FlexFit Stretch
  - **Unisex**: Basic Scrub Sets, Underscrub Breathable Tees
- **Surgical Caps**:
  - BunFit™ Extra Volume Caps (for hair/buns)
  - Kennedy Series Designer Caps
  - Sprinter-Fabric Matching Caps
  - Themed Printed Caps (Anaesthesia, Cardiac Surgery, Squid Games, Royal Flora)
- **Lab Coats**:
  - Helium Series Female Fitted Lab Coat (Rs. 2,950)
  - Men's Professional Consultation Lab Coat
- **Medical Accessories**:
  - Medical Arm Sleeves (Med Sleeves: Black, Navy - Rs. 750)
  - Medical Compression Socks (Rs. 550)
  - Healthcare Clogs

## 3. High-Value Custom Features
1. **Interactive 3D Card Hover & Depth Experience**:
   - Lightweight CSS 3D perspective transforms (`perspective: 1000px`, dynamic tilt on hover, glassmorphism badges).
   - Medical fabric performance badges: *4-Way Stretch*, *Wrinkle-Resistant*, *Moisture-Wicking*, *Anti-Microbial*.
2. **Step-by-Step Product Customization Wizard (PDP & Drawer)**:
   - Garment selection -> Color selection -> Size selection (with Size Chart Modal) -> Sleeve length -> Personalization:
     - No Personalization
     - Direct Name Embroidery (+Rs. 450)
     - Name Patch (+Rs. 350)
     - Hospital / Custom Logo (+Rs. 650)
   - Real-time chest pocket embroidery preview simulation with live text input and thread color.
   - Shopify line-item property integration for 100% order integrity.
3. **Smart Cross-Selling & Add-Ons**:
   - Matching Surgical Cap recommendation
   - Med Sleeves & Compression Socks add-on
   - Frequently Bought Together bundle with 1-click cart addition
4. **Slide-Out Cart Drawer**:
   - Free Shipping Goal: Rs. 7,000 threshold (matching Enamels policy)
   - In-cart cross-sells
   - Cash on Delivery trust badges
5. **Shop by Series & Shop by Colour Discovery Matrix**:
   - Rich color swatches (Burgundy, Navy, Olive Shine, Royal Blue, Teal, Hunter Green, Black, Heather Grey).

## 4. Implementation Status & Milestones

### Milestone 1 — Catalogue Discovery & 3D Visual Architecture (Completed)
- **Clinical Palette**: Deep Navy (`#102A43`), Clinical Teal (`#00B8A9`), Electric Cyan (`#39D5F6`), Mint (`#B8F3E5`), Lavender (`#A855F7`), Coral (`#FF6B6B`).
- **3D Interactive Card Physics**: Implemented in [`assets/enamels-3d-tilt.css`](file:///Users/apple/Desktop/shopify/assets/enamels-3d-tilt.css) using `perspective: 1200px`, dynamic 3D tilt, subtle cyan/teal glow, animated flowing mesh gradient, and glassmorphic badges with reduced-motion accessibility.
- **Series Discovery**: Built [`sections/shop-by-series.liquid`](file:///Users/apple/Desktop/shopify/sections/shop-by-series.liquid) showcasing Sprinter, Velora, Crown, and BunFit™ Series.
- **Colour Discovery Matrix**: Built [`sections/shop-by-colour.liquid`](file:///Users/apple/Desktop/shopify/sections/shop-by-colour.liquid) showcasing 12 hospital shades with real-time swatch counters.
- **Trust Architecture**: Built [`sections/trust-badges.liquid`](file:///Users/apple/Desktop/shopify/sections/trust-badges.liquid) with Nationwide Delivery, Cash on Delivery, and 7-day exchange badges.

### Milestone 2 — Interactive Customization Wizard & Live Simulator (Completed)
- **Multi-Step Customizer**: Built [`snippets/enamels-customization-wizard.liquid`](file:///Users/apple/Desktop/shopify/snippets/enamels-customization-wizard.liquid) and [`sections/enamels-customizer-section.liquid`](file:///Users/apple/Desktop/shopify/sections/enamels-customizer-section.liquid).
- **Embroidery Personalization**: Real-time chest pocket simulation with custom text, font selection, and medical thread colors (White, Medical Gold, Cyan Blue, Black).
- **Line-Item Properties**: Directly passes `Personalization`, `Embroidery Name`, `Embroidery Title`, `Thread Color`, and `Sleeve Length` into Shopify line-item properties (`_properties[...]`) for complete order accuracy.
- **Companion Product Add-ons**: Matching Surgical Cap (+Rs. 1,450) and Med Sleeves (+Rs. 750) bundled with atomic multi-item `/cart/add.js`.

### Milestone 3 — Cross-Selling, Cart Drawer & Threshold Perks (Completed)
- **Frequently Bought Together**: Built [`snippets/frequently-bought-together.liquid`](file:///Users/apple/Desktop/shopify/snippets/frequently-bought-together.liquid) and [`sections/frequently-bought-together.liquid`](file:///Users/apple/Desktop/shopify/sections/frequently-bought-together.liquid) with dynamic bundle discount calculations and 1-click multi-item addition.
- **Slide-Out Cart Drawer**: Built [`snippets/cart-drawer-upsell.liquid`](file:///Users/apple/Desktop/shopify/snippets/cart-drawer-upsell.liquid) and [`snippets/cart-free-shipping-bar.liquid`](file:///Users/apple/Desktop/shopify/snippets/cart-free-shipping-bar.liquid) with live progress bar toward Rs. 7,000 free shipping.

### Milestone 4 — 5-Language Multilingual & Full RTL Engine (Completed)
- **Multilingual Support**: Built [`snippets/enamels-multilingual.liquid`](file:///Users/apple/Desktop/shopify/snippets/enamels-multilingual.liquid) supporting:
  1. English (`en`, LTR)
  2. Urdu (`ur`, RTL, اردو)
  3. Arabic (`ar`, RTL, العربية)
  4. Pashto (`ps`, RTL, پښتو)
  5. Punjabi (`pa`, RTL, پنجابی)
- **Full RTL Stylesheet**: Built [`assets/enamels-rtl.css`](file:///Users/apple/Desktop/shopify/assets/enamels-rtl.css) flipping layout grids, menus, forms, badges, and icon directions automatically when RTL languages are selected.
- **Header Integration**: Mounted in [`snippets/header-actions.liquid`](file:///Users/apple/Desktop/shopify/snippets/header-actions.liquid) with localStorage persistence.

### Milestone 5 — Isolated Safe Demo Mode & Test Fixtures (Completed)
- **Demo & Simulation Console**: Built [`snippets/enamels-demo-mode.liquid`](file:///Users/apple/Desktop/shopify/snippets/enamels-demo-mode.liquid) with floating pill trigger.
- **Deterministic Test Fixtures**: 6 reproducible test scenarios (Product Selection, Variant Validation, Customization Success, Validation Error Handling, Cross-Sell Matching, and Mock Cart Total).
- **Safety**: 100% isolated test harness — zero live inventory tampering, zero real orders, zero real charges.

### Milestone 6 — Fully Populated 35-Product Catalogue & Checkout Simulator (Completed)
- **Complete Product Master**: Built [`assets/enamels-catalogue-data.js`](file:///Users/apple/Desktop/shopify/assets/enamels-catalogue-data.js) containing 35 realistic products covering:
  - Men's Scrubs (Sprinter, Velora, Crown, Joggers, Tops)
  - Women's Scrubs (Velora, Summit, Wide-Leg, Sprinter, Crown, Flora)
  - Unisex Scrubs & Underscrubs (Base layers, Mock-neck, Classic sets)
  - Surgical Caps (BunFit™ Extra Volume, Kennedy, Printed Cardiac, Anaesthesia, Flora)
  - Lab Coats (Helium Series Women's Fitted, Consultant Men's, Short Jacket)
  - Accessories (Med Compression Sleeves, Clinical Socks, Orthopaedic Clogs)
  - Customization Services (Direct Embroidery, Velcro Patch, Hospital Logo)
  - Duo & Resident Bundles (Sprinter Duo, Executive Resident, ICU Kit)
- **High-Resolution Medical Apparel Imagery**: Studio product photography created for Sprinter Navy ([`assets/demo-sprinter-navy.jpg`](file:///Users/apple/Desktop/shopify/assets/demo-sprinter-navy.jpg)), Velora Teal ([`assets/demo-velora-teal.jpg`](file:///Users/apple/Desktop/shopify/assets/demo-velora-teal.jpg)), and Crown Burgundy ([`assets/demo-crown-burgundy.jpg`](file:///Users/apple/Desktop/shopify/assets/demo-crown-burgundy.jpg)).
- **Interactive Multi-Criteria Catalogue Grid**: Built [`sections/enamels-interactive-catalogue.liquid`](file:///Users/apple/Desktop/shopify/sections/enamels-interactive-catalogue.liquid) with tabbed category filters, gender filters, series filters, hospital color filters, price ranges, and sorting.
- **Configurator & Size Guide Modals**: Interactive PDP simulator with real-time pocket embroidery canvas, measurement tables in inches/cm, and logo upload simulation.
- **Isolated Checkout Simulator**: Complete order placement modal supporting Cash on Delivery (COD), hospital delivery addresses, and deterministic confirmation (#ENM-DEMO-XXXXX) with zero real charges.
- **Shopify Product CSV Export**: Prepared [`enamels_products_import.csv`](file:///Users/apple/Desktop/shopify/enamels_products_import.csv) formatted for 1-click administrative catalogue import.

## 5. Deployment & Verification
- **Target Theme ID**: `#192354877728` (`Horizon - Editorial Edition`, unpublished preview theme).
- **Preview Link**: [https://j7jfh1-0s.myshopify.com?preview_theme_id=192354877728](https://j7jfh1-0s.myshopify.com?preview_theme_id=192354877728)
- **Theme Editor**: [https://j7jfh1-0s.myshopify.com/admin/themes/192354877728/editor](https://j7jfh1-0s.myshopify.com/admin/themes/192354877728/editor)
- **Theme Check Result**: 0 errors across 374 inspected files.
- **Git Repository**: Synced to branch `main` on [`git@github.com:sameerbutto56/shopify.git`](https://github.com/sameerbutto56/shopify).
