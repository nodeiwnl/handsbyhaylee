# Hands by Haylee - Website Testing Checklist

Use this checklist to verify all features are working correctly before going live.

---

## Quick Start Testing

### 1. Open the Website
- [ ] Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge)
- [ ] Press F12 to open Developer Console
- [ ] Look for "=== ALL SYSTEMS READY ===" message
- [ ] No red error messages in console

---

## Desktop Testing (Laptop/Computer)

### Navigation
- [ ] Click each navigation link in the header
- [ ] Page smoothly scrolls to the correct section
- [ ] Navigation bar stays at top when scrolling
- [ ] Navigation gets subtle shadow when scrolled down

### Hero Section
- [ ] "Scroll to Explore" indicator is visible and animated
- [ ] Indicator fades out when you scroll down
- [ ] "Book Your Appointment" button scrolls to booking section
- [ ] "Explore Services" button scrolls to services section

### Nail Length Selection
- [ ] Click on "Extra Short" card
- [ ] Card gets pink border
- [ ] "Length selected!" message appears
- [ ] Click on "Medium" card
- [ ] Previous selection is removed, new one is highlighted
- [ ] Refresh page - selection is still highlighted

### Design Tier Selection
- [ ] Click "Select Tier 1" button
- [ ] Card gets pink border and checkmark
- [ ] "Tier 1 selected!" message appears
- [ ] Try selecting different tiers
- [ ] Refresh page - selection persists

### Pre-Made Designs Gallery
- [ ] Click any design image
- [ ] Lightbox/modal opens full-screen
- [ ] Click "Next" button - shows next image
- [ ] Click "Prev" button - shows previous image
- [ ] Press Right Arrow key - next image
- [ ] Press Left Arrow key - previous image
- [ ] Image counter shows correct numbers (e.g., "3 / 8")
- [ ] Click X button - modal closes
- [ ] Open again, click dark area outside - modal closes
- [ ] Open again, press ESC key - modal closes

### In-Person Booking
- [ ] Click "Book In-Person Appointment" button
- [ ] Modal opens with booking form
- [ ] Summary shows your selected length and tier
- [ ] Try submitting empty form - see error messages
- [ ] Fill in Name: "Test User"
- [ ] Fill in Email: "test@test.com"
- [ ] Fill in Phone: "(555) 123-4567"
- [ ] Click date field - can only select future dates
- [ ] Select a date
- [ ] Time dropdown populates with time slots
- [ ] Select a time
- [ ] Add notes (optional)
- [ ] Submit form
- [ ] Success modal appears
- [ ] Success message shows booking details
- [ ] Click "Done" button - modal closes

### Shipped Sets Booking
- [ ] Click "Order Shipped Sets" button
- [ ] Modal opens with order form
- [ ] Summary shows selections
- [ ] Fill in all required fields:
  - [ ] Name
  - [ ] Email
  - [ ] Phone
  - [ ] Street address
  - [ ] City
  - [ ] State
  - [ ] ZIP code
  - [ ] Country
- [ ] Submit form
- [ ] Success modal shows order confirmation
- [ ] Shipping details are displayed

### Scroll Animations
- [ ] Scroll slowly down the page
- [ ] Each section fades in as it comes into view
- [ ] Service cards animate in with stagger effect
- [ ] Tier cards animate in
- [ ] Animations are smooth, not jumpy

### Contact Section
- [ ] Phone number is clickable (click-to-call)
- [ ] Email is clickable (opens email app)
- [ ] Instagram link opens in new tab
- [ ] Social media links in footer work

---

## Mobile Testing (Phone/Tablet)

### Resize Browser Method
1. Press F12
2. Click mobile device icon (top-left of DevTools)
3. Select "iPhone 12 Pro" or similar
4. Run through checklist below

### Mobile Navigation
- [ ] Hamburger icon (three lines) visible in top-right
- [ ] Click hamburger icon
- [ ] Menu slides in from left
- [ ] Menu covers full screen
- [ ] Click any menu link
- [ ] Menu closes automatically
- [ ] Page scrolls to section
- [ ] Click hamburger again to open
- [ ] Click outside menu (on dark area)
- [ ] Menu closes

### Mobile Touch Interactions
- [ ] Tap nail length cards to select
- [ ] Selection works (pink border appears)
- [ ] Tap design tier buttons
- [ ] Tier selection works

