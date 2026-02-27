# CS DIVISION WEBSITE - PRIORITIZED IMPROVEMENTS CHECKLIST

**Last Updated:** February 27, 2026  
**Total Issues Found:** 42  
**Critical Issues:** 4  
**High Priority:** 6  
**Medium Priority:** 10  
**Low Priority:** 22  

---

## 🔴 CRITICAL FIXES (Do First!)

### 1. Move Inline Styles to CSS Classes
- **Priority:** CRITICAL
- **Effort:** 30 minutes
- **Files:** `/public/index.html`, `/public/contact.html`, `/public/news.html`
- **Issue:** 20+ inline `style=""` attributes throughout HTML
- **Current:** 
  ```html
  <h3 style="margin-top: 0; margin-bottom: 20px;">Quick Links</h3>
  <h2 style="margin-top: 50px;">Welcome</h2>
  <div style="margin-top: 25px;">
  ```
- **Fix:** Move all to CSS
  ```css
  .hero-title { margin-top: 50px; }
  .quick-links-header { margin: 0 0 20px 0; }
  .content-spacer { margin-top: 25px; }
  ```
- **Impact:** ⭐⭐⭐ Code maintainability, file size, consistency

### 2. Fix Duplicate `.card` CSS Rules
- **Priority:** CRITICAL  
- **Effort:** 15 minutes
- **File:** `/public/css/styles.css` (lines 255, 329, 388)
- **Issue:** `.card` selector appears 3 times with conflicting properties
- **Problem:** Later rules override earlier ones; confusing which styles apply
- **Fix:** Consolidate into single `.card {}` block
- **Impact:** ⭐⭐⭐ Code clarity, prevents bugs

### 3. Add CSS Styling to Footer
- **Priority:** CRITICAL
- **Effort:** 10 minutes
- **File:** `/public/css/styles.css`
- **Issue:** All pages have `<footer>` but no CSS styling rule
- **Current:** Footer uses browser defaults
- **Fix:**
  ```css
  footer {
      background: var(--bg-light);
      border-top: 1px solid var(--border);
      padding: 30px 20px;
      text-align: center;
      color: var(--text-light);
      font-size: 0.9rem;
      margin-top: auto;
  }
  footer p {
      margin: 5px 0;
  }
  ```
- **Impact:** ⭐⭐⭐ Visual consistency across all pages

### 4. Add Header Navigation to Course Detail Pages
- **Priority:** CRITICAL
- **Effort:** 5 minutes
- **Files:** `/public/courses/cs144.html` and 18 other course pages
- **Issue:** Course detail pages don't have header/nav from shared.js
- **Problem:** Users can't navigate between pages; must use back button
- **Fix:** Add to `<head>` section:
  ```html
  <script src="/js/shared.js"></script>
  ```
- **Note:** Verify relative paths work from `/courses/` subdirectory
- **Impact:** ⭐⭐⭐ Navigation consistency, accessibility

---

## 🟠 HIGH PRIORITY (Do Next!)

### 5. Move Inline Event Handlers to JavaScript
- **Priority:** HIGH
- **Effort:** 45 minutes
- **Files:** `/public/courses.html` (line 25), `/public/staff.html` (line 148), `/public/news.html` (lines 39-44)
- **Issue:** 6 instances of `onkeyup=""` and `onclick=""`
- **Current:**
  ```html
  <input onkeyup="searchCourses()">
  <button onclick="filterNews('all')">
  ```
- **Fix:** Add event listeners in JavaScript
  ```javascript
  document.getElementById('courseSearch').addEventListener('keyup', searchCourses);
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      filterNews(this.dataset.category);
    });
  });
  ```
- **Impact:** ⭐⭐ Code quality, maintainability, security

