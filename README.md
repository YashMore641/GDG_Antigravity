# Yash Darshan More – Personal Portfolio 🌸⚡
> **Dark Anime / Manga-Inspired Single-Page Portfolio for a Java Backend Developer**

![Theme](https://img.shields.io/badge/Theme-Dark%20Anime%20%2F%20Cyber--Manga-8b5cf6)
![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-ff3d81)
![Responsive](https://img.shields.io/badge/Design-Mobile--First%20%26%20WCAG%20AA-22d3ee)

A production-quality, fast, accessible, single-page portfolio engineered for **Yash Darshan More**, showcasing Java Backend development, Spring Boot, Spring AI, Apache Kafka, JDBC, cloud certifications, and hackathon achievements.

---

## ✨ Features & Highlights

- **Visual Theme:** Midnight Cyber-Manga with custom CSS halftone patterns, speedline overlays, thick manga panel borders, ink drop-shadows, and neon glows (`#8b5cf6`, `#ff3d81`, `#22d3ee`).
- **Original Hero Art:** Vector SVG illustration of an anime backend developer at a multi-monitor workstation with Spring Boot & Kafka terminals, RGB keyboard, and holographic symbols.
- **Interactive Sorting Visualizer Sandbox:** Live embedded algorithm visualizer widget in plain JavaScript inside the *Algorithm Visualizer* card with Bubble Sort, Selection Sort, and Insertion Sort simulations.
- **Falling Sakura Canvas:** Physics-based cherry blossom petals drifting with wind, complete with an **On / Off toggle** and respectful of `prefers-reduced-motion`.
- **Custom Anime Cursor & 3D Tilt:** Reactive glowing cursor with trailing ring (disabled on touch devices) and interactive 3D perspective tilt on hover for project, quest, and achievement cards.
- **RPG Power Meter Skills:** Realistic levels (*Proficient*, *Intermediate*, *Learning*) with pulsating *"Currently Training"* badges for Spring Boot and Spring AI.
- **Vertical Manga Timeline & Quest Log:** Narrative chapter layout for experience entries and quest cards for academic degrees.
- **Instant Mailto Form & One-Click Copy:** Contact form formats and triggers an email draft, plus a 1-click clipboard copy button with feedback toasts.

---

## 📁 Project Structure

```
c:/GDG/
├── index.html                 # Semantic HTML5, SEO meta tags, and structured content
├── css/
│   └── style.css              # Custom CSS design system (variables, animations, responsive)
├── js/
│   └── main.js                # Interactive logic (sakura engine, cursor, tilt, visualizer)
├── resume.pdf                 # Resume linked directly for quick download
├── YashDarshanMoreResume (1).pdf # Original resume document
└── README.md                  # Documentation and deployment guide
```

---

## 🚀 Running Locally

No complicated build systems or dependencies required! You can open the site instantly in any modern browser:

### Option 1: Direct File Open
Double click `index.html` or open it with your browser:
```powershell
Start-Process "c:\GDG\index.html"
```

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 3000
```
Or using Node.js `npx serve`:
```bash
npx -y serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 🛠️ How to Customize

### 1. Replacing Profile Photo
In `index.html`, look for the comment:
```html
<!-- PLACEHOLDER FOR PHOTO: Replace this SVG with your real image when ready -->
```
Replace the embedded `<svg class="avatar-manga-svg">...</svg>` with your photo:
```html
<img src="assets/yash_profile.jpg" alt="Yash Darshan More" class="avatar-manga-svg">
```

### 2. Updating Resume PDF
Place your new resume in the workspace directory named `resume.pdf`. The download buttons in the navbar, hero, and footer are already pre-linked to:
```html
<a href="resume.pdf" download="Yash_Darshan_More_Resume.pdf">Resume</a>
```

### 3. Adding or Editing Projects
In `index.html`, find the `<section id="projects">` block. You can copy any `.project-card` block and customize the tags, title, description, and GitHub repository links.

### 4. Customizing Theme Colors
All colors are centralized in `css/style.css` under `:root`:
```css
:root {
  --bg-midnight: #0b0b14;
  --accent-violet: #8b5cf6;
  --accent-pink: #ff3d81;
  --accent-cyan: #22d3ee;
  --accent-gold: #fbbf24;
}
```

---

## 🌐 Free Deployment Options

### 1. GitHub Pages (Fastest)
1. Push this folder to a GitHub repository (e.g. `https://github.com/YashMore641/yashmore641.github.io`).
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** and choose `main` / `root`.
4. Click **Save**. Your site is live!

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel` or import the repository at [vercel.com](https://vercel.com).
2. Run `vercel` in this directory and follow the 2-step prompt.

### 3. Netlify
1. Drag and drop the `c:\GDG` folder directly onto [Netlify Drop](https://app.netlify.com/drop).
2. Your site is deployed immediately with a custom link and free SSL.

---

## 📜 License
Created with ❤️ by Yash Darshan More © 2026. Free to use and customize.
