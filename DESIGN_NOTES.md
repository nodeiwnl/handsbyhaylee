# HANDS BY HAYLEE - DESIGN NOTES
## Dark Gold Luxury Nail Salon Website

### TARGET AUDIENCE
**Age**: 14-mid 20s (Gen Z)
**Vibe**: Bold, confident, luxury on a budget, TikTok aesthetic

---

## COLOR SCHEME (PRIMARY: DARK GOLD, NOT PINK!)

### Primary Colors
- **Gold Primary**: `#D4AF37` - Rich, luxurious gold
- **Gold Light**: `#E8C547` - Lighter shimmer tone
- **Gold Dark**: `#C9A961` - Deeper gold accents
- **Gold Rich**: `#B8941D` - Ultra-rich gold shadows

### Accent Colors (USE SPARINGLY)
- **Hot Pink**: `#ff00af` - Only for small accents
- **Pink Bright**: `#ff33bf` - Hover states only

### Dark Backgrounds
- **Darkest**: `#0a0a0a` - Main background
- **Dark**: `#1a1a1a` - Section backgrounds
- **Medium**: `#2a2a2a` - Card backgrounds
- **Card**: `#1f1f1f` - Interactive cards

### Text Colors
- **Primary**: `#ffffff` - Main text
- **Gold**: `#D4AF37` - Headlines, CTAs
- **Muted**: `#a0a0a0` - Secondary text
- **Dim**: `#666666` - Tertiary text

---

## LEOPARD PRINT BACKGROUND

### Hero Section Layers (Parallax)
1. **Dark Base** - Gradient from darkest to dark
2. **Leopard Print** - Natural brown/tan leopard (NOT pink!)
   - Current: Unsplash placeholder
   - **REPLACE WITH**: Real leopard print stock image
   - Opacity: 0.3 for subtle effect
   - Recommended sources:
     - https://images.unsplash.com/photo-1516110833967-0b5716ca1387
     - https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg
3. **Gold Shimmer** - Animated radial gradients
   - Moves and pulses subtly
   - Creates metallic shine effect
4. **Dark Overlay** - Ensures text readability

### Parallax Effect
- Layers move at different speeds on scroll
- Creates depth and 3D effect
- Implemented via JavaScript (data-parallax-layer attributes)

---

## ANIMATIONS (ALL BUTTERY SMOOTH 60FPS)

### 1. Gold Shimmer Animation
**Where**: Primary buttons, hero headline
**Effect**: Diagonal light sweep across gold surfaces
**Duration**: 3-4 seconds infinite loop
**Performance**: GPU-accelerated transforms

### 2. Floating Elements
**Where**: CTAs, cards, gallery items
**Effect**: Gentle up-and-down motion
**Duration**: 3 seconds ease-in-out
**Offset**: Different delays for organic feel

### 3. Fade-In on Scroll
**Where**: All content sections
**Effect**: Smooth opacity + translateY
**Trigger**: JavaScript intersection observer
**Duration**: 500-1000ms

### 4. Gold Text Shimmer
**Where**: Hero title, section titles
**Effect**: Animated gradient background
**Duration**: 4 seconds infinite
**Result**: Text appears to "sparkle"

### 5. Hover Animations
- **Cards**: translateY(-8px) + scale(1.02) + gold glow
- **Buttons**: translateY(-3px) + stronger shadow
- **Links**: Color shift + underline slide-in
- **All**: Smooth 300ms cubic-bezier transitions

### 6. Scroll Bounce
**Where**: Scroll hint at bottom of hero
**Effect**: Bounces up and down
**Purpose**: Encourages scrolling

---

## MOBILE-FIRST APPROACH

### Breakpoints
- **Mobile**: 320px+ (default styles)
- **Tablet**: 768px+ (2-3 columns, horizontal nav)
- **Desktop**: 1024px+ (full viewport hero, 3-4 columns)
- **Large**: 1440px+ (wider containers, more spacing)

### Mobile Optimizations
1. **Hero**: 75vh on mobile (not full viewport waste)
2. **Navigation**: Slide-in hamburger menu from right
3. **Gallery**: 2 columns on mobile, 3 on tablet
4. **Touch Targets**: Minimum 44x44px (52px for primary buttons)
5. **Font Scaling**: clamp() for fluid typography
6. **Spacing**: Smaller on mobile, grows with viewport

---

## KEY DESIGN COMPONENTS

### Navigation
- **Fixed** at top with blur backdrop
- **Dark** background with gold accents
- **Hamburger** menu on mobile (gold lines)
- **Smooth** scroll to anchors
- **Logo**: Gold gradient text with glow