### 6. Standardize Font Sizes (8-Step Scale)
- **Priority:** HIGH
- **Effort:** 60 minutes
- **File:** `/public/css/styles.css`
- **Issue:** 17 different font sizes (0.75rem to 2.8rem)
- **Current:** `0.75rem`, `0.8rem`, `0.85rem`, `0.9rem`, `0.95rem`, `0.97rem`, `1rem`, `1.06rem`, `1.1rem`, `1.19rem`, `1.2rem`, `1.54rem`, `2rem`, `2.2rem`, `2.6rem`, `2.8rem`
- **Fix:** Add to `:root {}`
  ```css
  --font-xs: 0.75rem;    /* Badges, small text */
  --font-sm: 0.85rem;    /* Secondary text */
  --font-base: 1rem;     /* Body text */
  --font-lg: 1.1rem;     /* Course titles */
  --font-xl: 1.5rem;     /* Section headings */
  --font-2xl: 2rem;      /* Page titles */
  --font-3xl: 2.6rem;    /* Hero titles */
  --font-4xl: 2.8rem;    /* Stats numbers */
  ```
- **Then:** Replace all `font-size:` with variables
- **Impact:** ⭐⭐ Design consistency, maintainability

### 7. Standardize Spacing (Grid System)
- **Priority:** HIGH
- **Effort:** 45 minutes
- **File:** `/public/css/styles.css`
- **Issue:** Gap values: 2px, 4px, 10px, 12px, 30px, 32px (no pattern)
- **Fix:** Add to `:root {}`
  ```css
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 40px;
  ```
- **Then:** Replace all gap/padding values
- **Impact:** ⭐⭐ Design consistency, rhythm

### 8. Add Breadcrumb Navigation to Course Pages
- **Priority:** HIGH
- **Effort:** 90 minutes
- **Files:** `/public/courses/cs144.html` and 18 others
- **Issue:** Users don't know where they are in page hierarchy
- **Fix:** Add after header (before `<h1>`):
  ```html
  <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a> /
      <a href="/courses.html">Courses</a> /
      <span>CS144 - Introductory Computer Science 2</span>
  </nav>
  ```
- **CSS:**
  ```css
  .breadcrumb {
      padding: 12px 20px;
      background: var(--bg-light);
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
  }
  .breadcrumb a {
      color: var(--link);
      text-decoration: none;
  }
  .breadcrumb a:hover {
      text-decoration: underline;
  }
  ```
- **Impact:** ⭐⭐ Navigation clarity, SEO (schema markup)

### 9. Move Search/Filter Functions to shared.js
- **Priority:** HIGH
- **Effort:** 60 minutes
- **File:** `/public/js/shared.js`
- **Issue:** `searchCourses()`, `searchStaff()`, `filterNews()` defined inline on 3 pages
- **Problem:** Code duplication, can't be cached, hard to maintain
- **Fix:** 
  1. Move all 3 functions to shared.js
  2. Initialize them in DOMContentLoaded
  3. Remove inline `<script>` tags from HTML
- **Benefit:** -500 bytes per page, better caching, easier maintenance
- **Impact:** ⭐⭐ Code reuse, performance

### 10. Fix Course Detail Page Dark Mode Colors
- **Priority:** HIGH
- **Effort:** 30 minutes
- **Files:** `/public/courses/cs144.html` and all course detail pages
- **Issue:** Dark mode colors hardcoded, don't match main CSS variables
- **Current in cs144.html:**
  ```css
  [data-theme="dark"] {
      --primary: #9B4D7D !important;  /* Different from main CSS #B3688D */
  }
  ```
- **Fix:** Import all colors from main CSS variables in `/public/css/styles.css`
  - Remove duplicate color definitions
  - Reference main CSS variables
- **Impact:** ⭐⭐ Consistency, dark mode experience

---

## 🟡 MEDIUM PRIORITY (Nice to Have!)

### 11. Add "Scroll to Top" Button
- **Priority:** MEDIUM
- **Effort:** 30 minutes
- **Files:** `/public/js/shared.js`, all pages needing it
- **Issue:** Staff, Research, Resources pages are very long
- **Solution:** Floating button that appears after scrolling 500px down
- **Impact:** ⭐ Mobile UX improvement