### Mobile Gallery
- [ ] Tap gallery image
- [ ] Lightbox opens full-screen
- [ ] Swipe left - shows next image
- [ ] Swipe right - shows previous image
- [ ] Tap X button to close
- [ ] Tap outside image to close

### Mobile Forms
- [ ] Open booking modal on mobile
- [ ] Form is readable and fits screen
- [ ] Can scroll within modal
- [ ] Date picker works on mobile
- [ ] Time dropdown works
- [ ] Keyboard appears when tapping input fields
- [ ] Can submit form successfully

### Mobile Scroll Animations
- [ ] Scroll down on mobile
- [ ] Sections fade in smoothly
- [ ] Animations don't cause lag
- [ ] Page scrolls smoothly

---

## Keyboard Navigation Testing

### Tab Navigation
- [ ] Press Tab key repeatedly
- [ ] Focus moves through all interactive elements
- [ ] Pink outline shows which element is focused
- [ ] Can navigate entire site with keyboard

### Booking Modal Keyboard
- [ ] Tab into booking form
- [ ] Can Tab through all form fields
- [ ] Press Enter to submit form
- [ ] Press ESC to close modal

### Gallery Keyboard
- [ ] Tab to gallery image
- [ ] Press Enter to open lightbox
- [ ] Press Right Arrow for next image
- [ ] Press Left Arrow for previous image
- [ ] Press ESC to close lightbox

---

## Browser Console Testing

### Open Console
1. Press F12
2. Click "Console" tab
3. Perform actions below and verify console logs

### Expected Console Logs
- [ ] On page load: "=== HANDS BY HAYLEE - INITIALIZING ==="
- [ ] On page load: "=== ALL SYSTEMS READY ==="
- [ ] When clicking length: "Selected length: medium"
- [ ] When clicking tier: "Selected tier: 3"
- [ ] When opening gallery: "Opened gallery modal at index 2"
- [ ] When opening booking: "Opened in-person booking modal"
- [ ] When submitting form: "=== BOOKING SUBMISSION ===" with full data

### Check for Errors
- [ ] No red error messages in console
- [ ] No warnings about missing files
- [ ] All images load correctly

---

## SessionStorage Testing

### In Browser Console
1. Press F12
2. Click "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "Session Storage" in left sidebar
4. Click on your site URL

### Verify Storage
- [ ] Select nail length
- [ ] Check sessionStorage - should see `hbh_selected_length`
- [ ] Select tier
- [ ] Check sessionStorage - should see `hbh_selected_tier`
- [ ] Refresh page
- [ ] Selections should persist
- [ ] Close tab and reopen
- [ ] Selections should be cleared (sessionStorage is temporary)

---

## Form Validation Testing

### In-Person Form
- [ ] Open booking modal
- [ ] Try submitting with all fields empty
- [ ] See "Please fill in all required fields" alert
- [ ] Fill in name only, submit
- [ ] See validation errors
- [ ] Enter invalid email: "test"
- [ ] See email validation error
- [ ] Fill all fields correctly
- [ ] Form submits successfully

### Shipped Form
- [ ] Open shipped sets modal
- [ ] Test empty submission - see errors
- [ ] Enter invalid email - see error
- [ ] Fill all required fields
- [ ] Submit successfully

---

## Cross-Browser Testing

Test in multiple browsers if possible:

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Animations smooth

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Animations smooth

### Safari (Mac/iPhone)
- [ ] All features work
- [ ] Mobile menu works on iPhone
- [ ] Touch gestures work

### Edge
- [ ] All features work
- [ ] No console errors

---

## Performance Testing

### Page Load Speed
- [ ] Page loads in under 3 seconds
- [ ] No lag when clicking buttons
- [ ] Smooth scrolling performance
- [ ] Animations don't cause jank

### Mobile Performance
- [ ] Page loads quickly on mobile
- [ ] Touch interactions are responsive
- [ ] No delay when tapping buttons
- [ ] Smooth scroll on mobile

---

## Accessibility Testing

### Screen Reader (Optional)
If you have a screen reader:
- [ ] Navigation is announced
- [ ] Form labels are read correctly
- [ ] Buttons have descriptive labels
- [ ] Modal roles are announced

### Keyboard-Only Navigation
- [ ] Can use entire site without mouse
- [ ] Focus is visible
- [ ] Tab order is logical
- [ ] ESC key works in modals

