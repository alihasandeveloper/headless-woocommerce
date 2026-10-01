# AGENTS.md

## Project Overview

Build a production-ready headless WooCommerce ecommerce frontend using:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* WooCommerce REST API
* React
* Server Components where appropriate
* Client Components only where interactivity is required

The frontend will communicate with a WordPress + WooCommerce backend through APIs.

The project must be responsive, accessible, SEO-friendly, fast, and easy to maintain.

---

# 1. Design System

## Color Theme

Primary color:

```text
Red
```

Supporting colors:

```text
White
Black / Dark Gray
Light Gray
```

Use red as the main accent color for:

* Primary buttons
* Active navigation
* Prices where appropriate
* Important links
* Badges
* Sale labels
* Focus states
* Cart indicators
* Call-to-action elements

Do not overuse red.

The overall design should feel:

* Clean
* Modern
* Premium
* Minimal
* Ecommerce-focused
* Professional

White should be the dominant background color.

Use subtle gray borders and backgrounds for sections, cards, inputs, and separators.

---

# 2. Typography

Use a modern sans-serif font.

Typography hierarchy:

```text
H1
H2
H3
H4
Body
Small
Caption
```

Product titles should be easy to scan.

Prices should have strong visual hierarchy.

Buttons should use medium/semi-bold font weight.

---

# 3. Global Layout

Main layout:

```text
Header
↓
Main Content
↓
Footer
```

Use a reusable:

```text
Container
Section
Grid
Button
Card
Badge
Input
Modal
Drawer
```

system.

Maximum content width should generally be around:

```text
1200px - 1400px
```

depending on the section.

---

# 4. Header

Create a responsive ecommerce header.

## Desktop Header

Top/header area:

```text
Logo
Search Bar
Wishlist
Cart
My Account
```

Example:

```text
---------------------------------------------------------
Logo     Search Products...       Wishlist Cart Account
---------------------------------------------------------
Categories        Home Shop About Contact
---------------------------------------------------------
```

## Header Requirements

Include:

* Logo
* Search bar
* Search icon
* Wishlist icon
* Wishlist item count
* Cart icon
* Cart item count
* My Account icon
* My Account text
* Mobile menu button

## Categories Navigation

Create a category navigation below the main header.

Support:

* Product categories
* Nested categories
* Dropdown/mega menu if necessary
* Mobile category navigation

Active category should use the primary red accent.

---

# 5. Mobile Header

Mobile header should include:

```text
Menu
Logo
Search
Cart
```

Use a mobile drawer for navigation.

Search should remain easily accessible.

Wishlist and account should be accessible from the mobile menu or dedicated icons.

---

# 6. Homepage

Create a complete ecommerce homepage.

Sections:

```text
Hero Slider
Featured Categories
Featured Products
Best Selling Products
Sale Products
Promotional Banner
New Arrivals
Why Choose Us
Customer Reviews
Newsletter
Footer
```

---

# 7. Hero Slider

Create 3 slides.

Each slide should support:

* Background image
* Heading
* Description
* Primary CTA
* Optional secondary CTA

Example:

```text
Slide 1
Large heading
Description
Shop Now

Slide 2
Large heading
Description
Explore Products

Slide 3
Large heading
Description
View Collection
```

Slider requirements:

* Responsive
* Touch friendly
* Autoplay
* Navigation arrows
* Pagination dots
* Pause/interaction support
* Optimized images

Do not make the slider overly tall on mobile.

---

# 8. Product Cards

Create a reusable `ProductCard`.

Product card should support:

* Product image
* Product title
* Regular price
* Sale price
* Sale badge
* Rating
* Wishlist button
* Quick view
* Add to cart
* Product category
* Stock status where necessary

Card example:

```text
Image
Wishlist
Sale Badge

Product Title

★★★★★

৳1200
৳1500

[ Add to Cart ]
```

Product cards must be reusable across:

* Homepage
* Shop
* Category
* Search
* Related products
* Recommended products
* Best sellers
* Sale products