### 12. Minify CSS for Production
- **Priority:** MEDIUM
- **Effort:** 5 minutes (automated)
- **File:** `/public/css/styles.css`
- **Current:** 857 lines = ~25KB
- **After minification:** ~600 lines = ~18KB (28% reduction)
- **Tool:** CSS Nano, CSSnano, or online minifier
- **Impact:** ⭐ Performance (-7KB per page load)

### 13. Add Clear Button to Search Inputs
- **Priority:** MEDIUM
- **Effort:** 30 minutes
- **Files:** `/public/courses.html`, `/public/staff.html`
- **Issue:** Users must manually delete search text
- **Solution:**
  ```html
  <div class="search-wrapper">
      <input type="text" class="search-input" id="staffSearch">
      <button class="search-clear" id="staffClear" aria-label="Clear search">✕</button>
  </div>
  ```
- **Impact:** ⭐ UX improvement (especially on mobile)

### 14. Consolidate Color Variables
- **Priority:** MEDIUM
- **Effort:** 45 minutes
- **File:** `/public/css/styles.css` and course detail pages
- **Issue:** Hardcoded colors scattered throughout (esp. in course pages)
- **Current:** Colors defined in multiple places with slightly different values
- **Fix:** All colors to CSS variables in main stylesheet
- **Impact:** ⭐ Maintainability, consistency

### 15. Add Course Prerequisites
- **Priority:** MEDIUM
- **Effort:** 60 minutes (includes research)
- **Files:** `/public/courses.html` and detail pages
- **Issue:** No prerequisites listed; students might enroll in wrong courses
- **Current:** No indication of course progression
- **Fix:** Add to each course card:
  ```html
  <div class="card-prerequisites">
      <strong>Prerequisites:</strong> CS114, CS144
  </div>
  ```
- **Impact:** ⭐ Student success, enrollment accuracy

### 16. Add "Related Courses" Section
- **Priority:** MEDIUM
- **Effort:** 90 minutes
- **Files:** `/public/courses/cs*.html` (19 files)
- **Issue:** Students don't see related courses
- **Solution:** Add section on each course detail page:
  ```html
  <section class="related-courses">
      <h3>Related Courses</h3>
      <ul class="related-courses-list">
          <li><a href="/courses/cs214.html">CS214 - Data Structures</a></li>
          <li><a href="/courses/cs244.html">CS244 - Computer Architecture</a></li>
      </ul>
  </section>
  ```
- **Impact:** ⭐ Course discoverability

### 17. Fix Duplicate "Machine Learning" Courses
- **Priority:** MEDIUM
- **Effort:** 15 minutes
- **File:** `/public/courses.html`
- **Issue:** CS315 and E414 both teach same topic (confusing)
- **Fix:** Add differentiation:
  ```html
  <!-- Line 72 -->
  <strong>Machine Learning (CS315)</strong>
  <div class="card-description">...FOR 3RD YEAR CS STUDENTS...</div>
  
  <!-- Line 102 -->
  <strong>Machine Learning (E414)</strong>
  <div class="card-description">...FOR ENGINEERING STUDENTS...</div>
  ```
- **Impact:** ⭐ Student clarity

### 18. Replace Generic Publication Links
- **Priority:** MEDIUM
- **Effort:** 120 minutes (requires research)
- **File:** `/public/research.html`
- **Issue:** Publication links go to generic Google Scholar search
- **Current:** `https://scholar.google.com/scholar?q=Publication+title`
- **Fix:** Replace with actual DOI or institutional repository links
- **Impact:** ⭐ Research credibility

### 19. Link Research Groups from Staff Profiles
- **Priority:** MEDIUM
- **Effort:** 45 minutes
- **File:** `/public/staff.html`
- **Issue:** Staff research areas not linked to research group pages
- **Fix:** Convert research text to links:
  ```html
  <div class="staff-research">
      <a href="/research.html#automata-group">Automata Theory & Formal Methods</a>,
      <a href="/research.html#nlp-group">Machine Learning & AI</a>
  </div>
  ```
