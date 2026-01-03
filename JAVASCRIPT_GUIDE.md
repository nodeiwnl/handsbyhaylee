# Hands by Haylee - JavaScript Functionality Guide

## Overview
This guide explains all the interactive features added to your luxury nail salon website. The JavaScript is production-ready, mobile-friendly, and designed to be easily customizable.

---

## Table of Contents
1. [Features Included](#features-included)
2. [How to Customize](#how-to-customize)
3. [Testing the Website](#testing-the-website)
4. [Future API Integration](#future-api-integration)
5. [Troubleshooting](#troubleshooting)
6. [Browser Compatibility](#browser-compatibility)

---

## Features Included

### 1. Mobile Navigation
**What it does:**
- Hamburger menu opens on mobile devices
- Smooth slide-in animation
- Closes when you click outside or press ESC
- Prevents body scroll when menu is open

**How to test:**
- Resize your browser to mobile size (under 768px width)
- Click the hamburger icon in the top right
- Menu should slide in from the left
- Click anywhere outside to close it

---

### 2. Smooth Scrolling
**What it does:**
- All navigation links scroll smoothly to their sections
- Automatically offsets for the fixed header
- Closes mobile menu after clicking a link

**How to test:**
- Click any navigation link (e.g., "Nail Lengths", "Design Tiers")
- Page should smoothly scroll to that section

---

### 3. Sticky Navigation
**What it does:**
- Navigation bar stays at the top when scrolling
- Adds subtle shadow when scrolled down
- Smooth transition effects

**How to test:**
- Scroll down the page
- Navigation should stay visible at the top
- Background becomes slightly more opaque

---

### 4. Selection Tracking
**What it does:**
- Click any nail length card to select it
- Click "Select Tier" buttons to choose a tier
- Selected items get a pink border and checkmark
- Selections are saved in browser memory (sessionStorage)
- Selections are restored when you refresh the page

**How to test:**
- Click on "Medium" nail length
- Card should get a pink border and show "Length selected!"
- Click "Select Tier 3" button
- Card should get a pink border and show "Tier 3 selected!"
- Refresh the page - your selections should still be highlighted

**For developers:**
- Open browser console (F12)
- Check sessionStorage to see saved selections
- View console logs for detailed tracking

---

### 5. Gallery Lightbox
**What it does:**
- Click any design image to open full-screen view
- Navigate with Previous/Next buttons
- Navigate with arrow keys on keyboard
- Swipe left/right on mobile
- Close by clicking X, clicking outside, or pressing ESC
- Shows image counter (e.g., "3 / 8")

**How to test:**
- Scroll to "Pre-Made Designs" section
- Click any design image
- Use arrow keys or buttons to navigate
- Press ESC or click outside to close

---

### 6. Booking Modals

#### In-Person Appointment Modal
**What it does:**
- Opens when you click "Book In-Person Appointment"
- Shows summary of your selections (length, tier)
- Form includes:
  - Name, email, phone
  - Date picker (only allows future dates)
  - Time picker (only shows available time slots)
  - Notes field
- Validates all required fields
- Shows success message after submission

**How to test:**
1. Scroll to "How Would You Like Your Nails?" section
2. Click "Book In-Person Appointment"
3. Modal should open with form
4. Fill out the form
5. Try submitting with empty fields - should show errors
6. Fill everything and submit - success modal appears

#### Shipped Sets Modal
**What it does:**
- Opens when you click "Order Shipped Sets"
- Shows summary of selections
- Form includes:
  - Name, email, phone
  - Full shipping address
  - Optional nail size measurements
  - Notes field
- Validates all fields
- Shows success message with order details

**How to test:**
1. Click "Order Shipped Sets" button
2. Fill out shipping information
3. Submit form
4. Success modal shows order confirmation

---

### 7. Form Validation
**What it does:**
- Checks all required fields before submission
- Validates email format
- Shows red border on invalid fields
- Shows error messages below fields
- Prevents submission until all fields are valid

**How to test:**
- Open any booking modal
- Try submitting empty form - should see error alerts
- Enter invalid email (e.g., "test@") - should show error
- Fix all fields - form should submit successfully

---

### 8. Scroll Animations
**What it does:**
- Sections fade in as you scroll down
- Cards animate in with staggered timing
- Smooth, professional feel
- Respects user's motion preferences (if they have "reduce motion" enabled)

**How to test:**
- Scroll slowly down the page
- Each section should fade in as it comes into view
- Cards should animate in one by one

---

### 9. Scroll Indicator
**What it does:**
- Bouncing arrow in hero section says "Scroll to Explore"
- Fades out when you start scrolling
- Animated bounce effect

**How to test:**
- Look at the bottom of the hero section
- See the animated scroll indicator
- Scroll down - it should fade away

---

### 10. Accessibility Features
**What it does:**
- All interactive elements work with keyboard
- Tab through navigation and forms
- Press Enter/Space to activate buttons
- ESC key closes modals
- Focus states visible (pink outline)
- ARIA labels for screen readers
- Focus trapped in modals (can't tab outside)

**How to test:**
- Try navigating the entire site with just keyboard (Tab, Enter, ESC)
- All features should work without a mouse

---

## How to Customize

### 1. Business Hours
Open `script.js` and find the `CONFIG` object at the top:

```javascript
businessHours: {
    monday: { start: '09:00', end: '19:00', closed: false },
    tuesday: { start: '09:00', end: '19:00', closed: false },
    // ... etc
}
```

**To change hours:** Edit the `start` and `end` times
**To close a day:** Set `closed: true`

### 2. Appointment Time Slots
```javascript
timeSlotInterval: 60, // Change to 30 for 30-minute slots, 120 for 2-hour slots
```

### 3. Booking Restrictions
```javascript
maxAdvanceBookingDays: 60,    // How far in advance clients can book
minAdvanceNoticeHours: 24,    // Minimum hours before appointment
```

### 4. Animation Speed
```javascript
animations: {
    scrollOffset: 80,          // Offset for smooth scrolling
    fadeInThreshold: 0.15,     // How much of element visible before animating
    debounceDelay: 100         // Scroll event optimization
}
```

---

## Testing the Website

### Local Testing
1. Open `index.html` in a web browser
2. Open browser console (F12) to see detailed logs
3. Test all features listed above

### Mobile Testing
**Option 1: Browser DevTools**
1. Press F12 to open developer tools
2. Click the mobile device icon (top left)
3. Select a device (iPhone, iPad, etc.)
4. Test mobile menu and touch interactions

**Option 2: Real Device**
1. Upload files to a web server
2. Visit on your phone/tablet
3. Test touch gestures, swipes, mobile menu

### Console Logs
The JavaScript logs everything to the console for debugging:
- All user selections
- Modal open/close events
- Form submissions
- Booking data

**To view:**
1. Press F12
2. Click "Console" tab
3. Perform actions on the site
4. See detailed logs

---

## Future API Integration

### Current State (Client-Side Only)
Right now, the website is **fully functional on the client side** but doesn't send data to a server. When someone "books" an appointment, the data is:
1. Validated
2. Logged to browser console
3. Shown in a success modal
4. NOT saved to a database (yet)

### When You're Ready for a Backend

#### Step 1: Set Up Your API Endpoints
You'll need a backend that can receive booking data. Popular options:
- **Shopify** (if you want e-commerce features)
- **Square Appointments** (for appointment booking)
- **Custom backend** (Node.js, Python, PHP, etc.)
- **Form services** like Formspree, Basin, or Netlify Forms

#### Step 2: Update API URLs
In `script.js`, find the `CONFIG` object and update these:

```javascript
api: {
    bookAppointment: 'https://yourwebsite.com/api/bookings/in-person',
    orderShippedSet: 'https://yourwebsite.com/api/orders/shipped',
    checkAvailability: 'https://yourwebsite.com/api/availability'
}
```

#### Step 3: Uncomment API Code
Find these sections in `script.js` and uncomment them:

**In `submitBooking()` function:**
```javascript
// TODO: Replace with actual API call when backend is ready
/*
try {
    const response = await fetch(CONFIG.api[...], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });
    // ... rest of code
} catch (error) {
    // ... error handling
}
*/
```

**In `checkAvailability()` function:**
```javascript
/*
try {
    const response = await fetch(`${CONFIG.api.checkAvailability}?date=${date}&time=${time}`);
    const data = await response.json();
    return data.available;
} catch (error) {
    console.error('Error checking availability:', error);
    return false;
}
*/
```

#### Step 4: Test with Real Data
1. Submit a test booking
2. Check your backend to see if data arrived
3. Test error scenarios (no internet, server error, etc.)

### Booking Data Format
When someone books, the JavaScript sends this data structure:

```javascript
{
    "nailLength": "medium",
    "tier": "3",
    "designType": "premade",
    "bookingType": "in-person",
    "timestamp": "2026-01-03T12:30:00.000Z",
    "customerInfo": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "(555) 123-4567",
        "appointmentDate": "2026-01-10",
        "appointmentTime": "14:00",
        "notes": "I love pink!"
    }
}
```

Your backend should be ready to receive this JSON format.

---

## Troubleshooting

### Problem: JavaScript not working
**Solution:**
1. Check if `script.js` is in the same folder as `index.html`
2. Open browser console (F12) - look for red error messages
3. Make sure you're viewing the page through a server (not just opening the file)

### Problem: Mobile menu not opening
**Solution:**
1. Check browser console for errors
2. Verify you're on a mobile-sized screen (under 768px)
3. Make sure JavaScript loaded (check Network tab in DevTools)

### Problem: Forms not submitting
**Solution:**
1. Check browser console for validation errors
2. Fill in ALL required fields (marked with *)
3. Use a valid email format
4. Select a date and time

### Problem: Selections not saving
**Solution:**
1. Check if browser allows sessionStorage
2. Try in a different browser
3. Make sure cookies/storage aren't blocked
4. Check browser console for errors

### Problem: Modals not closing
**Solution:**
1. Press ESC key
2. Click the X button
3. Click outside the modal (on dark background)
4. Refresh page if stuck

### Problem: Animations not working
**Solution:**
1. Check if browser supports Intersection Observer
2. Update to a modern browser (Chrome, Firefox, Safari, Edge)
3. Disable "reduce motion" in OS settings if you want to test animations

---

## Browser Compatibility

### Fully Supported
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

### Features Used
- ES6 JavaScript (const, let, arrow functions, template literals)
- Intersection Observer API (for scroll animations)
- sessionStorage
- FormData API
- async/await
- CSS variables

### Fallbacks
- Older browsers may not show animations but core functionality works
- Mobile menu works on all browsers
- Forms work everywhere

### Testing on Old Browsers
If you need to support Internet Explorer 11:
1. You'll need to transpile the JavaScript with Babel
2. Add polyfills for modern features
3. Consider if it's worth it (IE11 usage is < 1% globally)

---

## Performance Optimization

### What's Already Optimized
- Scroll events are debounced (not firing constantly)
- Images use lazy loading (`loading="lazy"`)
- Animations use CSS transitions (hardware accelerated)
- Event delegation where appropriate
- Minimal DOM manipulation

### File Size
- `script.js`: ~35KB uncompressed
- Minified: ~20KB
- Gzipped: ~6KB

### Loading Speed
- JavaScript loads at the end of HTML (doesn't block page rendering)
- No external dependencies (no jQuery, no libraries)
- Pure vanilla JavaScript

---

## Security Notes

### Current Implementation
- All form validation is client-side (user-friendly but not secure)
- No sensitive data is stored in sessionStorage
- No passwords or payment info collected

### When Adding Backend
**IMPORTANT:** Always validate data on the server, not just in JavaScript!
- Client-side validation is for UX (user experience)
- Server-side validation is for security
- Never trust data from the browser

**Recommendations:**
- Use HTTPS for your website
- Sanitize all user input on the server
- Implement CSRF protection
- Rate limit form submissions
- Add CAPTCHA for spam prevention

---

## Customization Examples

### Example 1: Change Time Slot Duration
Want 30-minute appointments instead of 1-hour?

```javascript
// In CONFIG object
timeSlotInterval: 30, // Changed from 60
```

### Example 2: Close on Sundays
```javascript
sunday: { start: '10:00', end: '18:00', closed: true }
```

### Example 3: Add a New Required Field
In the modal HTML section of `script.js`, add:

```javascript
<div class="form-group">
    <label for="instagram">Instagram Handle</label>
    <input type="text" id="instagram" name="instagram" placeholder="@yourhandle">
</div>
```

Then in form submission, capture it:
```javascript
instagram: formData.get('instagram')
```

### Example 4: Change Animation Speed
Make animations faster:

```javascript
// In CSS section
transition: opacity 0.3s ease-out, transform 0.3s ease-out;
// Changed from 0.6s
```

---

## Getting Help

### Developer Console Tips
1. Press F12 to open
2. Click "Console" tab
3. You'll see messages like:
   - "Mobile nav initialized"
   - "Selected length: medium"
   - "Opened gallery modal at index 2"
   - "=== BOOKING SUBMISSION ===" (with full data)

### Common Console Messages
- "Loaded state from storage" - Selections restored from previous session
- "Saved state to storage" - Selection saved successfully
- "Cleared all selections" - SessionStorage cleared
- "=== ALL SYSTEMS READY ===" - Everything loaded correctly

### Debug Mode
Want more detailed logs? Add this at the top of `script.js`:

```javascript
const DEBUG = true; // Set to false to disable extra logging
```

Then add throughout the code:
```javascript
if (DEBUG) console.log('Extra detail here');
```

---

## Contact & Support

### Need Help Modifying the Code?
1. Check browser console for errors
2. Review this guide
3. Search for specific error messages online
4. Contact a web developer for custom modifications

### Want to Hire a Developer?
When looking for help, tell them:
- "I need help integrating the Hands by Haylee booking form with [your backend service]"
- "I need to customize the booking flow to include [your feature]"
- Share this guide with them - it will help them understand the codebase

---

## Changelog

### Version 1.0 (2026-01-03)
- Initial release
- Mobile navigation
- Smooth scrolling
- Gallery lightbox
- Selection tracking
- Booking modals (in-person & shipped)
- Form validation
- Scroll animations
- Accessibility features
- Full mobile support

---

## License & Credits

This JavaScript was created specifically for Hands by Haylee nail salon website.
- Pure vanilla JavaScript (no external libraries)
- Mobile-first design
- Accessibility-compliant
- Modern ES6+ syntax

Feel free to modify and customize for your business needs!

---

**Made with care for Hands by Haylee - Where Your Nails Become Art**
