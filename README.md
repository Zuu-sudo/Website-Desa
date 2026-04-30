# Kureksari Blacksmith Website

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

---

## 📖 About

**Kureksari Blacksmith** is a professional landing page website for a traditional blacksmith business in Kureksari Village, Sidoarjo, East Java, Indonesia. With over 25 years of experience, the business specializes in industrial spareparts, custom ironwork, and traditional tools.

This website serves as a digital storefront to showcase products, display customer reviews, and facilitate direct WhatsApp communication for orders and inquiries.

> **Live Demo:** [kureksari-blacksmith.vercel.app](https://kureksari-blacksmith.vercel.app)

---

## ✨ Features

### Core Features
- **Responsive Landing Page** - Optimized for all devices (mobile, tablet, desktop)
- **Product Showcase** - Visual gallery with hover effects and WhatsApp CTA
- **Customer Reviews** - Dynamic review system with 520+ generated testimonials
- **WhatsApp Integration** - One-click direct messaging with pre-filled message
- **Contact Information** - Complete business info, hours, and location

### Technical Features
- **SEO Optimized** - Meta tags, Open Graph, Twitter cards, JSON-LD structured data
- **Security Headers** - CSP, X-Frame-Options, HSTS, XSS protection via Vercel config
- **Performance Optimized** - Lazy loading, optimized assets, 60fps animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **Smooth Animations** - Framer Motion transitions with staggered reveals

### Design
- **Copper & Steel Color Palette** - Modern industrial aesthetic
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **Framer Motion** - Professional animations and micro-interactions
- **Outfit Font** - Modern typography from Google Fonts

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2.5 |
| **Build Tool** | Vite 8.0.10 |
| **Styling** | Tailwind CSS 4.2.4 |
| **Animation** | Framer Motion 12.38.0 |
| **Icons** | Lucide React 1.11.0 |
| **Hosting** | Vercel |
| **Linting** | ESLint 10.2.1 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Zuu-sudo/Website-Desa.git

# Navigate to project directory
cd Website-Desa

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## 📁 Project Structure

```
besi-kureksari-clean/
├── public/
│   ├── robots.txt          # SEO crawler instructions
│   └── sitemap.xml          # SEO sitemap
├── src/
│   ├── components/
│   │   ├── About.jsx        # About section
│   │   ├── Contact.jsx       # Contact & WhatsApp section
│   │   ├── Footer.jsx        # Footer
│   │   ├── Hero.jsx          # Hero section
│   │   ├── Icons.jsx         # Shared SVG icons
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Products.jsx       # Product gallery
│   │   ├── Reviews.jsx       # Reviews & testimonials
│   │   └── Ticker.jsx        # Marquee ticker
│   ├── data/
│   │   ├── content.js       # Product & business data
│   │   └── reviews.js        # Review generator (520 reviews)
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles & Tailwind
│   └── main.jsx              # Entry point
├── index.html                # HTML template with SEO
├── vercel.json               # Vercel configuration & security headers
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js         # ESLint rules
└── README.md                 # This file
```

---

## 🔒 Security

Security headers are configured via `vercel.json`:

| Header | Protection |
|--------|------------|
| `Content-Security-Policy` | XSS and injection attack prevention |
| `X-Frame-Options: DENY` | Clickjacking prevention |
| `X-Content-Type-Options` | MIME sniffing prevention |
| `Strict-Transport-Security` | Force HTTPS (HSTS) |
| `X-XSS-Protection` | Browser XSS filtering |
| `Referrer-Policy` | Prevent referrer leaks |
| `Permissions-Policy` | Disable unused browser APIs |

---

## 🔍 SEO

### Implemented SEO Elements

- **Meta Tags** - Title, description, keywords, canonical URL
- **Open Graph** - Facebook, LinkedIn social preview
- **Twitter Cards** - Twitter social preview
- **JSON-LD Structured Data**
  - LocalBusiness schema with geo coordinates
  - Organization schema with contact info
  - Opening hours specification
- **Sitemap** - `public/sitemap.xml`
- **Robots.txt** - `public/robots.txt`
- **Geo Tags** - Regional targeting for local SEO

### Search Console Setup

1. Login to [Google Search Console](https://search.google.com/search-console)
2. Add property (verify ownership)
3. Submit sitemap: `https://kureksari-blacksmith.vercel.app/sitemap.xml`
4. Monitor indexing status

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Vercel auto-detects Vite framework
3. Deploys with security headers automatically applied

```bash
# Or deploy via CLI
vercel --prod
```

### Manual Deployment

```bash
# Build first
npm run build

# Deploy 'dist' folder to your hosting provider
```

---

## 📊 Analytics & Monitoring

Recommended tools for production monitoring:

| Tool | Purpose |
|------|---------|
| [Google Analytics](https://analytics.google.com) | Traffic & user behavior |
| [Google Search Console](https://search.google.com/search-console) | SEO performance |
| [Vercel Analytics](https://vercel.com/analytics) | Real-time deployment stats |
| [Bing Webmaster](https://www.bing.com/webmasters) | Bing search indexing |

---

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Copper Primary | `#E8632A` | CTAs, accents, highlights |
| Gold Accent | `#D4AF37` | Headings, badges, stars |
| Rich Black | `#0F0F0F` | Dark backgrounds |
| Charcoal | `#1A1A1A` | Card backgrounds |
| Off-White | `#F5F5F5` | Light backgrounds |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Kureksari Blacksmith**
- Business: Traditional Blacksmith in Kureksari Village, Waru, Sidoarjo, East Java
- Contact: [WhatsApp](https://wa.me/6282132310749)

**Website Development:**
- Repository: [github.com/Zuu-sudo/Website-Desa](https://github.com/Zuu-sudo/Website-Desa)

---

<p align="center">
  <strong>Built with ❤️ for Indonesian traditional craftsmanship</strong>
</p>