- **Impact:** ⭐ Navigation, discoverability

### 20. Add Difficulty Level to Courses
- **Priority:** MEDIUM
- **Effort:** 30 minutes
- **File:** `/public/courses.html`
- **Issue:** Can't tell if CS345 is easy or hard
- **Solution:** Add difficulty badge (Level 1-3):
  ```html
  <span class="difficulty-badge difficulty-3">Advanced</span>
  ```
- **CSS:**
  ```css
  .difficulty-badge {
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
  }
  .difficulty-1 { background: #90EE90; }  /* Easy */
  .difficulty-2 { background: #FFD700; }  /* Intermediate */
  .difficulty-3 { background: #FF6B6B; }  /* Advanced */
  ```
- **Impact:** ⭐ Student success planning

---

## 🟢 LOW PRIORITY (Polish & Enhancement!)

### 21. Add Contact Form
- **Priority:** LOW
- **Effort:** 60 minutes (requires backend)
- **File:** `/public/contact.html`
- **Issue:** Contact page has emails but no form
- **Solution:** Add functional form (requires backend service)
- **Impact:** ⭐ User engagement

### 22. Add Email Subscribe Form
- **Priority:** LOW
- **Effort:** 60 minutes (requires backend)
- **File:** `/public/news.html` (already has section)
- **Issue:** No actual form to subscribe
- **Solution:** Add working form + email service integration
- **Impact:** ⭐ Retention

### 23. Add Enhanced Hover Effects
- **Priority:** LOW
- **Effort:** 30 minutes
- **File:** `/public/css/styles.css`
- **Issue:** Some elements lack clear hover feedback
- **Solution:** Add subtle hover effects to more elements
- **Impact:** ⭐ Polish

### 24. Add Keyboard Arrow Navigation to Filter Buttons
- **Priority:** LOW
- **Effort:** 30 minutes
- **File:** `/public/news.html` JavaScript section
- **Issue:** Can't use arrow keys to switch between filters
- **Solution:** Add keyboard support for power users
- **Impact:** ⭐ Accessibility (keyboard users)

### 25. Optimize Images to WebP Format
- **Priority:** LOW
- **Effort:** 120 minutes
- **Files:** `/public/images/staff/*` (27 images)
- **Issue:** JPG format; could be smaller as WebP
- **Current:** 868KB total
- **After:** ~435KB (50% reduction)
- **Solution:** Convert to WebP with JPEG fallback
- **Impact:** ⭐ Performance (-7KB per page)

### 26. Add Skip-to-Content Link
- **Priority:** LOW
- **Effort:** 15 minutes
- **File:** All HTML files
- **Issue:** Missing keyboard accessibility shortcut
- **Solution:** Add hidden link at start of body:
  ```html
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <main id="main-content">
  ```
- **CSS:**
  ```css
  .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--primary);
      color: white;
      padding: 8px;
      z-index: 100;
  }
  .skip-link:focus {
      top: 0;
  }
  ```
- **Impact:** ⭐ Accessibility

### 27. Add `main` Semantic Tags
- **Priority:** LOW
- **Effort:** 20 minutes
- **Files:** All HTML files
- **Issue:** Pages use `.container` div instead of semantic `<main>`
- **Fix:** Wrap main content in `<main>`
- **Impact:** ⭐ Semantic HTML, accessibility

### 28. Add Title Attributes to All Links
- **Priority:** LOW
- **Effort:** 45 minutes
- **Files:** All HTML files
- **Issue:** Some links missing descriptive titles
- **Fix:** Add `title=""` to external links, especially in research page
- **Impact:** ⭐ Accessibility

