# COLOR & ANIMATION REFERENCE
## Quick Visual Guide for Hands by Haylee

---

## PRIMARY COLOR PALETTE

### GOLD (Primary - Use Everywhere!)
```css
--color-gold-primary: #D4AF37   /* Main gold - buttons, borders, text */
--color-gold-light:   #E8C547   /* Hover states, shimmer highlights */
--color-gold-dark:    #C9A961   /* Shadows, gradient end */
--color-gold-rich:    #B8941D   /* Deep accents */
```

**Visual**: Imagine luxury jewelry gold, NOT yellow. Think 24k gold shimmer.

---

### HOT PINK (Accent ONLY - Use Sparingly!)
```css
--color-pink-accent:  #ff00af   /* ONLY for small accents */
--color-pink-bright:  #ff33bf   /* ONLY for hover states */
```

**Usage**: Less than 5% of design. Think: a tiny dot, not a section.

---

### DARK BACKGROUNDS
```css
--color-bg-darkest:   #0a0a0a   /* Main body background (almost black) */
--color-bg-dark:      #1a1a1a   /* Section backgrounds */
--color-bg-medium:    #2a2a2a   /* Alternate sections */
--color-bg-card:      #1f1f1f   /* Cards, forms, interactive elements */
```

**Visual**: Think iPhone in dark mode - deep, rich blacks.

---

### TEXT COLORS
```css
--color-text-primary: #ffffff   /* Main text (white) */
--color-text-gold:    #D4AF37   /* Headlines, important text */
--color-text-muted:   #a0a0a0   /* Secondary text (light gray) */
--color-text-dim:     #666666   /* Tertiary text (dim gray) */
```

---

## VISUAL EXAMPLES BY COMPONENT

