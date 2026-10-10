# Enamels Implementation Task Tracker (GSD / Ralph Loop)

## Phase 1: Audit & Planning
- [x] Audit Enamels live website (`enamelsonline.com`) collections, series, products, pricing, and customization methods
- [x] Inspect existing Shopify theme structure (Horizon OS 2.0 component framework)
- [x] Create and maintain full Git backup on GitHub (`sameerbutto56/shopify`)
- [x] Define catalogue hierarchy: Scrubs (Men/Women/Unisex) -> Series (Sprinter, Velora, Crown, FlexFit) -> Caps (BunFit, Kennedy) -> Lab Coats -> Accessories

## Phase 2: Design System & 3D Interactive Motion
- [x] Implement Medical Fashion brand tokens in `config/settings_data.json` (Deep Navy, Burgundy, Olive, Crisp White, Slate)
- [x] Implement pure CSS 3D Card Hover Tilt effect (`assets/enamels-3d-tilt.css`)
- [x] Implement Technical Fabric Performance Badges (4-Way Stretch, Wrinkle-Free, Anti-Microbial, Breathable)
- [x] Configure typography with reduced-motion support

## Phase 3: Catalogue & Navigation Hierarchy
- [x] Define Enamels Hierarchical Navigation Structure
  - [x] Scrubs (Men, Women, Unisex) with series (Sprinter, Velora, Crown, FlexFit)
  - [x] Surgical Caps (BunFit™ Extra Volume, Kennedy Series, Themed Prints)
  - [x] Lab Coats (Helium Fitted, Professional Consultation)
  - [x] Medical Accessories (Arm Sleeves, Socks, Clogs)
- [x] Build "Shop by Series" interactive showcase section (`sections/shop-by-series.liquid`)
- [x] Build "Shop by Colour" interactive palette section (`sections/shop-by-colour.liquid`)

## Phase 4: Advanced Product Customization Wizard
- [x] Create Customization Wizard component (`snippets/enamels-customization-wizard.liquid` & `sections/enamels-customizer-section.liquid`)
  - [x] Step 1: Product overview & fabric performance specs
  - [x] Step 2: Interactive Color Swatch selector (Burgundy, Navy, Olive, Ceil Blue, Hunter Green, Black, Grey)
  - [x] Step 3: Size selector with Pop-up Size Guide (XS–XXL measurements in inches/cm)
  - [x] Step 4: Sleeve Length selector (Half Sleeve vs Full Sleeve where applicable)
  - [x] Step 5: Personalization choice (None, Direct Name Embroidery +Rs. 450, Name Patch +Rs. 350, Logo +Rs. 650)
  - [x] Step 6: Live Visual Chest Pocket Embroidery Simulator with live text rendering & thread color
  - [x] Step 7: Conditional text inputs (Doctor Name, Department, Thread Color) and logo file upload
  - [x] Step 8: Real-time price breakdown and configuration summary
  - [x] Step 9: Add to cart with Shopify line-item properties (`_Personalization`, `Embroidery Line 1`, etc.)
- [x] Hook Customization Wizard, Trust Badges, and FAQ Accordion into Product Template (`templates/product.json`)

## Phase 5: Cross-Selling, Bundles & Cart Drawer
- [x] Implement In-Wizard and PDP Add-Ons (Matching Surgical Cap, Med Sleeves, Compression Socks)
- [x] Implement "Frequently Bought Together" bundle with 1-click add-to-cart (`snippets/frequently-bought-together.liquid` & `sections/frequently-bought-together.liquid`)
- [x] Update Cart Drawer with Rs. 7,000 Free Shipping threshold (Enamels standard) (`snippets/cart-free-shipping-bar.liquid`)
- [x] Display customization line-item properties cleanly in cart drawer and checkout

## Phase 6: Homepage & Merchandising
- [x] Build Enamels Editorial Hero with 3D Depth & Fabric Callout (`templates/index.json`)
- [x] Build "Engineered for Healthcare Professionals" Shop by Series Section (`sections/shop-by-series.liquid`)
- [x] Build Shop by Clinical Colour Section (`sections/shop-by-colour.liquid`)
- [x] Build Medical Professional Testimonials & Verified Reviews (AKUH, Shaukat Khanum, PIMS)
- [x] Build FAQ Accordion with Enamels delivery, COD, sizing, and embroidery lead times

## Phase 7: Testing, Linting & Verification
- [x] Run `shopify theme check` to ensure 0 errors (Passed with 0 errors)
- [ ] Push to unpublished theme `Horizon - Editorial Edition` (`#192354877728`) for live preview
- [ ] Verify preview links and report to user