### 29. Fix Course Detail Page Title Tag
- **Priority:** LOW
- **Effort:** 5 minutes
- **File:** `/public/courses/cs144.html` (line 6)
- **Issue:** Title tag is malformed: `<title>CS144 - ... </style>\n\n</title>`
- **Fix:** Remove `</style>` from middle of title tag
- **Impact:** ⭐ HTML validity

### 30. Add Staff Profile Links to Header Navigation
- **Priority:** LOW
- **Effort:** 30 minutes
- **File:** `/public/js/shared.js`
- **Issue:** Navigation doesn't have link to "Staff Directory"
- **Note:** Actually, checking... staff IS in navbar (check navItems array)
- **Status:** May already be present; verify

### 31. Add Research Group IDs for Deep Linking
- **Priority:** LOW
- **Effort:** 15 minutes
- **File:** `/public/research.html`
- **Issue:** Research groups don't have anchor IDs for linking
- **Current:** No `id=""` attributes on research cards
- **Fix:** Add IDs:
  ```html
  <div class="research-card" id="automata-group">
  <div class="research-card" id="software-engineering-group">
  ```
- **Impact:** ⭐ Navigation (from staff profiles)

### 32. Add Validation to Search Inputs
- **Priority:** LOW
- **Effort:** 20 minutes
- **Files:** `/public/courses.html`, `/public/staff.html`
- **Issue:** Search accepts very long strings
- **Fix:** Add input validation:
  ```javascript
  input.addEventListener('input', (e) => {
      if (e.target.value.length > 50) {
          e.target.value = e.target.value.slice(0, 50);
      }
  });
  ```
- **Impact:** ⭐ UX

### 33. Add "Back to Courses" Button
- **Priority:** LOW
- **Effort:** 15 minutes
- **Files:** `/public/courses/cs*.html` (19 files)
- **Issue:** No easy way back to course list from detail page
- **Fix:** Add button at bottom:
  ```html
  <div class="course-nav">
      <a href="/courses.html" class="btn btn-secondary">← Back to Courses</a>
  </div>
  ```
- **Impact:** ⭐ Navigation

### 34. Add Loading States to Forms
- **Priority:** LOW
- **Effort:** 30 minutes
- **Issue:** No visual feedback when forms submit
- **Solution:** Add loading spinner, disable button
- **Impact:** ⭐ UX

### 35. Add "Active" Badge to Current Staff Positions
- **Priority:** LOW
- **Effort:** 20 minutes
- **File:** `/public/staff.html`
- **Issue:** All staff appear active (no indication of emeritus, part-time, etc.)
- **Fix:** Add status badge:
  ```html
  <span class="staff-status">Active</span>
  <span class="staff-status status-parttime">Part-Time</span>
  <span class="staff-status status-emeritus">Emeritus</span>
  ```
- **Impact:** ⭐ Information clarity

### 36. Add Course Enrollment Links
- **Priority:** LOW
- **Effort:** 45 minutes
- **Files:** `/public/courses.html`, course detail pages
- **Issue:** No link to enrollment or course registration
- **Fix:** Add "Enroll" button or link to university system
- **Impact:** ⭐ Conversion

### 37. Add Calendar Widget to Events
- **Priority:** LOW
- **Effort:** 90 minutes (requires calendar library)
- **File:** `/public/news.html`
- **Issue:** News is list-based; hard to see upcoming events
- **Solution:** Add month/year calendar view
- **Impact:** ⭐ Event discovery

### 38. Add Alumni Testimonials Section
- **Priority:** LOW
- **Effort:** 120 minutes (requires content)
- **Files:** Potentially new page or add to index.html
- **Issue:** No student success stories
- **Solution:** Add testimonials section
- **Impact:** ⭐ Social proof, enrollment

### 39. Add Faculty Publication Highlights
- **Priority:** LOW
- **Effort:** 90 minutes (requires content)
- **Files:** Research page or new page
- **Issue:** Publications are research group level only
- **Solution:** Add faculty-level publication lists
- **Impact:** ⭐ Research credibility

