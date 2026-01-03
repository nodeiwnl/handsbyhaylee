# API Integration Guide - Hands by Haylee

This guide explains how to connect your booking website to a backend/database when you're ready.

---

## Current Status: Client-Side Only

Right now, your website is **100% functional** but doesn't save bookings to a database. Here's what happens:

1. Customer fills out booking form
2. JavaScript validates the data
3. Data is logged to browser console (for testing)
4. Success message is shown
5. **Data is NOT saved permanently**

---

## Why You Need a Backend

To actually receive and manage bookings, you need:
- A **database** to store booking information
- An **API endpoint** that receives booking data
- An **email notification system** to alert you of new bookings
- A **dashboard** to view/manage appointments

---

## Backend Options

### Option 1: No-Code Solutions (Easiest)

#### A) Calendly
**Best for:** Simple appointment scheduling
**Cost:** Free to $15/month
**Setup Time:** 10 minutes

**How to integrate:**
1. Sign up at calendly.com
2. Create your availability schedule
3. Replace the booking modal with Calendly embed code

**Pros:**
- No coding required
- Email notifications included
- Calendar sync (Google Calendar, etc.)
- Payment integration available

**Cons:**
- Less customization
- Customers leave your website
- Calendly branding on free plan

#### B) Acuity Scheduling (by Squarespace)
**Best for:** Professional booking with payments
**Cost:** $16-$50/month
**Setup Time:** 30 minutes

**Similar to Calendly but more features:**
- Custom branding
- Payment processing
- Client management
- Email/SMS reminders

#### C) Formspree / Basin / Netlify Forms
**Best for:** Just collecting form data via email
**Cost:** Free to $10/month
**Setup Time:** 5 minutes

**How to integrate:**
```html
<!-- In your booking form, change: -->
<form id="inPersonForm" class="booking-form">

<!-- To: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="booking-form">
```

**Pros:**
- Super simple
- Just receive emails
- No database needed

**Cons:**
- No appointment management
- Manual tracking required
- Just email, no dashboard

---

### Option 2: E-Commerce Platforms (Recommended)

#### A) Shopify
**Best for:** If you want to sell products AND take bookings
**Cost:** $39/month minimum
**Setup Time:** 2-4 hours

**Perfect if you want to:**
- Sell shipped nail sets as products
- Take in-person appointment bookings (with app)
- Accept payments online
- Manage inventory

**How to integrate:**
1. Create Shopify store
2. Install "Bookly" or "BookThatApp" (booking app)
3. Use Shopify Buy Button or API to integrate with your site

**Apps for appointment booking:**
- BookThatApp ($10-30/month)
- Appointedd (Free-$50/month)
- Bookly ($20/month)

#### B) Square Appointments
**Best for:** Salon/beauty business appointments
**Cost:** Free to $50/month
**Setup Time:** 1 hour

**Features:**
- Built for salons/beauty services
- Online booking
- Payment processing
- Client management
- Email/SMS reminders
- Point of sale integration

**How to integrate:**
1. Sign up at squareup.com/appointments
2. Set up your services
3. Get embed code
4. Replace booking modals with Square widget

---

### Option 3: Custom Backend (Most Flexible)

#### A) Node.js + Express + MongoDB
**Best for:** Full control, custom features
**Cost:** $5-15/month (hosting)
**Setup Time:** 10-20 hours (developer needed)

**Stack:**
- Frontend: Your current HTML/CSS/JS
- Backend: Node.js + Express
- Database: MongoDB or PostgreSQL
- Hosting: Heroku, DigitalOcean, AWS

**You'll need:**
- A web developer
- Basic server knowledge
- Database setup

#### B) Firebase (Google)
**Best for:** Quick setup, scalable
**Cost:** Free to start, pay as you grow
**Setup Time:** 4-8 hours

**Features:**
- Real-time database
- Authentication
- Hosting
- Email integration

#### C) Supabase (Open-source Firebase alternative)
**Best for:** Modern, developer-friendly
**Cost:** Free to start
**Setup Time:** 4-8 hours

**Features:**
- PostgreSQL database
- REST API auto-generated
- Real-time subscriptions
- Authentication

