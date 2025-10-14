# Product Requirements Document (PRD)

## Project: Empowering the Nation - Skills Development & Training App

### Purpose & Background
Empowering the Nation is a React Native app (with Expo) to help users discover, calculate, and register for practical skills courses offered at three venues in Johannesburg. It provides hands-on training, professional development, and easy access to course and contact information.

### User Journey / How You Got Here
1. **Landing/Home**
    - Users are greeted with an overview and navigation to browse courses, calculate fees, or contact campuses.
    - Main navigation: Home, Courses, Calculator, Contact.
2. **Browse Courses**
    - Users can view Six-Month and Six-Week courses, see details, fees, and durations.
    - Selecting a course shows detailed information, including description, pricing, and what you'll learn.
3. **Fee Calculator**
    - Users can select courses, enter contact details, and instantly view a quote (including discounts for multiple courses and VAT).
    - Quote is not a formal invoice, but a cost estimate.
4. **Contact**
    - Users can view campus locations, business hours, and initiate calls, emails, or map navigation.
    - General inquiries and details for each venue (Sandton, Rosebank, Randburg).

### Functional Requirements
- Course listings (six-month, six-week)
- Course detail view (description, duration, fee)
- Fee calculator (multi-course discounts, VAT, validation)
- Contact information (call, email, map)
- Responsive UI for mobile and web
- Error handling and user feedback (loading, retry, validation)

### Non-Functional Requirements
- Fast, responsive navigation
- Accessible (clear contrast, readable text)
- Secure storage of inquiries and course data
- Integration with Supabase for backend data

### Technologies Used
- React Native + Expo
- Expo Router for navigation
- Supabase for data and authentication
- TypeScript for type safety
- Lucide Icons for UI

### Key Files
- `app/(tabs)/index.tsx`: Home/landing
- `app/(tabs)/courses/`: Course list/detail
- `app/(tabs)/calculator.tsx`: Fee calculator logic
- `app/(tabs)/contact.tsx`: Contact and venues

### Milestones/History
- Database design with Supabase (migrations for courses, inquiries)
- Implementation of main navigation and UI screens
- Addition of fee calculator and discount logic
- Integration of contact and venue info

### Success Criteria
- Users can easily find and calculate course costs
- Users can contact venues directly
- All course and contact info is accurate and up-to-date
- App works on both mobile and web

---

## For full details, see README and source code.