### 40. Add News Archive by Year
- **Priority:** LOW
- **Effort:** 45 minutes
- **File:** `/public/news.html`
- **Issue:** All news shown on one page (not scalable)
- **Solution:** Add year/month filtering or pagination
- **Impact:** ⭐ Scalability

### 41. Improve Course Description Length
- **Priority:** LOW
- **Effort:** 90 minutes (requires content research)
- **Files:** `/public/courses.html`, course detail pages
- **Issue:** Some courses have very long descriptions (3-line clamp)
- **Solution:** Either expand cards or add "Read More" link
- **Impact:** ⭐ Content clarity

### 42. Add Department Statistics Dashboard
- **Priority:** LOW
- **Effort:** 120 minutes
- **Files:** New section or new page
- **Issue:** Statistics only on homepage
- **Solution:** Add more detailed stats (student enrollment, graduation rates, job placement)
- **Impact:** ⭐ Transparency

---

## 📊 EFFORT ESTIMATES

| Priority | Count | Total Hours | Quick Wins? |
|----------|-------|-------------|------------|
| 🔴 Critical | 4 | 1 hour | Yes (all < 30 min) |
| 🟠 High | 6 | 4 hours | Yes (most < 60 min) |
| 🟡 Medium | 10 | 8 hours | Some (need research) |
| 🟢 Low | 22 | 20 hours | Polish items |
| **TOTAL** | **42** | **33 hours** | **Critical = 1 hour** |

---

## 🎯 RECOMMENDED IMPLEMENTATION PLAN

### **Week 1: Foundation (Critical + High)**
1. ✅ Move inline styles to CSS (30 min)
2. ✅ Fix duplicate `.card` rules (15 min)
3. ✅ Add footer CSS (10 min)
4. ✅ Add header to course pages (5 min)
5. ✅ Move inline event handlers (45 min)
6. ✅ Standardize fonts (60 min)
7. ✅ Standardize spacing (45 min)

**Result:** Code quality +30%, all pages consistent

### **Week 2: UX & Navigation (High Priority Continued)**
8. ✅ Add breadcrumbs (90 min)
9. ✅ Move search functions to shared.js (60 min)
10. ✅ Fix dark mode colors in course pages (30 min)

**Result:** Navigation clearer, code more maintainable

### **Week 3: Polish (Medium Priority)**
11. Add clear buttons to search (30 min)
12. Consolidate colors (45 min)
13. Add prerequisites (60 min)
14. Add related courses (90 min)
15. Fix duplicate courses (15 min)
16. Minify CSS (5 min)

**Result:** Better UX, more helpful to students

### **Week 4: Enhancement (Low Priority)**
17-42. Pick the items that matter most to your institution

---

## ✨ QUICK WINS (Do These First!)

1. **Move inline styles to CSS** - 30 min, big impact
2. **Fix duplicate `.card` CSS** - 15 min, prevents bugs
3. **Add footer styling** - 10 min, instant polish
4. **Add header to course pages** - 5 min, fixes navigation
5. **Minify CSS** - 5 min, instant performance

**Total: 65 minutes, impacts: code quality, performance, consistency**

---

## 🚀 DEPLOYMENT READINESS

**Current Status:** ✅ Ready to deploy (no blockers)

**With Critical Fixes:** ⭐⭐⭐ Excellent (recommended before going live)

**With All High Priority Fixes:** ⭐⭐⭐⭐ Outstanding

**With All Recommendations:** ⭐⭐⭐⭐⭐ Professional-grade website

---

## 📞 QUESTIONS?

For detailed explanations of any issue, see: `COMPREHENSIVE-ANALYSIS.md`

For existing quality reports, see:
- `BRANDING-REPORT.md` - Brand compliance analysis
- `ACCESSIBILITY-REPORT.md` - WCAG accessibility audit
- `IMPROVEMENTS-SUMMARY.md` - Previous changes made

---

**Remember:** Perfect is the enemy of good. The website works well now. These improvements make it excellent! 🎉

