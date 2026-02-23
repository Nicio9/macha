# Computer Science Division Website

A modern, responsive website for the Computer Science Division at Stellenbosch University. Built for the Div & Conquer Hackathon 2026 (Due: March 3, 2026 @ 23:59 SAST).

## Overview

This is a static HTML/CSS website showcasing:
- Department overview and welcome message
- 24 academic staff profiles with research interests
- 8 research groups and laboratories
- Complete course catalogue with 21+ courses
- Undergraduate and postgraduate programme information (BSc, BDatSci, Honours, Masters, PhD)
- News and announcements
- Student resources, FAQs, and support services
- Complete contact information and campus location

## Quick Start

### Local Development
```bash
# Start development server on http://localhost:8000
npm run dev
# or
python3 -m http.server 8000 --directory public
```

### Project Structure
```
macha/
├── public/                  # HTML pages (served directly)
│   ├── index.html          # Home page
│   ├── programmes.html     # Academic programmes
│   ├── courses.html        # Course catalogue
│   ├── staff.html          # Staff directory
│   ├── research.html       # Research groups
│   ├── contact.html        # Contact & location
│   ├── news.html           # News & announcements
│   └── resources.html      # Student resources & FAQs
├── data/                   # Data files
│   └── staff.csv          # Staff directory data
├── package.json            # Project configuration
└── README.md              # This file
```

## Features

### All 10 Required Content Areas
1. ✅ Department overview & welcome
2. ✅ Academic staff & faculty profiles (24 staff)
3. ✅ Publications/research output (8 research groups)
4. ✅ Undergraduate programmes (BSc CS, BDatSci)
5. ✅ Postgraduate programmes (Honours, Masters, PhD)
6. ✅ Course catalogue (21+ courses)
7. ✅ Research groups/labs/centers (8 groups)
8. ✅ News & announcements (10 news items)
9. ✅ Student resources & FAQs
10. ✅ Contact information & location

### Design Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Stellenbosch Branding**: Official colors (#61223B maroon), typography
- **Fast Loading**: Pure HTML/CSS, no dependencies
- **Accessibility**: Semantic HTML, proper contrast ratios
- **SEO Ready**: Proper meta tags and structure

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Pages
```bash
# Create GitHub repository
git add .
git commit -m "Initial commit: Complete CS Division website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cs-division-website.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Source: main branch /public directory
```

### Option 3: Cloudflare Pages
```bash
# Create Cloudflare account
# Connect GitHub repository
# Build command: none (static files)
# Build output directory: public
```

### Option 4: Simple HTTP Server
For development or temporary hosting:
```bash
npm start
# or
python3 -m http.server 8000 --directory public
```

## Content Included

### Staff Directory (24 members)
- Professors (5)
- Associate & Senior Lecturers (3)
- Lecturers (3)
- Junior & Research Staff (2)
- Extraordinary & Visiting Academics (9)
- Administrative Staff (3)

### Research Groups (8 areas)
1. Theory and Applications of Automata and Grammars
2. Software Engineering and Verification
3. Machine Learning and Artificial Intelligence
4. Telkom-Siemens Centre of Excellence in ATM/Broadband Networks
5. Natural Language Processing and Semantic Computing
6. Computer Vision and Pattern Recognition
7. Cognitive Robotics and Knowledge Representation
8. Programming Languages and Software Quality

### Academic Programmes
- **Undergraduate**: BSc CS (3 years) with 5 focal areas, BDatSci (4 years) with 6 focal areas
- **Postgraduate**: Honours (1 year), Masters (2 years), PhD (3+ years)

### Courses
- First Year: CS113, CS114, CS144 (3 courses)
- Second Year: CS214, CS244, SC272, CSE214 (4 courses)
- Third Year: CS313, CS314, CS315, CS343, CS344, CS345, SC372 (7 courses)
- Postgraduate: CS797, CS711-796, CS878, CS978 (10+ modules)

## Technical Details

- **Language**: HTML5, CSS3
- **Styling**: CSS Variables for consistency
- **Responsiveness**: Mobile-first CSS Grid & Flexbox
- **Fonts**: Raleway (Stellenbosch branding)
- **Colors**: Primary #61223B (maroon), supporting colors
- **Performance**: Zero JavaScript dependencies, ~100KB per page

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
ISC

## Contact
Computer Science Division
Stellenbosch University
Phone: +27 21 808 4232
Email: secretary@cs.sun.ac.za

---

Built for Div & Conquer Hackathon 2026
Submission Deadline: March 3, 2026 @ 23:59 SAST