### Navigation Bar
- **Background**: Almost black (#0a0a0a) with blur
- **Logo**: Gold gradient text with glow
- **Links**: White text, gold on hover
- **Border**: Thin gold line at bottom
- **Hamburger**: Gold lines with glow

### Hero Section
- **Layer 1**: Dark gradient background
- **Layer 2**: Natural leopard print (30% opacity)
- **Layer 3**: Gold shimmer overlay (animated)
- **Layer 4**: Dark gradient for text contrast
- **Title**: HUGE gold gradient text with shimmer
- **Subtitle**: White text
- **Description**: Gray muted text
- **Buttons**: Gold primary, transparent ghost

### Buttons
```
PRIMARY BUTTON:
┌─────────────────────────┐
│   Gold gradient bg      │
│   Black text            │
│   Shimmer animation     │
│   Gold glow shadow      │
└─────────────────────────┘

GHOST BUTTON:
┌─────────────────────────┐
│   Transparent bg        │
│   Gold border           │
│   Gold text             │
│   Subtle gold glow      │
└─────────────────────────┘
```

### Gallery Cards
```
CARD:
┌─────────────────────────┐
│                         │
│    Image (square)       │
│                         │
│  (Hover: gold overlay)  │
│  (Hover: + button)      │
└─────────────────────────┘
- Border: Gold 20% opacity
- Radius: 24px (rounded)
- Shadow: Soft dark shadow
- Hover: Lifts up + gold glow
```

### Form Inputs
```
INPUT:
┌─────────────────────────┐
│  Dark bg, gold border   │
│  White text             │
│  Gray placeholder       │
└─────────────────────────┘

FOCUSED INPUT:
┌─────────────────────────┐
│  Darker bg              │
│  BRIGHT gold border     │
│  Gold glow ring         │
└─────────────────────────┘
```

### Option Cards (Service Selector)
```
NORMAL:
┌─────────────────────────┐
│  Dark bg                │
│  Subtle gold border     │
│  White text             │
└─────────────────────────┘

SELECTED:
┌═════════════════════════┐
║  Gold gradient bg       ║
║  THICK gold border      ║
║  Gold GLOW around card  ║
└═════════════════════════┘
```

---

## ANIMATIONS CHEAT SHEET

### 1. Shimmer (Buttons, Text)
- **What**: Diagonal light sweep
- **Speed**: 3 seconds
- **Loop**: Infinite
- **Direction**: Left to right
- **Effect**: Looks like metallic shine

### 2. Float (CTAs, Cards)
- **What**: Gentle up/down motion
- **Speed**: 3 seconds
- **Loop**: Infinite
- **Distance**: 10px
- **Effect**: Playful, inviting

### 3. Fade-In (All content)
- **What**: Opacity 0 to 1 + slide up
- **Speed**: 500ms - 1s
- **Trigger**: On scroll into view
- **Effect**: Smooth reveal

### 4. Hover - Cards
- **What**: Lift + scale + glow
- **Speed**: 300ms
- **Distance**: -8px up
- **Scale**: 1.02
- **Shadow**: Gold glow

### 5. Hover - Buttons
- **What**: Lift + stronger glow
- **Speed**: 300ms
- **Distance**: -3px up
- **Scale**: 1.02
- **Effect**: Premium, clickable

### 6. Gold Text Shimmer
- **What**: Gradient background moves
- **Speed**: 4 seconds
- **Loop**: Infinite
- **Effect**: Text "sparkles"

### 7. Scroll Bounce
- **What**: Arrow bounces
- **Speed**: 2 seconds
- **Loop**: Infinite
- **Purpose**: "Hey, scroll down!"

---

## SPACING SCALE (Consistent Throughout)

```
--spacing-xs:   4px    /* Tiny gaps */
--spacing-sm:   8px    /* Small gaps */
--spacing-md:   12px   /* Medium gaps */
--spacing-base: 16px   /* Base spacing */
--spacing-lg:   24px   /* Large gaps */
--spacing-xl:   32px   /* Extra large */
--spacing-2xl:  48px   /* Section spacing */
--spacing-3xl:  64px   /* Big sections */
--spacing-4xl:  96px   /* Hero padding */
```

**Use these**: Don't make up custom spacing values!

---

## BORDER RADIUS (Bubbly & Cute)

```
--radius-sm:   8px      /* Small elements */
--radius-md:   12px     /* Medium elements */
--radius-lg:   16px     /* Cards, inputs */
--radius-xl:   24px     /* Gallery items */
--radius-2xl:  32px     /* Large cards */
--radius-full: 9999px   /* Buttons, pills */
```

**Remember**: Nothing sharp or angular. Everything is soft and rounded.

---

## SHADOWS (Soft & Layered)

### Small Shadow (Subtle depth)
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
```

### Medium Shadow (Cards)
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
```

### Large Shadow (Hover states)
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
```

### Gold Glow (Special effects)
```css
box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
```

### Gold Glow Large (Selected items)
```css
box-shadow: 0 12px 48px rgba(212, 175, 55, 0.4);
```

---

## TYPOGRAPHY HIERARCHY

### Hero Title
- **Size**: 2.5rem - 5rem (responsive)
- **Weight**: 800 (extrabold)
- **Color**: Gold gradient
- **Effect**: Shimmer animation

### Section Title
- **Size**: 2rem - 3rem (responsive)
- **Weight**: 800 (extrabold)
- **Color**: Gold gradient
- **Effect**: Static (no animation)

### Card Title
- **Size**: 1.25rem - 1.875rem
- **Weight**: 700 (bold)
- **Color**: White
- **Effect**: None

### Body Text
- **Size**: 1rem (16px)
- **Weight**: 400 (regular)
- **Color**: White or muted gray
- **Line Height**: 1.7 (relaxed)

### Small Text
- **Size**: 0.875rem (14px)
- **Weight**: 400-600
- **Color**: Dim gray
- **Usage**: Labels, captions

---

## WHAT IT SHOULD FEEL LIKE

### On Mobile
- **Smooth**: Buttery 60fps scrolling
- **Touch**: Large, easy-to-tap buttons
- **Clean**: Not cluttered, spacious
- **Fast**: No lag, instant responses

### On Desktop
- **Luxurious**: Rich, premium aesthetic
- **Interactive**: Hover states everywhere
- **Spacious**: Breathing room around content
- **Cohesive**: Everything feels connected

### Overall Vibe
- **NOT**: Corporate, boring, generic
- **YES**: Bold, confident, luxury
- **NOT**: Childish, cheap, amateur
- **YES**: Professional, modern, Gen Z

---

## QUICK CHECKS

### Is the Gold Right?
- NOT yellow highlighter
- NOT mustard
- YES 24k jewelry gold
- YES metallic shimmer

### Is the Dark Right?
- NOT pure black (#000000)
- NOT gray
- YES deep charcoal (#0a0a0a)
- YES rich, luxury black

### Are the Animations Right?
- NOT janky or stuttering
- NOT too fast or distracting
- YES smooth and subtle
- YES 60fps performance

### Is the Leopard Right?
- NOT pink leopard print
- NOT cartoon pattern
- YES natural brown/tan
- YES real animal texture

---

## COLOR CONTRAST RATIOS (Accessibility)

✅ **White on Dark** (#ffffff on #0a0a0a) = 19.5:1 - Perfect
✅ **Gold on Dark** (#D4AF37 on #0a0a0a) = 6.8:1 - Great
✅ **Muted on Dark** (#a0a0a0 on #0a0a0a) = 8.2:1 - Excellent
✅ **Black on Gold** (#0a0a0a on #D4AF37) = 6.8:1 - Great

All combinations meet WCAG AA standards (minimum 4.5:1 for text).

---

**Remember**: When in doubt, add more gold and make it smoother!
