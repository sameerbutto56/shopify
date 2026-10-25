# Enamels Shopify Theme — Portability & Export Guide

This guide describes how to export, package, and import the **Enamels Medical Scrubs & Uniforms** Shopify theme into any Shopify store while preserving 100% of its styling, interactive experiences, Theme Editor controls, and catalog features.

---

## 1. Architecture & Portability Principles

The theme is built entirely on **native Shopify Liquid, modern Vanilla CSS, and native ES6 Javascript**. It is intentionally free of build-step locks, Node/Webpack dependencies at runtime, Tailwind compiler requirements, or hardcoded third-party domain references:
- **No external CDN runtime dependencies**: All stylesheets, JavaScript modules, SVG icons, and fallback demo assets live inside the local theme directory.
- **Shopify Assets Isolation**: All asset references use the standard `{{ 'filename' | asset_url }}` filter.
- **Dynamic Live Storefront Adaptor**: Product data connects automatically to Shopify's live `/products.json` API and `window.ShopifyLiveProducts` while maintaining graceful fallback demo products if the store catalog is brand new.
- **Settings-backed Tokens**: Every layout, spacing, dimension, color, and thumbnail size is backed by standard Shopify `{% schema %}` and `config/settings_schema.json` controls.

---

## 2. Inventory of Custom Enamels Theme Files

When exporting or verifying the theme package, ensure the following core files are present:

### A. Sections (`sections/`)
- `enamels-header.liquid` — Multi-level clinical navigation bar with Gender/Category/Series routing
- `enamels-hanging-rail.liquid` — Boutique 3D hanging rail experience with interactive swatches
- `enamels-chromatic-lab.liquid` — Complete Bespoke Customizer, single-page product studio, and cart engine
- `enamels-live-catalogue.liquid` — Live curated product grid with pixel-level thumbnail dimension controls
- `enamels-signature-series.liquid` — High-impact signature series showcase with responsive cards
- `enamels-category-video.liquid` — Video showcase block with responsive dimensions
- `enamels-brand-gallery.liquid` — Responsive brand gallery with customizable card ratios and gaps
- `shop-by-series.liquid` — Dynamic series collection grid with pixel-level width, height, and gap controls
- `enamels-category-scrubs.liquid` — Dedicated Scrubs category showcase with empty-text collapse
- `enamels-category-labcoats.liquid` — Dedicated Lab Coats category showcase with empty-text collapse
- `enamels-category-caps.liquid` — Dedicated Surgical Caps showcase with empty-text collapse
- `enamels-category-sleeves.liquid` — Dedicated Clinical Sleeves showcase with empty-text collapse
- `enamels-category-accessories.liquid` — Dedicated Footwear & Accessories showcase with empty-text collapse
- `enamels-category-spotlight.liquid` — Merchant-addable category spotlight section with pixel controls
- `enamels-home-service-banner.liquid` — Home Service fitting concierge callout & booking modal
- `enamels-customizer-banner.liquid` — Customization studio promotion banner

### B. Snippets (`snippets/`)
- `enamels-homepage.liquid` — Main modular homepage composition orchestrator
- `enamels-header-nav.liquid` — Desktop & mobile clinical navigation menus
- `enamels-product-detail.liquid` — Single-page article customization studio
- `enamels-ready-to-wear.liquid` — Ready-to-wear catalog view
- `enamels-scrubs-collection.liquid` — Dedicated Scrubs collection rail
- `enamels-self-service.liquid` — Self-service customer portal

### C. Assets (`assets/`)
- `enamels-white-theme.css` — Core theme stylesheet, design tokens, responsive typography, and empty-box collapse rules
- `enamels-hanging-rail.css` — 3D perspective rail styles, velvet rack animation, and hanger physics
- `enamels-hanging-rail.js` — Rail scroll controller, active hanger detection, swatch switching
- `enamels-catalogue-data.js` — Storefront catalog baseline and series brand metadata
- Demo assets for instant out-of-the-box previewing:
  - `cat-sprinter.jpg`, `cat-velora.jpg`, `cat-crown.jpg`, `cat-helium.jpg`, `cat-bunfit.jpg`, `cat-flexfit.jpg`, `banner-clogs.jpg`
  - Demo apparel hanger graphics: `demo-hang-scrub-*.png`, `demo-hang-labcoat-white.png`

### D. Templates & Configuration (`templates/` & `config/`)
- `templates/index.json` — Modular homepage section order, block configurations, and preset settings
- `config/settings_schema.json` — Theme settings definitions including typography, palette, and card options
- `config/settings_data.json` — Active color tokens, radii, fonts, and store defaults

---

## 3. How to Export the Theme

### Option 1: Via Shopify Admin (Recommended for Store Owners)
1. Go to your Shopify Admin: **Online Store > Themes**.
2. Find the customized theme (e.g., `Horizon - Enamels Staging`).
3. Click the **...** (three dots) action button next to the theme.
4. Select **Download theme file**.
5. Shopify will email a `.zip` file containing all templates, sections, snippets, assets, locales, and configuration.

### Option 2: Via Git / CLI (For Developers)
From the project workspace root:
```bash
zip -r enamels-shopify-theme.zip \
  assets/ \
  blocks/ \
  config/ \
  layout/ \
  locales/ \
  sections/ \
  snippets/ \
  templates/ \
  PRODUCT_TAGGING_GUIDE.md \
  THEME_PORTABILITY_GUIDE.md
```

---

## 4. How to Import into Another Shopify Store

1. In the target store's Shopify Admin, navigate to **Online Store > Themes**.
2. In the **Theme library** section, click **Add theme > Upload zip file**.
3. Select your exported `enamels-shopify-theme.zip` and click **Upload file**.
4. Once the upload finishes, the theme will appear as an **unpublished theme** in the Theme Library.
5. Click **Customize** to open the Shopify Theme Editor and review the homepage sections and thumbnail dimensions.
6. When satisfied, click **Publish** to make it the live storefront theme.

---

## 5. First-Time Setup Checklist on Target Store

1. **Add Products with Standard Tags**: Follow the [PRODUCT_TAGGING_GUIDE.md](file:///Users/apple/Desktop/shopify/PRODUCT_TAGGING_GUIDE.md) to tag your live products with `category:*`, `gender:*`, `brand:*`, and `fabric:*`.
2. **Review Thumbnail Dimensions**: In Theme Editor, click on **Live Product Catalogue**, **Category — Scrubs**, or **Signature Series** to adjust image heights, card widths, and aspect ratios to match your photography.
3. **Configure Navigation Menus**: In **Online Store > Navigation**, link your main menu items or let the automated header navigation handle category filtering.
4. **Test the Cart Flow**: Add a scrub set or lab coat to your cart via the customizer to verify checkout token creation and real variant ID passing.
