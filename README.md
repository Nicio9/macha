# Computer Science Division Website

A modern, responsive website for the Computer Science Division at Stellenbosch University. Built for the Div & Conquer Hackathon 2026 (Due: March 3, 2026 @ 23:59 SAST).

**Live site**: https://nicio9.github.io/macha/

## Overview

This is a static HTML/CSS/JS website covering all 10 required content areas:

1. Department overview & welcome
2. Academic staff & faculty profiles (27 staff members)
3. Professor & researcher publications / research output
4. Undergraduate & postgraduate programme information
5. Course catalogue / module listings per year of study (20 courses)
6. Research groups, labs, and centres of excellence (8 groups)
7. News, announcements, and press releases
8. Events & seminars calendar
9. Student resources — FAQs, forms, useful links
10. Contact information, location, and directions

## Local Development

```bash
# Start a local server (Python 3)
python3 -m http.server 8000 --directory public
# Then open http://localhost:8000
```

> Note: because pages use `<base href="/macha/">`, you may need to browse to
> `http://localhost:8000/` (root) and navigate from there. Alternatively use a
> tool like `npx serve public` which handles this transparently.

## Deployment

The site is deployed via **GitHub Pages** from the `master` branch, `/public` folder.

To redeploy after changes:

```bash
git add .
git commit -m "your message"
git push origin master
```

GitHub Pages settings: repo → Settings → Pages → Branch: `master`, Folder: `/public`.

## Project Structure

```
macha/
├── public/                  # All site files (served directly)
│   ├── index.html           # Home page
│   ├── programmes.html      # Academic programmes
│   ├── courses.html         # Course catalogue
│   ├── staff.html           # Staff directory
│   ├── research.html        # Research groups
│   ├── news.html            # News & announcements
│   ├── events.html          # Events & seminars calendar
│   ├── resources.html       # Student resources & FAQs
│   ├── contact.html         # Contact & location
│   ├── favicon.svg          # Site favicon
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   └── shared.js        # Header injection, dark mode, nav dropdowns
│   ├── images/              # Staff photos, SVG illustrations
│   └── courses/             # 20 individual course pages (cs114.html, etc.)
├── package.json
└── README.md
```

## Features

- **Stellenbosch branding**: official maroon (#61223B), Raleway typography
- **Dark mode**: default dark theme with toggle; smooth view-transition animation
- **Responsive**: mobile-first CSS Grid & Flexbox; hamburger nav on small screens
- **Click-driven dropdowns**: Academics and Latest nav menus
- **Events calendar**: filterable by event type
- **News carousel**: auto-scrolling with 5 illustrated cards
- **Zero build step**: pure HTML/CSS/JS, no framework, no bundler
- **SEO**: `<meta name="description">` and favicon on every page

## Staff Directory (27 members)

- Professors (5)
- Associate & Senior Lecturers (3)
- Lecturers (3)
- Junior & Research Staff (2)
- Extraordinary & Visiting Academics (9)
- Administrative Staff (3)
- Additional staff (2)

## Research Groups (8 areas)

1. Theory and Applications of Automata and Grammars
2. Software Engineering and Verification
3. Machine Learning and Artificial Intelligence
4. Telkom-Siemens Centre of Excellence in ATM/Broadband Networks
5. Natural Language Processing and Semantic Computing
6. Computer Vision and Pattern Recognition
7. Cognitive Robotics and Knowledge Representation
8. Programming Languages and Software Quality

## Courses (20)

| Year | Courses |
|------|---------|
| 1st  | CS114, CS144 |
| 2nd  | CS214, CS244, CSE214, SC272 |
| 3rd  | CS313, CS314, CS315, CS343, CS344, CS345, SC372 |
| 4th / Honours | CS411, CS412, CS441, CS471, CS491, CS495, E414 |

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Contact

Computer Science Division, Stellenbosch University
Phone: +27 21 808 4232
Email: secretary@cs.sun.ac.za

---

Built for Div & Conquer Hackathon 2026 — submission deadline 3 March 2026 @ 23:59 SAST