---

## Step-by-Step: Connecting to an API

### Step 1: Get Your API Endpoint

From your chosen backend, you'll receive URLs like:
```
https://api.yourwebsite.com/bookings
https://yourwebsite.com/api/appointments
```

### Step 2: Update CONFIG in script.js

Open `script.js`, find the CONFIG object at the top:

```javascript
// BEFORE (current placeholder):
api: {
    bookAppointment: '/api/bookings/in-person',
    orderShippedSet: '/api/orders/shipped',
    checkAvailability: '/api/availability'
}

// AFTER (with real URLs):
api: {
    bookAppointment: 'https://api.yourwebsite.com/bookings/in-person',
    orderShippedSet: 'https://api.yourwebsite.com/orders/shipped',
    checkAvailability: 'https://api.yourwebsite.com/availability'
}
```

### Step 3: Uncomment API Code

Find this section in `script.js` (around line 1250):

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

    if (!response.ok) {
        throw new Error('Booking failed');
    }

    const result = await response.json();
    this.showSuccess(result, type);
} catch (error) {
    console.error('Booking error:', error);
    alert('Sorry, there was an error processing your booking. Please try again or contact us directly.');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}
*/
```

**Remove the `/*` and `*/` to activate:**

```javascript
try {
    const response = await fetch(CONFIG.api[type === 'in-person' ? 'bookAppointment' : 'orderShippedSet'], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
        throw new Error('Booking failed');
    }

    const result = await response.json();
    this.showSuccess(result, type);
} catch (error) {
    console.error('Booking error:', error);
    alert('Sorry, there was an error processing your booking. Please try again or contact us directly.');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}