### Buttons
- **Primary**: Gold gradient with shimmer animation
- **Ghost**: Transparent with gold border
- **Hover**: Lift up + glow + scale
- **Shape**: Full pill (border-radius: 9999px)
- **Min Size**: 52px height for touch

### Cards
- **Background**: Dark card color (#1f1f1f)
- **Border**: Gold at 20% opacity
- **Hover**: Gold border + lift + glow
- **Radius**: 24px (bubbly, rounded)
- **Shadow**: Layered soft shadows

### Forms
- **Inputs**: Dark with gold border
- **Focus**: Gold glow + ring effect
- **Toggles**: Gold gradient when selected
- **Messages**: Colored backgrounds (green success, red error)

### Gallery
- **Grid**: 2 cols mobile, 3 cols tablet+
- **Overlay**: Gold gradient on hover
- **Button**: Circular "+" with gold border
- **Lightbox**: Full-screen modal with blur

---

## TYPOGRAPHY

### Font Families
- **Headings**: Poppins (bold, extrabold)
- **Body**: Montserrat (regular, medium, semibold)
- **Fallback**: System fonts for performance

### Sizing (Fluid with clamp())
- **Hero**: 2.5rem - 5rem
- **H2**: 2rem - 3rem
- **H3**: 1.25rem - 1.875rem
- **Body**: 1rem base
- **Small**: 0.875rem

### Effects
- **Headlines**: Gold gradient text
- **Shimmer**: Animated gradient background
- **Glow**: Text shadow with gold color
- **Weight**: Bold to extrabold for impact

---

## ACCESSIBILITY FEATURES

1. **Focus States**: 3px gold outline with 4px offset
2. **ARIA Labels**: All interactive elements
3. **Keyboard Nav**: Tab, Enter, ESC support
4. **Screen Readers**: sr-only class for hidden text
5. **Contrast**: WCAG AA compliant (gold on dark = 4.5:1+)
6. **Reduce Motion**: Respects prefers-reduced-motion
7. **Touch Targets**: Minimum 44x44px everywhere

---

## PERFORMANCE OPTIMIZATIONS

1. **CSS Variables**: Easy theme changes, no repetition
2. **GPU Acceleration**: Transform3d for animations
3. **Will-Change**: Hints for animated properties
4. **Lazy Loading**: Images load as needed
5. **Efficient Selectors**: Class-based, low specificity
6. **Minimal Repaints**: Transform/opacity only
7. **Cubic-Bezier**: Custom easing for smoothness

---

## WHAT MAKES THIS TIKTOK-WORTHY

1. **Dark Luxury Vibe**: Not basic, not corporate
2. **Gold Shimmer**: Eye-catching, premium feel
3. **Smooth Animations**: Satisfying to watch
4. **Leopard Print**: Bold, trendy, not generic
5. **Floating Elements**: Playful, interactive
6. **Gradient Text**: Modern, Gen Z aesthetic
7. **Glow Effects**: Adds depth and richness
8. **Bubbly Shapes**: Rounded, friendly, approachable

---

## NEXT STEPS: REAL IMAGES NEEDED

### Leopard Print Background
Replace `.hero-bg-leopard` background-image with:
- **Option 1**: https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1920&q=80
- **Option 2**: Download from Pexels "leopard print texture"
- **Option 3**: Custom photo of real leopard fur
- **Important**: Natural brown/tan colors, NOT pink leopard

### Gallery Images
Replace placeholder images with:
- Real client nail photos
- High-res, well-lit
- Variety of styles (simple to luxury)
- Consistent aspect ratio (1:1 square)

---

## DEVELOPER NOTES

### JavaScript Required For:
1. Hamburger menu toggle
2. Parallax scrolling effect
3. Gallery lightbox modal
4. Tab switching (Lengths/Styles)
5. Form validation
6. Smooth scroll anchors
7. Scroll-triggered animations

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Chrome Mobile
- Graceful degradation for older browsers

### File Structure
```
/
├── index.html       (HTML structure)
├── styles.css       (THIS FILE - all styling)
├── script.js        (JavaScript - to be created)
└── images/
    ├── leopard.jpg  (Real leopard print)
    └── gallery/     (Client nail photos)
```

---

## FINAL THOUGHTS

This design is **BOLD**, **MODERN**, and **LUXURIOUS** without being pretentious. It's designed to make 17-year-olds stop scrolling, screenshot it, and share it. The dark background makes the gold POP, the leopard print adds texture and personality, and the smooth animations create a premium experience that feels more expensive than it is.

**This is NOT a generic nail salon website. This is ART.**
