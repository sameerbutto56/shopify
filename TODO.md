# Enamels Implementation Task Tracker (GSD / Ralph Loop)

## Phase 1: Audit & Planning
- [x] Audit Enamels live website (`enamelsonline.com`) collections, series, products, pricing, and customization methods
- [x] Inspect existing Shopify theme structure (Horizon OS 2.0 component framework)
- [x] Create and maintain full Git backup on GitHub (`sameerbutto56/shopify`)
- [x] Define catalogue hierarchy: Scrubs (Men/Women/Unisex) -> Series (Sprinter, Velora, Crown, FlexFit) -> Caps (BunFit, Kennedy) -> Lab Coats -> Accessories

## Milestone 1: Catalogue & Design
- [x] Navigation hierarchy and mega-menu support for Scrubs (Men, Women, Unisex), Surgical Caps, Lab Coats, Accessories
- [x] Premium editorial homepage with 3D depth, Technical Fabric Performance Badges, Shop by Series, and Shop by Colour
- [x] Collection pages with horizontal filters, sorting, responsive product grid, and trust perks (`templates/collection.json`)
- [x] Colour swatches: automatic clinical shade dot indicator on all product cards in collection and search grids
- [x] Responsive product cards with CSS3 hardware-accelerated 3D hover elevation (`assets/enamels-3d-tilt.css`)

## Milestone 2: Product Configurator
- [x] Multi-step Customization Wizard (`snippets/enamels-customization-wizard.liquid` & `sections/enamels-customizer-section.liquid`)
- [x] Interactive size selection with pop-up Size Guide modal (measurements in inches and centimeters)
- [x] Medical shade swatches (Burgundy, Navy, Olive Shine, Ceil Blue, Hunter Green, Obsidian Black, Heather Grey)
- [x] Sleeve length selector: Half Sleeve (Clinical Standard) vs Full Sleeve (Modest Cut +Rs. 250)
- [x] Personalization tiers: Plain, Direct Name Embroidery (+Rs. 450), Name Patch (+Rs. 350), Hospital Logo (+Rs. 650)
- [x] Live Visual Chest Pocket Embroidery Simulator with live text rendering, thread colors, and font styles
- [x] Line-item property binding (`properties['Embroidery Line 1']`, `properties['Color']`, etc.) to guarantee order accuracy
- [x] Companion add-on products support for checkout billing integrity

## Milestone 3: Cross-Selling & Checkout
- [x] Connect in-wizard matching surgical cap (+Rs. 800) and medical sleeves (+Rs. 750) add-ons
- [x] Frequently Bought Together curated bundle section on product pages with 1-click cart addition
- [x] Slide-out Cart Drawer with PKR 7,000 Free Shipping threshold progress bar (`snippets/cart-free-shipping-bar.liquid`)
- [x] In-cart cross-sell carousel (`snippets/cart-drawer-upsell.liquid`)
- [x] Cash on Delivery (COD) assurance badges below checkout button
- [x] Smooth drawer slide-open trigger upon adding customized uniform

## Verification & Deployment
- [x] `shopify theme check` passed with 0 errors across 371 files
- [x] Pushed to unpublished preview theme `Horizon - Editorial Edition` (`#192354877728`)
- [x] Git repository synced with `origin/main` on GitHub
