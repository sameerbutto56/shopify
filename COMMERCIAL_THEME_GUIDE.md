# Commercial Theme Setup & Merchant Onboarding Guide

## Theme Title: Clinica Pro — Medical Apparel & Custom Tailoring Shopify OS 2.0 Theme

### Version: 1.0.0 (Commercial Edition)
### Architecture: Shopify Online Store 2.0 (JSON Templates, Dynamic Sections, Block Composition)

---

## 1. Introduction

**Clinica Pro** is a high-performance, modular Shopify theme specifically engineered for medical fashion brands, uniform manufacturers, scrub retailers, and clinical apparel suppliers.

It provides out-of-the-box support for:
- Standard e-commerce catalog purchasing.
- Step-by-step bespoke uniform customization (made-to-measure sizing).
- Photorealistic live chest pocket name and hospital crest embroidery preview.
- Dynamic fabric technical performance showcase.
- Surcharge billing for tailoring and embroidery without requiring expensive third-party apps.
- Advance payment deposit notices for custom orders.
- Direct WhatsApp concierge and telephone support integration.

---

## 2. Store-Specific vs. Commercial Configuration Separation

This theme is designed to be 100% portable. It separates merchant-specific identity from core theme mechanics:

### A. Merchant-Configured Data (Stored in Theme Settings / Shopify Admin)
1. **Brand Identity**: Logo, favicon, color palette, and typography are configured via **Theme Settings → Logo and Favicon / Colors / Typography**.
2. **Slideshow Banners**: Upload custom desktop and mobile banner images through **Hero Slideshow** blocks in the Theme Editor.
3. **Navigation Taxonomy**: Managed through standard Shopify Menus (**Online Store → Navigation**).
4. **Embroidery Fees & Surcharges**: Configured in **Theme Settings → Customization & Embroidery Engine**:
   - Direct Chest Name Embroidery Fee (e.g. $5.00 / Rs. 450)
   - Stitched Fabric Name Patch Fee (e.g. $4.00 / Rs. 350)
   - Hospital Logo / Crest Embroidery Fee (e.g. $7.00 / Rs. 650)
   - Custom Made-to-Measure Tailoring Surcharge (e.g. $6.00 / Rs. 500)
5. **Advance Payment Terms**: Configured in **Theme Settings → Advance Payment & Custom Order Policy**:
   - Mandatory deposit toggle.
   - Advance percentage (e.g. 50%).
   - Direct Bank Transfer instructions and account numbers.
6. **Customer Service Hotline & WhatsApp**: Configured in **Theme Settings → WhatsApp Customer Support** & **Customer Care**.

### B. Core Portable Engine (Codebase Assets)
- Zero hardcoded variant IDs or secret API tokens.
- Automatic fallback: If a store has not yet created products, the theme operates in clean clinical **Demo Mode** with mock products clearly labeled as sample content. Once real collections are published, the theme dynamically switches to live catalog rendering.

---

## 3. Quick Start Installation Guide

### Step 1: Upload Theme Package
1. Log into your **Shopify Admin**.
2. Navigate to **Online Store → Themes**.
3. Under the **Theme library** section, click **Add theme → Upload zip file**.
4. Upload `clinica-pro-theme.zip`.
5. Once uploaded, click **Actions → Preview** to view the unpublished theme.

### Step 2: Configure Global Brand Settings
1. Click **Customize** to open the Shopify Theme Editor.
2. Click the gear icon (**Theme settings**) on the left sidebar:
   - **Logo and favicon**: Upload your brand logo and set the desktop/mobile display width.
   - **Colors**: Customize the primary accent, background, and text colors. (Recommended clinical default: Pure White `#FFFFFF`, Clinical Navy `#102A43`, Medical Teal `#00B8A9`).
   - **Free Shipping Threshold**: Set your qualifying free shipping cart amount.
   - **Customization & Embroidery Engine**: Enter your shop's fees for name embroidery, patches, logos, and bespoke tailoring.
   - **Advance Payment Policy**: Set your bank transfer account details and deposit percentage.
   - **WhatsApp Customer Support**: Enter your support WhatsApp number with country code (e.g. `1234567890`).

### Step 3: Configure Navigation
1. Go to **Shopify Admin → Online Store → Navigation**.
2. Create or edit your **Main menu**. Recommended medical taxonomy:
   - **Scrubs** (with dropdown submenus for Series or Fits)
   - **Lab Coats**
   - **Surgical Caps**
   - **Sleeves & Underscrubs**
   - **Accessories & Footwear**
   - **Ready to Wear / Custom Uniforms**
3. In the Theme Editor, open the **Header** section and assign this menu.

### Step 4: Configure Homepage Sections
Merchants can drag-and-drop, add, remove, and configure sections on the homepage:
- **Hero Slideshow**: Add slide blocks, upload desktop/mobile lifestyle photos, configure headline copy and CTA links.
- **Trust Badges & Perks**: Highlight free shipping, cash on delivery, 7-day exchange, and custom embroidery guarantees.
- **Category Navigation Grid**: Connect tiles to your Shopify collections (Scrubs, Lab Coats, Caps, Accessories).
- **Featured Scrubs & Series**: Select your featured scrub collection, toggle series tabs and gender pills (Men / Women / All).
- **Fabric Technology**: Showcase your technical fabric benefits (4-way stretch, antimicrobial shield, fluid barrier, wrinkle release).
- **Shop by Clinical Shade**: Enable customers to filter scrubs by hospital ward colors (Navy, Royal, Ceil, Olive, Burgundy, Black).
- **Ready to Wear Configurator**: Place the 7-step tailoring configurator directly on the homepage or on a dedicated page.
- **FAQ Accordion**: Address sizing, embroidery, exchange policies, and payment methods.

---

## 4. Custom Ordering & Line-Item Properties Protocol

No external app subscription is required to process customized medical apparel orders. When customers customize a garment, the selections are automatically serialized into Shopify Cart Line-Item Properties:

```
Product: "Classic Athletic Scrub Set"
Properties:
  - Color: "Deep Navy"
  - Size: "Custom Tailored (Bespoke)"
  - Chest: "38 in"
  - Waist: "32 in"
  - Hips: "40 in"
  - Inseam: "30 in"
  - Personalization Type: "Direct Chest Name Embroidery"
  - Embroidery Line 1: "Dr. Alexander Wright"
  - Embroidery Line 2: "Cardiovascular Surgery"
  - Thread Color: "Silk White"
  - Hospital Logo: "St. Jude Children's Research"
  - Logo Placement: "Right Chest"
  - Advance Payment Required: "Yes (50% Deposit)"
```

These properties appear in the **Shopify Admin → Orders** detail page for your production and fulfillment team.

---

## 5. Technical Specifications & Browser Support

- **Platforms**: Shopify Online Store 2.0 (all current plans).
- **Browsers**: Google Chrome (desktop & mobile), Apple Safari (macOS & iOS), Mozilla Firefox, Microsoft Edge.
- **Performance**: Zero bulky external frameworks (No React, Vue, jQuery, or Bootstrap). Built purely with semantic Liquid, Vanilla CSS, and lightweight modern ES6 JavaScript.
- **Accessibility**: Semantic HTML5 elements, ARIA labels, keyboard navigability, high contrast clinical ratios, and reduced-motion compliance.
