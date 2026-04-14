# NairoMarket Shopify Liquid Theme

This is a custom Shopify theme designed to look and feel like a high-end native application, optimized for large marketplaces with multiple vendors.

## How to Install

1.  **Download the files**: You can download these files from your repository.
2.  **Compress to ZIP**: Zip the contents of the `shopify-theme` folder (so that `layout`, `sections`, `templates`, etc. are at the root of the ZIP).
3.  **Upload to Shopify**:
    *   Go to your **Shopify Admin**.
    *   Go to **Online Store > Themes**.
    *   Click **Add theme > Upload zip file**.
    *   Upload the ZIP you just created.
4.  **Customize**: Once uploaded, you can click **Customize** to adjust settings.

## Features

-   **Native App Feel**: Uses Tailwind CSS for a modern, fast, and responsive UI.
-   **Standardized Typography**: Font sizes for product titles and prices have been standardized to match industry leaders like Kilimall.
-   **Multi-Vendor Ready**: Designed to work seamlessly with Shopify's native architecture and third-party multi-vendor apps.
-   **No API Keys Needed**: This theme uses Shopify's native Liquid engine, so you don't need to manage Storefront API tokens or GitHub secrets.

## Font Sizes Applied

-   **Product Page Title**: `text-lg md:text-xl` (Standardized)
-   **Product Page Price**: `text-2xl` (Standardized)
-   **Product Card Price**: `text-base` (Standardized)
-   **Product Card Title**: `text-sm` (Standardized)

## Customization

You can change the primary colors in `layout/theme.liquid` inside the Tailwind configuration block:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#FF4D00', // Change this to your brand color
        // ...
      }
    }
  }
}
```