### Color Contrast
- [ ] Text is readable
- [ ] Pink on white has good contrast
- [ ] White on pink is readable
- [ ] Form labels are clear

---

## Real-World Scenario Testing

### Complete Booking Flow
1. [ ] Customer visits homepage
2. [ ] Scrolls through nail lengths
3. [ ] Clicks "Medium" length
4. [ ] Scrolls to design tiers
5. [ ] Clicks "Select Tier 3"
6. [ ] Views gallery images
7. [ ] Clicks "Book In-Person Appointment"
8. [ ] Sees their selections in summary
9. [ ] Fills out form with real-looking data
10. [ ] Submits successfully
11. [ ] Sees confirmation message

### Shipped Order Flow
1. [ ] Customer wants shipped sets
2. [ ] Selects "Short" length
3. [ ] Selects "Tier 2"
4. [ ] Clicks "Order Shipped Sets"
5. [ ] Fills out shipping address
6. [ ] Adds nail size measurements
7. [ ] Submits order
8. [ ] Gets confirmation with shipping details

---

## Edge Cases Testing

### Date Selection
- [ ] Try selecting yesterday's date - should not be allowed
- [ ] Try selecting today - should check minimum advance notice
- [ ] Try selecting 100 days in future - should be blocked
- [ ] Select valid date - time slots populate correctly

### Time Selection
- [ ] Select Sunday (if closed) - should show "Closed on this day"
- [ ] Select weekday - should show time slots
- [ ] Time slots respect business hours

### Form Edge Cases
- [ ] Submit form with spaces only in name field - should fail
- [ ] Enter email "test@test" - should fail
- [ ] Enter phone "123" - should accept (but might need formatting)
- [ ] Enter very long notes (1000+ characters) - should accept

### Modal Edge Cases
- [ ] Open gallery modal
- [ ] Press Next on last image - should loop to first
- [ ] Press Prev on first image - should loop to last
- [ ] Open booking modal while gallery is open
- [ ] Only one modal should be visible at a time

---

## Final Checks Before Going Live

### Content
- [ ] All placeholder images replaced with real designs
- [ ] Phone number updated in Contact section
- [ ] Email address updated
- [ ] Instagram handle updated
- [ ] Business hours are correct
- [ ] Pricing information is current

### Configuration
- [ ] Business hours in `script.js` are correct
- [ ] Time slot duration is correct
- [ ] Max advance booking days is appropriate
- [ ] Min advance notice hours is appropriate

### SEO & Meta
- [ ] Page title is correct
- [ ] Meta description is filled in
- [ ] Keywords are relevant
- [ ] Social media links work

### Legal
- [ ] Privacy policy link (if you have one)
- [ ] Terms of service link (if you have one)
- [ ] Cancellation policy link (if you have one)

---

## Issues Found?

### If Something Doesn't Work:
1. Open browser console (F12)
2. Note any red error messages
3. Check `JAVASCRIPT_GUIDE.md` troubleshooting section
4. Make sure all files are in same folder
5. Try a different browser
6. Clear browser cache (Ctrl+Shift+Delete)

### Common Fixes:
- **Menu not working**: Check browser console for errors
- **Forms not submitting**: Make sure all required fields filled
- **Selections not saving**: Check if browser allows sessionStorage
- **Modals not closing**: Press ESC or refresh page
- **Animations not showing**: Update to modern browser

---

## Sign-Off Checklist

Before launching to customers:

- [ ] All desktop tests passed
- [ ] All mobile tests passed
- [ ] Tested on at least 2 different browsers
- [ ] Tested on real mobile device (or emulator)
- [ ] No console errors
- [ ] All links work
- [ ] All forms submit successfully
- [ ] Contact information is correct
- [ ] Business hours are accurate
- [ ] Ready for customers!

---

## Post-Launch Monitoring

After website is live:

### Week 1
- [ ] Check analytics for errors
- [ ] Monitor form submissions
- [ ] Ask first customers for feedback
- [ ] Fix any issues reported

### Month 1
- [ ] Review booking data
- [ ] Check which tiers are most popular
- [ ] See which nail lengths are preferred
- [ ] Adjust pricing/offerings based on data

---

**Testing completed on:** ________________

**Tested by:** ________________

**Ready to launch:** [ ] Yes [ ] No

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

**Made for Hands by Haylee - Where Your Nails Become Art**
