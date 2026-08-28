# Reiten Drei — Digital Band Gallery & Visual Archive

A modern, cinematic, interactive showcase and digital exhibition for **Reiten Drei**, an Indonesian Surf Rock band from Bekasi.

## 🌊 Core Philosophy: Gallery First, Minimal Text

The website is designed as a **digital band exhibition**:
- **Visual First**: Large photography, artwork, news banners, and live visuals lead the experience.
- **Minimal Initial Text**: Short titles and essential metadata on the surface.
- **Interaction to Discover**: Detailed stories, complete song narratives, embedded Spotify players, live event notes, and member profiles are revealed via immersive modals on click.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Content Management & Replacement Guide

All website content is centralized in `src/data/` and asset folders in `public/images/`. Updating the site does not require changing component internals.

### 1. Add / Edit News & Events
- **Data**: Edit [`src/data/news.ts`](file:///root/app/reitendrei/landing-page/src/data/news.ts)
- **Banner Image**: Place new image (16:9 / 21:9 landscape) into [`public/images/news/`](file:///root/app/reitendrei/landing-page/public/images/news/)

### 2. Update Current Announcement ("NOW")
- **Data**: Edit [`src/data/announcements.ts`](file:///root/app/reitendrei/landing-page/src/data/announcements.ts)

### 3. Add / Edit Music Releases
- **Data**: Edit [`src/data/releases.ts`](file:///root/app/reitendrei/landing-page/src/data/releases.ts)
- **Artwork**: Place 1:1 square artwork into [`public/images/releases/`](file:///root/app/reitendrei/landing-page/public/images/releases/)

### 4. Add / Edit Live Performance Gallery Photos
- **Data**: Edit [`src/data/gallery.ts`](file:///root/app/reitendrei/landing-page/src/data/gallery.ts)
- **Photos**: Place photos (landscape, portrait, or square) into [`public/images/gallery/`](file:///root/app/reitendrei/landing-page/public/images/gallery/)

### 5. Update Band Members
- **Data**: Edit [`src/data/members.ts`](file:///root/app/reitendrei/landing-page/src/data/members.ts)
- **Portraits**: Place 4:5 portrait photos into [`public/images/members/`](file:///root/app/reitendrei/landing-page/public/images/members/)

### 6. Update Contact & Socials
- **Contact Info**: Edit [`src/data/contact.ts`](file:///root/app/reitendrei/landing-page/src/data/contact.ts)
- **Social Links**: Edit [`src/data/socials.ts`](file:///root/app/reitendrei/landing-page/src/data/socials.ts)

---

## 🏛️ Section Hierarchy

```text
01. NEWS / PROGRAM BANNER SLIDER + RIGHT CONNECT & NOW ANNOUNCEMENT
    ↓
02. BAND STORY + RELEASES ARTWORK GALLERY (SPOTIFY ON CLICK)
    ↓
03. LIVE PERFORMANCE GALLERY (LIGHTBOX INSPECTION ON CLICK)
    ↓
04. BAND MEMBERS EDITORIAL SHOWCASE (PROFILE MODAL ON CLICK)
    ↓
05. FINAL HIGH-IMPACT CALL TO ACTION
    ↓
06. CONTACT PERSON & MINIMAL FOOTER
```