---

# 9. Shop Page

Route:

```text
/shop
```

Shop page should behave similarly to a modern WooCommerce shop page.

Layout:

```text
------------------------------------------------
Shop
------------------------------------------------

Filters       Products
              Product Grid
```

## Filters

Support:

* Product categories
* Price range
* Attributes
* Product tags
* Brands if available
* Rating
* Stock status
* Sale products

## Sorting

Support:

```text
Default Sorting
Popularity
Latest
Price Low to High
Price High to Low
Rating
```

## Product Grid

Desktop:

```text
4 columns
```

Tablet:

```text
2-3 columns
```

Mobile:

```text
2 columns
```

Use responsive layouts.

---

# 10. Shop Filters

Desktop:

Show filters in sidebar.

Mobile:

Use filter drawer.

Example:

```text
[ Filter ]

Categories
Price
Attributes
Rating
Availability

[Apply Filters]
[Clear Filters]
```

Filters should update products without unnecessary full page reloads.

Use URL search parameters where appropriate:

```text
/shop?category=shoes&min_price=500&max_price=2000
```

---

# 11. Product Category Page

Example:

```text
/product-category/shoes
```

Category page should include:

* Breadcrumb
* Category title
* Category description
* Category image
* Product count
* Filters
* Sorting
* Product grid
* Pagination/load more

Category pages should be SEO-friendly.

---

# 12. Search Page

Route:

```text
/search
```

Support:

```text
/search?q=product
```

Display:

```text
Search Results for "product"
```

Include:

* Search input
* Product results
* Filters
* Sorting
* Pagination
* Empty state

If no products are found:

```text
No products found.
Try another search.
```

---

# 13. Single Product Page

Route:

```text
/product/[slug]
```

Product page should include:

```text
Breadcrumb

Product Gallery       Product Information

                       Product Title
                       Rating
                       Price
                       Sale Price
                       Short Description

                       Variations
                       Quantity
                       Add to Cart
                       Buy Now
                       Wishlist

                       Stock Status
                       SKU
                       Categories
                       Tags
```

---

# 14. Product Gallery

Support:

* Main image
* Thumbnail gallery
* Image zoom
* Multiple product images
* Responsive gallery
* Fullscreen image viewer if appropriate

Use optimized Next.js images.

---

# 15. Product Variations

For variable products support:

* Size
* Color
* Other WooCommerce attributes

Variation selection should dynamically update:

* Price
* Stock
* SKU
* Image
* Availability

Disable unavailable variations.

---

# 16. Add to Cart

Primary product CTA:

```text
Add to Cart
```

Requirements:

* Quantity selector
* Loading state
* Success feedback
* Error feedback
* Stock validation
* Variation validation

After adding to cart, show a cart drawer/toast where appropriate.

---

# 17. Buy Now

Single product page must include:

```text
[ Add to Cart ] [ Buy Now ]
```

Buy Now should:

```text
Select Product
↓
Add Product to Cart
↓
Go directly to Checkout
```

Do not duplicate cart logic.

---

# 18. Wishlist

Create wishlist functionality.

Wishlist should support:

* Add product
* Remove product
* Wishlist page
* Product availability
* Add to cart
* Empty wishlist state

Route:

```text
/wishlist
```

If authentication is not available initially, use local storage for guest wishlist and sync after login.

---

# 19. Cart Page

Route:

```text
/cart
```

Cart layout:

```text
Cart Items

Product
Image
Price
Quantity
Subtotal
Remove

----------------------

Cart Summary

Subtotal
Discount
Shipping
Tax
Total

[Proceed to Checkout]
```

Support:

* Update quantity
* Remove item
* Coupon
* Shipping calculation
* Tax
* Cart totals
* Empty cart state

---

# 20. Cart Drawer

Implement an optional mini cart drawer.

Open after:

```text
Add to Cart
```

Show:

* Product image
* Product name
* Quantity
* Price
* Remove
* Subtotal
* View Cart
* Checkout

---

# 21. Checkout Page

Route:

```text
/checkout
```

Checkout should include:

```text
Customer Information

First Name
Last Name
Email
Phone

Billing Address

Country
State/District
City
Address
Postcode

Shipping Address

Shipping Method

Payment Method

Order Notes

Order Summary

[Place Order]
```

Use WooCommerce as the source of truth for:

* Products
* Prices
* Stock
* Taxes
* Shipping
* Coupons
* Order totals

Do not calculate sensitive final pricing only on the frontend.

---

# 22. Payment

Payment must be integrated through the WooCommerce-compatible payment gateway.

The frontend should never expose secret payment credentials.

Payment flow:

```text
Checkout
↓
Create/prepare WooCommerce order
↓
Payment Gateway
↓
Payment
↓
Webhook / Payment Confirmation
↓
WooCommerce Order Status
↓
Order Success
```

Support payment states:

```text
Pending
Processing
Completed
Failed
Cancelled
```

---

# 23. Order Success Page

Route:

```text
/order-success
```

Display:

```text
Order Confirmed

Order Number
Order Date
Payment Status
Order Total

Customer Information
Shipping Information

Ordered Products

[Continue Shopping]
```

---

# 24. Login Page

Route:

```text
/login
```

Fields:

```text
Email
Password
```

Include:

```text
Remember Me
Forgot Password
Login
Create Account
```

Show proper validation and error messages.

---

# 25. Register Page

Route:

```text
/register
```

Fields:

```text
First Name
Last Name
Email
Password
Confirm Password
```

Support WooCommerce customer registration.

---

# 26. Forgot Password

Route:

```text
/forgot-password
```

User enters email.

Show success/error state.

---

# 27. My Account

Route:

```text
/my-account
```

Dashboard:

```text
Account Dashboard
Orders
Downloads
Addresses
Account Details
Wishlist
Logout
```

---

# 28. My Orders

Route:

```text
/my-account/orders
```

Display:

```text
Order Number
Date
Status
Total
Actions
```

Actions:

```text
View Order
Reorder
```

---

# 29. Order Details

Route:

```text
/my-account/orders/[id]
```

Display:

* Order status
* Products
* Quantities
* Prices
* Shipping
* Billing
* Payment method
* Order total

---

# 30. Account Details

Route:

```text
/my-account/account-details
```

Allow user to update:

* First name
* Last name
* Email
* Password

---

# 31. Addresses

Route:

```text
/my-account/addresses
```

Support:

* Billing address
* Shipping address
* Edit address
* Save address

---

# 32. Static Pages

Create:

```text
/about
/contact
/terms-and-conditions
/privacy-policy
/refund-policy
/shipping-policy
/faq
```

Content should be easy to modify later.

---

# 33. Contact Page

Route:

```text
/contact
```

Include:

* Contact form
* Phone
* Email
* Address
* Business hours
* Social links
* Map/embed if required

---

# 34. Footer

Footer structure:

```text
-------------------------------------------------------
Logo

Short description

Useful Links
- Home
- Shop
- About
- Contact
- FAQ
- My Account

Customer Service
- Shipping Policy
- Refund Policy
- Privacy Policy
- Terms & Conditions

Categories
- Category 1
- Category 2
- Category 3

Contact
- Phone
- Email
- Address

Social
Facebook
Instagram
YouTube
TikTok
-------------------------------------------------------

Copyright
Payment Methods
-------------------------------------------------------
```

Footer must be responsive.

---

# 35. Breadcrumbs

Implement reusable breadcrumbs.

Example:

```text
Home / Shop / Category / Product
```

Use breadcrumbs on:

* Shop
* Category
* Product
* Blog if implemented
* Account pages where appropriate

---

# 36. 404 Page

Create a custom 404 page.

Include:

```text
404

Page Not Found

[Back to Home]
[Continue Shopping]
```

---

# 37. Loading States

