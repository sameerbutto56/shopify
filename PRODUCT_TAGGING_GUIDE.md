# Enamels Shopify Theme — Product Tagging & Setup Guide

This guide describes how to configure, classify, and tag products in Shopify Admin so that they automatically populate into the Enamels shopping experience, multi-level navigation, 3D hanging rail, Bespoke Customizer, and category filters.

---

## 1. Quick Reference: Recommended Tag Format

The theme supports structured **colon-delimited tags** (recommended) as well as **Shopify native fields** and **simple tags**.

| Dimension | Structured Colon Tag (Recommended) | Native Shopify Field Alternative | Simple Tag Alternative | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Category** | `category:scrubs`<br>`category:lab-coats`<br>`category:caps`<br>`category:sleeves`<br>`category:accessories` | **Product Type:** `Scrubs`, `Lab Coat`, `Surgical Caps`, `Sleeves`, `Accessories` | `Scrubs`, `Lab Coat`, `Caps`, `Sleeves`, `Accessories` | Direct routing into category rails and showcase pages |
| **Gender** | `gender:men`<br>`gender:women`<br>`gender:unisex` | Included in Product Title (e.g. *Men's Sprinter Scrub Set*) | `Men`, `Women`, `Unisex` | Drives Gender selection tabs in the header and navigation |
| **Brand / Series** | `brand:sprinter`<br>`brand:vilora`<br>`brand:crown`<br>`brand:ground`<br>`brand:helium`<br>`brand:bunfit`<br>`brand:flexfit`<br>`brand:suiting` | **Vendor:** `Sprinter`, `Vilora`, `Crown`, `Ground`, `Helium`, `BunFit`, `FlexFit`, `Suiting` | `Sprinter`, `Vilora`, `Crown`, `Ground`, `Helium` | Filters series cards and boutique hanging rail collections |
| **Article Code** | `article:ENM-01`<br>`code:SP-01` | **SKU:** `ENM-SPR-NVY-M` | In Product Title | Unique article grouping for colorway matching |
| **Badge / Status** | `feature:best-seller`<br>`feature:new-arrival`<br>`badge:best-seller` | — | `Best Seller`, `New Arrival`, `New` | Displays pill tag on product cards |
| **Fabric Specs** | `fabric:4-way-stretch`<br>`fabric:antimicrobial`<br>`fabric:fluid-resistant` | — | `4-way-stretch`, `poly-rayon` | Formats fabric composition badges in studio |
| **Customizer** | `feature:customizable`<br>`customizable:true` | Enabled by default for all Scrubs and Lab Coats | `customizable` | Enables name/title embroidery & chromatic customizer |

---

## 2. Step-by-Step: Adding a New Product in Shopify Admin

### Step 1: Product Title & Description
1. In Shopify Admin, navigate to **Products > Add product**.
2. **Title**: Enter a clear, clinical product title (e.g. `Men's Sprinter 4-Way Stretch Scrub Set` or `Women's Helium Tailored Lab Coat`).
3. **Description**: Describe clinical benefits, pockets, fluid resistance, and tailoring details.

### Step 2: Media (Images) & Colorway Matching
1. Upload high-resolution product photography (recommended: 1200 x 1500px, 4:5 aspect ratio portrait).
2. **Alt Text for Images**: Set image Alt Text to the matching color name (e.g., `Deep Navy`, `Ceil Blue`, `Burgundy`, `Hunter Green`). The theme automatically groups and switches images based on the active swatch selected by the shopper.

### Step 3: Variants (Colors & Sizes)
1. In the **Variants** section, add Option 1: **Color** (e.g., `Deep Navy`, `Olive Green`, `Burgundy`, `Black`).
2. Add Option 2: **Size** (e.g., `XS`, `S`, `M`, `L`, `XL`, `2XL`, `3XL`).
3. Assign the respective variant image to each color so checkout and cart thumbnails stay 100% accurate.

### Step 4: Organization & Tags
1. **Product Type**: Select or type `Scrubs`, `Lab Coat`, `Caps`, `Sleeves`, or `Accessories`.
2. **Vendor**: Set to the series brand, e.g. `Sprinter`, `Vilora`, `Crown`, or `Helium`.
3. **Tags**: Add the structured tags:
   ```text
   category:scrubs, gender:men, brand:sprinter, feature:best-seller, fabric:4-way-stretch
   ```

---

## 3. Supported Series Brands & Specialties

| Series Brand | Primary Category | Typical Fabric / Construction |
| :--- | :--- | :--- |
| **Sprinter** | Scrubs (Men & Women) | Ultra-lightweight athletic 4-way stretch with moisture-wicking micro-twill |
| **Vilora** | Scrubs (Women & Unisex) | Silky fluid drape, anti-wrinkle poly-spandex blend with contoured yoga waistband |
| **Crown** | Scrubs & Uniforms | High-density structured weave with reinforced seam bar-tacks for clinical durability |
| **Ground** | Heavy-duty Scrubs | Earth-toned utilitarian scrubs with 9 utility pockets and tool loops |
| **Helium** | Lab Coats (Men & Women) | Anti-fluid, stain-repellent breathable poly-cotton with tailored lapels |
| **BunFit** | Surgical & Theatre Caps | Ergonomic ponytail/bun compartment with sweatband forehead lining |
| **FlexFit** | Clinical Arm Sleeves | Non-slip silicone bicep grip, thermal muscle warmth under AC, UV shield |
| **Suiting** | Executive Medical Blazers | Tailored stretch wool-touch blend for hospital directorships and conferences |

---

## 4. Backwards Compatibility

If products were previously added with simple tags like `Scrubs`, `Men`, `Sprinter`, or without prefix colons, the Enamels theme **automatically falls back** to detecting:
1. Native Shopify `product_type`
2. Native Shopify `vendor`
3. Simple comma-separated tags
4. Product title keywords (e.g., `cap`, `lab coat`, `sleeves`, `clog`, `men's`, `women's`)

No products will break or disappear from the storefront.

---

## 5. Sale Qualification Rules

To designate a product for the dedicated **Sale section** and **Sale collection** (`/collections/sale`):
1. **Compare-at Price (Recommended)**: Set a `Compare-at price` higher than the `Price` on the product or variant in Shopify Admin.
   - Example: Price = `Rs. 4,650`, Compare-at price = `Rs. 5,450`.
   - The theme calculates the real discount percentage (`15% OFF`) and displays the prominent `SALE` badge.
2. **Sale Tag**: Add the structured tag `sale-active` (or `sale`).
3. **Removing from Sale**: To end a sale, simply clear the `Compare-at price` and remove the `sale-active` tag. The product will automatically disappear from the Sale collection without touching inventory or other category tags.

---

## 6. Shipping & Add-on Classification Rules

The store automatically computes shipping at checkout based on destination:
- **Pakistan Deliveries**: Domestic shipping rates apply:
  - **Free Nationwide Delivery** on eligible order totals strictly greater than PKR 7,000 (e.g. PKR 7,001+).
  - **Standard Domestic Courier (PKR 250)** for orders of PKR 7,000 or less.
  - **Cash on Delivery (COD)**: Available nationwide across all cities in Pakistan via TCS and Trax Logistics.
- **International Deliveries**:
  `International shipping charge = (Q × 4,000) + (A × 1,800)`
  - `Q` = Count of scrub sets in the order (identified by `category:scrubs` or product type `Scrubs`).
  - `A` = Count of chargeable add-on units:
    1. Line items with custom personalization properties (`Personalization`, `Embroidery Name`, `Crest / Logo`, `Alterations`).
    2. Accessory add-ons (BunFit Surgical Caps, FlexFit Sleeves, Compression Socks).
  - Plain scrub sets without customization count towards `Q` only. An add-on is never charged twice. Cash on Delivery is strictly restricted to Pakistan.