```

### Step 4: Test the Connection

1. Fill out a booking form
2. Submit it
3. Check browser console - should see network request
4. Check your backend - should receive the data

---

## Expected Data Format

When someone books, this JSON is sent to your API:

### In-Person Appointment
```json
{
    "nailLength": "medium",
    "tier": "3",
    "designType": "premade",
    "bookingType": "in-person",
    "timestamp": "2026-01-03T14:30:00.000Z",
    "customerInfo": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "(555) 123-4567",
        "appointmentDate": "2026-01-10",
        "appointmentTime": "14:00",
        "notes": "I love the pink leopard design!"
    }
}
```

### Shipped Order
```json
{
    "nailLength": "short",
    "tier": "2",
    "designType": "custom",
    "bookingType": "shipped",
    "timestamp": "2026-01-03T14:30:00.000Z",
    "customerInfo": {
        "name": "Sarah Smith",
        "email": "sarah@example.com",
        "phone": "(555) 987-6543",
        "shippingAddress": {
            "street": "123 Main Street",
            "city": "Fresno",
            "state": "CA",
            "zip": "93721",
            "country": "USA"
        },
        "nailSizes": "Thumb: 14mm, Index: 10mm, Middle: 11mm, Ring: 10mm, Pinky: 8mm",
        "notes": "Rush order for wedding next week!"
    }
}
```

---

## Your Backend Should:

### 1. Receive the Data
```javascript
// Example Node.js/Express endpoint
app.post('/api/bookings/in-person', async (req, res) => {
    const bookingData = req.body;

    // Validate data
    if (!bookingData.customerInfo.name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Save to database
    const booking = await database.bookings.create(bookingData);

    // Send confirmation email
    await sendEmail({
        to: bookingData.customerInfo.email,
        subject: 'Booking Confirmation - Hands by Haylee',
        body: `Thank you for booking! Your appointment is on ${bookingData.customerInfo.appointmentDate}...`
    });

    // Notify yourself
    await sendEmail({
        to: 'haylee@yourwebsite.com',
        subject: 'New Booking Received!',
        body: `New appointment: ${bookingData.customerInfo.name}...`
    });

    // Return success
    res.json({
        success: true,
        bookingId: booking.id,
        message: 'Booking confirmed!'
    });
});
```

### 2. Validate All Data
Never trust client-side validation! Always check:
- Required fields are present
- Email format is valid
- Phone number is reasonable
- Date is in the future
- Time is within business hours
- No SQL injection attempts
- No XSS attempts

### 3. Store in Database
Create a database table/collection with fields:
```
bookings
├── id (auto-generated)
├── nail_length
├── tier
├── design_type
├── booking_type
├── customer_name
├── customer_email
├── customer_phone
├── appointment_date
├── appointment_time
├── shipping_address (if applicable)
├── nail_sizes (if applicable)
├── notes
├── status (pending/confirmed/completed/cancelled)
├── created_at
└── updated_at
```

### 4. Send Confirmation Emails
- Email to customer confirming their booking
- Email to you with new booking details
- Include calendar invite (ICS file)

### 5. Return Response
```json
{
    "success": true,
    "bookingId": "BK123456",
    "message": "Booking confirmed! Check your email for details.",
    "confirmationEmail": "jane@example.com"
}
```

---

## Handling Availability Checking

### Basic Version (Simpler)
Don't check availability in real-time. Just:
1. Accept all bookings as "pending"
2. Manually review and confirm
3. Contact customer if time slot is unavailable

### Advanced Version (Better UX)
Implement real-time availability checking:

```javascript
// In script.js, uncomment this function:
async function checkAvailability(date, time) {
    try {
        const response = await fetch(`${CONFIG.api.checkAvailability}?date=${date}&time=${time}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Error checking availability:', error);
        return false;
    }
}
```

Then use it before showing time slots:
```javascript
const timeSlots = generateTimeSlots(date);
const availableSlots = [];

for (const slot of timeSlots) {
    const isAvailable = await checkAvailability(date, slot);
    if (isAvailable) {
        availableSlots.push(slot);
    }
}

// Show only available slots
```

---

## Security Checklist

When connecting to a backend, ensure:

### HTTPS
- [ ] Website is served over HTTPS (not HTTP)
- [ ] SSL certificate is valid
- [ ] All API calls use HTTPS

### CORS (Cross-Origin Resource Sharing)
- [ ] Backend allows requests from your domain
- [ ] CORS headers are properly configured

```javascript
// Example backend CORS setup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://yourwebsite.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

### Rate Limiting
- [ ] Limit form submissions (e.g., 5 per hour per IP)
- [ ] Prevent spam/abuse
- [ ] Implement CAPTCHA if needed

### Data Validation
- [ ] Validate all data on server, not just client
- [ ] Sanitize inputs to prevent SQL injection
- [ ] Escape HTML to prevent XSS attacks
- [ ] Check file uploads if you add photo upload feature

### Authentication (if needed)
- [ ] If adding customer accounts, use proper authentication
- [ ] Use bcrypt for password hashing
- [ ] Implement CSRF protection
- [ ] Use secure session management

---

## Email Integration

### Option 1: SendGrid
**Cost:** Free up to 100 emails/day
**Setup:** 15 minutes

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

const msg = {
    to: 'customer@example.com',
    from: 'bookings@handsbyhaylee.com',
    subject: 'Appointment Confirmation',
    html: '<strong>Thank you for booking!</strong>'
};

sgMail.send(msg);
```

### Option 2: Mailgun
**Cost:** Free up to 5,000 emails/month
**Similar to SendGrid**

### Option 3: Gmail SMTP
**Cost:** Free (use your Gmail)
**Limit:** 500 emails/day

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourgmail@gmail.com',
        pass: 'your-app-password'
    }
});

transporter.sendMail({
    from: 'yourgmail@gmail.com',
    to: 'customer@example.com',
    subject: 'Booking Confirmed',
    html: '<h1>Thank you!</h1>'
});
```

---

## Payment Integration (Optional)

If you want to collect deposits/payments at booking:

### Stripe
**Best for:** Online payments
**Cost:** 2.9% + $0.30 per transaction

```javascript
// Add to booking flow
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000, // $50.00 in cents
    currency: 'usd',
    description: 'Tier 3 Nail Appointment - Jane Doe'
});