Every async page/action should have proper loading states.

Create reusable:

```text
Skeleton
Spinner
Loading Button
Product Skeleton
Page Skeleton
```

Avoid blank screens.

---

# 38. Error States

Create reusable error UI.

Examples:

```text
Failed to load products.

Unable to add product to cart.

Something went wrong.

Please try again.
```

Provide retry actions where appropriate.

---

# 39. Empty States

Create reusable empty states.

Examples:

```text
Empty Cart
Empty Wishlist
No Search Results
No Orders
No Products
```

---

# 40. API Architecture

Keep WooCommerce API logic separate from UI.

Recommended:

```text
src/
├── app/
├── components/
├── lib/
│   ├── woocommerce/
│   │   ├── client.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── cart.ts
│   │   ├── orders.ts
│   │   └── customers.ts
│   └── utils/
├── hooks/
├── types/
├── store/
└── config/
```

Do not put API calls directly inside reusable UI components.

---

# 41. Environment Variables

Use:

```env
WC_STORE_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxx
```

Never expose:

```env
WC_CONSUMER_SECRET
```

to the browser.

Never use:

```env
NEXT_PUBLIC_WC_CONSUMER_SECRET
```

---

# 42. State Management

Keep state management simple.

Use React state/context where sufficient.

Use a lightweight state management solution only when required for:

* Cart
* Wishlist
* UI state

Do not introduce unnecessary state management libraries.

---

# 43. SEO

Every public page must have proper metadata.

Implement:

* Title
* Description
* Canonical URL
* Open Graph
* Twitter metadata
* Sitemap
* Robots
* Product structured data
* Breadcrumb structured data where appropriate

Product pages should generate dynamic metadata from WooCommerce product data.

---

# 44. Performance

Prioritize:

* Server Components
* Next.js Image
* Lazy loading
* API caching
* ISR where appropriate
* Minimal client-side JavaScript
* Proper code splitting
* Optimized fonts
* Optimized product images

Do not make the entire application a Client Component.

---

# 45. Responsive Design

Must support:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Recommended breakpoints:

```text
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px+
Large Desktop: 1280px+
```

The design must be mobile-first.

---

# 46. Accessibility

Follow accessibility best practices.

Requirements:

* Semantic HTML
* Keyboard navigation
* Proper labels
* Alt text
* Focus states
* ARIA only when necessary
* Accessible dialogs
* Accessible dropdowns
* Accessible mobile menu
* Sufficient color contrast

---

# 47. Security

Never expose:

```text
WooCommerce Consumer Secret
WordPress admin credentials
Payment gateway secret keys
Private API credentials
```

All sensitive API calls must happen server-side.

Validate and sanitize user input.

Never trust prices or totals coming from the browser.

WooCommerce should remain the source of truth for ecommerce calculations.

---

# 48. Suggested Folder Structure

Use this structure:

```text
src/
│
├── app/
│   ├── page.tsx
│   │
│   ├── shop/
│   │   └── page.tsx
│   │
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── product-category/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── search/
│   │   └── page.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── checkout/
│   │   └── page.tsx
│   │
│   ├── wishlist/
│   │   └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── forgot-password/
│   │   └── page.tsx
│   │
│   ├── my-account/
│   │   ├── page.tsx
│   │   ├── orders/
│   │   ├── addresses/
│   │   └── account-details/
│   │
│   ├── order-success/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── terms-and-conditions/
│   │   └── page.tsx
│   │
│   ├── privacy-policy/
│   │   └── page.tsx
│   │
│   ├── refund-policy/
│   │   └── page.tsx
│   │
│   ├── shipping-policy/
│   │   └── page.tsx
│   │
│   ├── faq/
│   │   └── page.tsx
│   │
│   ├── not-found.tsx
│   ├── loading.tsx
│   └── layout.tsx
│
├── components/
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileHeader.tsx
│   │   ├── Navigation.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── home/
│   │   ├── HeroSlider.tsx
│   │   ├── FeaturedCategories.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BestSellingProducts.tsx
│   │   ├── SaleProducts.tsx
│   │   ├── PromotionalBanner.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductPrice.tsx
│   │   ├── ProductRating.tsx
│   │   ├── ProductVariations.tsx
│   │   ├── QuantitySelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── BuyNowButton.tsx
│   │   ├── WishlistButton.tsx
│   │   └── RelatedProducts.tsx
│   │
│   ├── shop/
│   │   ├── ShopFilters.tsx
│   │   ├── FilterDrawer.tsx
│   │   ├── SortDropdown.tsx
│   │   └── Pagination.tsx
│   │
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── MiniCart.tsx
│   │
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── BillingForm.tsx
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentMethods.tsx
│   │   └── OrderSummary.tsx
│   │
│   ├── account/
│   │   ├── AccountSidebar.tsx
│   │   ├── OrderList.tsx
│   │   ├── OrderDetails.tsx
│   │   └── AddressForm.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Drawer.tsx
│       ├── Badge.tsx
│       ├── Skeleton.tsx
│       ├── Spinner.tsx
│       └── EmptyState.tsx
│
├── lib/
│   ├── woocommerce/
│   │   ├── client.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── orders.ts
│   │   ├── customers.ts
│   │   └── cart.ts
│   │
│   ├── utils/
│   └── constants.ts
│
├── hooks/
│   ├── useCart.ts
│   ├── useWishlist.ts
│   └── useDebounce.ts
│
├── store/
│   ├── cart-store.ts
│   └── wishlist-store.ts
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── cart.ts
│   ├── order.ts
│   └── customer.ts
│
└── config/
    └── site.ts
```

---

# 49. Development Priority

Implement in this order:

## Phase 1

```text
Project setup
Design system
Header
Navigation
Footer
Responsive layout
```

## Phase 2

```text
WooCommerce API
Products
Categories
Product details
```

## Phase 3

```text
Homepage
Shop
Filters
Sorting
Category pages
Search
```

## Phase 4

```text
Single product
Variations
Add to cart
Buy now
Wishlist
```

## Phase 5

```text
Cart
Checkout
Shipping
Payment
Order creation
```

## Phase 6

```text
Login
Register
Forgot password
My Account
Orders
Addresses
```

## Phase 7

```text
SEO
Performance
Accessibility
Error handling
Loading states
404
```

## Phase 8

```text
Testing
Mobile testing
Checkout testing
Payment testing
Production optimization
```

---

# 50. Important Development Rules

1. Do not hardcode WooCommerce product data.
2. Product data must come from WooCommerce API.
3. Do not expose WooCommerce Consumer Secret to the browser.
4. Keep API logic separate from UI components.
5. Reuse components instead of duplicating UI.
6. Use TypeScript types for API responses.
7. Use Server Components by default.
8. Use Client Components only when interaction/state requires them.
9. Keep the UI responsive from the beginning.
10. Keep WooCommerce as the source of truth for products, prices, inventory, shipping, taxes, and orders.
11. Do not introduce GraphQL unless there is a demonstrated requirement.
12. Do not add unnecessary libraries.
13. Keep the code modular and maintainable.
14. Do not create fake/mock ecommerce data once the WooCommerce API is connected.
15. All production-sensitive operations must be validated server-side.

---

# 51. Final Goal

The final application should feel like a complete modern ecommerce website while WordPress/WooCommerce works only as the backend.

Customer experience:

```text
Home
 ↓
Shop
 ↓
Category
 ↓
Product
 ↓
Add to Cart / Buy Now
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Success
 ↓
My Account
 ↓
Orders
```

The frontend should be completely independent from the WordPress theme.

WordPress should primarily provide:

```text
Products
Categories
Inventory
Customers
Orders
Shipping
Payment
Content
```

Next.js should provide:

```text
UI
UX
Routing
SEO
Rendering
Responsive Design
Interactions
```
