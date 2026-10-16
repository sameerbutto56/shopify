# Shopify Theme Data Architecture & Metafields Specification

## Overview

This document specifies the standard Shopify Online Store 2.0 Metafield and Metaobject definitions used by the Medical Apparel & Custom Tailoring Theme. By adhering to this schema, merchants can dynamically control customization options, fabric technical specifications, hospital insignia, and garment alterations directly through the native Shopify Admin without touching theme Liquid code.

---

## 1. Product Metafields (`customizer` Namespace)

These metafields can be assigned to individual medical products to enable or disable specific bespoke tailoring options.

| Metafield Key | Type | Name in Admin | Description / Example | Default Fallback |
| :--- | :--- | :--- | :--- | :--- |
| `customizer.series_name` | `single_line_text_field` | Clinical Series | Specific series name (e.g. `Sprinter`, `Velora`, `Crown`, `FlexFit`). | Vendor or Product Title |
| `customizer.fabric_composition` | `single_line_text_field` | Technical Fabric Specs | Fabric composition breakdown (e.g. `72% Poly, 21% Rayon, 7% Spandex (4-Way Stretch)`). | Standard Clinical Poly-Cotton |
| `customizer.custom_colors_enabled` | `boolean` | Allow Make Your Own Color | If `true`, the "Make Your Own Color" button appears in PDP studio. Set `false` for Sprinter. | `true` for Crown/Velora; `false` for Sprinter |
| `customizer.custom_sizing_enabled` | `boolean` | Allow Custom Measurements | If `true`, customers can enter bespoke chest, waist, hips, and inseam measurements. | `true` |
| `customizer.alterations_enabled` | `boolean` | Allow Garment Alterations | If `true`, alteration options (shirt, trouser, sleeve length adjustment) are available. | `true` for Scrubs; `false` for Caps |
| `customizer.embroidery_enabled` | `boolean` | Enable Personalization | Allows computerized doctor name and department embroidery. | `true` |
| `customizer.embroidery_modes` | `list.single_line_text_field` | Available Personalization Tiers | Allowed choices: `direct` (direct chest embroidery), `patch` (stitched fabric patch). | `["direct", "patch"]` |
| `customizer.logos_enabled` | `boolean` | Allow Hospital Crests | Enables hospital and medical institute crest placement on the garment. | `true` |
| `customizer.advance_payment_required` | `boolean` | Require Advance Deposit | Flags if customized orders require a minimum advance deposit via bank transfer. | `true` if personalized |
| `customizer.companion_accessories` | `list.product_reference` | Curated Companion Add-ons | Links matching surgical caps or protective sleeves for 1-click bundle add-to-cart. | Curated by collection |

---

## 2. Metaobject Definition: Hospital Crests (`hospital_crest`)

Allows merchants to maintain a clean list of authorized hospital logos, universities, and medical societies that customers can select during uniform customization.

### Fields Definition:
1. **Name** (`single_line_text_field`): Display name of the hospital or institution (e.g., `Aga Khan University Hospital (AKUH)`).
2. **Identifier** (`single_line_text_field`): Unique slug (e.g., `akuh`, `skmch`, `doctors-hospital`).
3. **Crest Image** (`file_reference`): High-resolution PNG logo with transparent background.
4. **Default Placement** (`single_line_text_field`): Recommended embroidery position (e.g., `Right Chest Pocket`, `Left Sleeve`).
5. **Additional Fee** (`number_decimal`): Custom fee override if different from global `settings.logo_fee`.

---

## 3. Metaobject Definition: Clinical Fabrics (`clinical_fabric`)

Used by the **Ready to Wear / Make Your Own Scrub Configurator** to populate available fabric types dynamically.

### Fields Definition:
1. **Fabric Name** (`single_line_text_field`): Display title (e.g., `Sprinter Performance Twill`).
2. **Composition** (`single_line_text_field`): Material breakdown (e.g., `72% Poly, 21% Rayon, 7% Spandex`).
3. **Key Benefit** (`single_line_text_field`): Short badge text (e.g., `4-Way Mechanical Stretch`, `Luxury Fluid Drape`).
4. **Base Price Delta** (`number_integer`): Price addition or discount relative to base scrub set price.
5. **Compatible Colors** (`list.single_line_text_field`): Hex codes or color names approved for this fabric weave.

---

## 4. Line-Item Properties Protocol (Order Handoff)

When an order is handed off to Shopify Checkout, all bespoke configurations are recorded as standard line-item properties. This guarantees that:
- Merchant fulfillment teams receive exact sizing, embroidery lines, thread colors, and alteration specs directly on the Shopify Admin Order details page.
- No private database or recurring app subscription is required for order accuracy.

```yaml
Line Item: "Sprinter Athletic V-Neck Scrub Set"
Properties:
  Color: "Deep Navy (#102A43)"
  Size: "Custom Tailored (Bespoke)"
  Chest: "40 in"
  Waist: "34 in"
  Hips: "42 in"
  Inseam: "31 in"
  Personalization Type: "Direct Chest Name Embroidery (+Rs. 450)"
  Embroidery Line 1: "Dr. Sarah Jenkins, MD"
  Embroidery Line 2: "Pediatric Surgery"
  Embroidery Line 3: "Aga Khan University Hospital"
  Thread Color: "Silk White (#FFFFFF)"
  Font Style: "Times New Roman (Clinical Standard)"
  Hospital Logo: "Aga Khan University Hospital (+Rs. 650)"
  Logo Placement: "Right Chest Pocket"
  Alterations: "Trouser Length: Standard, Half Sleeve"
  Advance Payment Required: "Yes (Minimum 50% for customized items)"
  _bespoke_order: "true"
  _advance_deposit_amount: "3125"
```

---

## 5. Setting up Metafields in Shopify Admin

1. In Shopify Admin, navigate to **Settings → Custom Data**.
2. Select **Products → Add Definition**.
3. Create each definition listed in Section 1 using the `customizer` namespace.
4. Pin the definitions so they appear prominently on all Product editing pages.
5. In theme customization, dynamic sources can now be linked directly to product cards and customization modules!