// Return client_secret to frontend
res.json({ clientSecret: paymentIntent.client_secret });
```

### Square
**Best for:** In-person + online
**Cost:** 2.9% + $0.30 online, 2.6% + $0.10 in-person

Square integrates well with Square Appointments.

### PayPal
**Best for:** Customers who prefer PayPal
**Cost:** 2.9% + $0.30 per transaction

---

## Testing Your API

### Use Postman
1. Download Postman (free)
2. Create a new POST request
3. URL: `https://yourapi.com/bookings/in-person`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
    "nailLength": "medium",
    "tier": "3",
    "bookingType": "in-person",
    "customerInfo": {
        "name": "Test User",
        "email": "test@test.com",
        "phone": "5551234567",
        "appointmentDate": "2026-01-15",
        "appointmentTime": "14:00"
    }
}
```
6. Click Send
7. Should get success response

### Test from Browser Console
On your website:
1. Press F12
2. Go to Console tab
3. Paste this test code:
```javascript
fetch('https://yourapi.com/bookings/in-person', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nailLength: 'medium',
        tier: '3',
        bookingType: 'in-person',
        customerInfo: {
            name: 'Console Test',
            email: 'test@test.com',
            phone: '5551234567',
            appointmentDate: '2026-01-15',
            appointmentTime: '14:00'
        }
    })
})
.then(r => r.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

---

## Common API Errors & Solutions

### Error: CORS blocked
**Message:** "Access to fetch has been blocked by CORS policy"
**Fix:** Enable CORS on your backend

### Error: 404 Not Found
**Message:** "404 Not Found"
**Fix:** Check API URL is correct, endpoint exists

### Error: 500 Internal Server Error
**Message:** "500 Internal Server Error"
**Fix:** Check backend logs, fix server-side error

### Error: Network request failed
**Message:** "Failed to fetch" or "Network error"
**Fix:** Check internet connection, API is online

### Error: Unauthorized
**Message:** "401 Unauthorized"
**Fix:** Add authentication headers if required

---

## Deployment Checklist

Before launching with backend:

### Backend
- [ ] API endpoints are live and accessible
- [ ] HTTPS is enabled (SSL certificate)
- [ ] CORS is configured correctly
- [ ] Database is set up and accessible
- [ ] Email sending works
- [ ] Error logging is set up
- [ ] Backups are configured

### Frontend
- [ ] CONFIG object updated with real API URLs
- [ ] API code is uncommented and active
- [ ] Tested on production domain
- [ ] Error handling works
- [ ] Success messages are correct

### Testing
- [ ] Test booking on production site
- [ ] Verify data arrives in database
- [ ] Check confirmation email is sent
- [ ] Test error scenarios
- [ ] Test from different devices

### Monitoring
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Monitor API response times
- [ ] Track successful vs failed bookings
- [ ] Set up alerts for errors

---

## Budget Estimates

### DIY Route (No-Code)
- **Formspree/Basin:** Free - $10/month
- **Calendly:** Free - $15/month
- **Acuity:** $16 - $50/month
- **Total:** $0 - $50/month

### E-Commerce Route
- **Shopify + Booking App:** $49 - $80/month
- **Square Appointments:** Free - $50/month
- **Total:** $0 - $80/month

### Custom Backend Route
- **Hosting (Heroku/DigitalOcean):** $5 - $15/month
- **Database (MongoDB Atlas):** Free - $10/month
- **Email (SendGrid):** Free - $20/month
- **Developer:** $500 - $2,000 (one-time)
- **Total:** $10 - $45/month + $500-2000 setup

---

## Recommendation

### For Getting Started Quickly:
**Use Formspree or Calendly**
- 5-10 minute setup
- No coding required
- Start accepting bookings today
- Upgrade later when needed

### For Professional Setup:
**Use Square Appointments or Shopify**
- Professional features
- Payment processing
- Client management
- Good for growing business

### For Full Control:
**Build Custom Backend**
- Hire developer
- Exactly what you need
- Scalable
- Most expensive initially

---

## Need Help?

When hiring a developer for API integration, show them:
1. This guide
2. The `script.js` file
3. Your chosen backend platform

Tell them: "I need to connect my Hands by Haylee booking form to [platform]. All the frontend code is ready - just need the backend API."

---

**Good luck with your booking system!**
**- Made for Hands by Haylee**
