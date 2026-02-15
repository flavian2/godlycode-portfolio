# 🌟 GODLYCODE Portfolio Website

A stunning, world-class portfolio website built with React, Tailwind CSS, and Framer Motion. This website showcases production-grade projects with beautiful animations, responsive design, and premium aesthetics.

## ✨ Features

- **🎨 Stunning Design**: Dark mode theme with celestial gold (#D4AF37) and electric blue (#00B4D8) accents
- **⚡ Smooth Animations**: Powered by Framer Motion with scroll-triggered reveals, staggered animations, and micro-interactions
- **🤖 AI-Powered Chatbot**: Interactive AI assistant powered by Claude AI or Venice AI - showcases AI integration skills!
- **🌌 Particle Background**: Constellation-like animated particle system
- **🖱️ Custom Cursor**: Magnetic cursor effects on interactive elements (desktop only)
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop screens
- **🚀 Fast Performance**: Built with Vite for blazing-fast development and production builds
- **🎯 SEO Optimized**: Comprehensive meta tags for search engines and social media
- **🗺️ Multi-Page Navigation**: Smooth page transitions with React Router

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Icons** - Icon library

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectMockup.jsx
│   ├── TechStack.jsx
│   ├── Timeline.jsx
│   ├── ContactForm.jsx
│   ├── AIChatbot.jsx          # AI-powered chatbot
│   ├── ParticleBackground.jsx
│   ├── CustomCursor.jsx
│   ├── ScrollReveal.jsx
│   └── LoadingScreen.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── config/              # Configuration files
│   └── chatbot.config.js      # AI chatbot settings
├── services/            # API services
│   └── aiService.js           # AI API communication
├── data/
│   └── projects.js      # Central project data
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd godlycode-portfolio
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🤖 AI Chatbot Setup (IMPORTANT!)

The portfolio includes a **stunning AI-powered chatbot** that showcases your AI integration skills!

### Quick Setup (2 minutes):

1. **Choose Your AI Provider:**
   - Claude AI (Recommended) - https://console.anthropic.com/
   - Venice AI - https://venice.ai/

2. **Get Your API Key:**
   - Sign up for Claude or Venice
   - Generate an API key
   - Copy the key

3. **Configure:**
   Open `src/config/chatbot.config.js` and add your API key:
   ```javascript
   export const chatbotConfig = {
     provider: 'claude', // or 'venice'
     apiKeys: {
       claude: 'sk-ant-your-key-here', // ADD YOUR KEY HERE
       venice: ''
     },
     // ... rest stays the same
   };
   ```

**That's it!** The chatbot will appear on all pages as a floating button in the bottom-right corner.

📖 **Full Setup Guide:** See [AI_CHATBOT_SETUP.md](AI_CHATBOT_SETUP.md) for detailed instructions, customization options, and troubleshooting.

### Chatbot Features:
- ✨ Beautiful floating UI with animations
- 💬 Real AI responses about your projects
- 🎯 Suggested questions for visitors
- 📝 Message history & context
- 🎨 Matches portfolio theme perfectly
- 📱 Works on all devices

**Note:** The chatbot works without an API key (shows setup message) but needs a real key for AI responses.

## 🎨 Customization Guide

### 1. **Update Personal Information**

#### Project Data (`src/data/projects.js`)
- Update project details, URLs, and descriptions
- Replace placeholder GitHub URLs with actual repository links
- Update live demo URLs when projects are deployed

#### Contact Information
- **Footer** (`src/components/Footer.jsx`): Update social media links
- **Contact Page** (`src/pages/Contact.jsx`): Update email and profile URLs

### 2. **Replace Placeholder Images**

#### Professional Photo
- Replace the emoji placeholder in `src/pages/Home.jsx` (About Preview section)
- Replace the emoji placeholder in `src/pages/About.jsx` (Biography section)
- Use a high-quality professional headshot (square aspect ratio recommended)

#### Project Screenshots
- Update screenshots in `src/pages/ProjectDetail.jsx`
- Add real screenshots to the public folder
- Update image paths in the project data

#### Favicon
- Replace `/vite.svg` in `index.html` with your custom favicon
- Generate favicons at different sizes for better compatibility

#### Open Graph Images
- Create an Open Graph image (1200x630px recommended)
- Add it to the `public` folder
- Update the path in `index.html`

### 3. **Update Domain and URLs**

Search for `TODO:` comments throughout the codebase to find all places that need URL updates:

- `index.html` - Canonical URL and Open Graph URLs
- `src/data/projects.js` - GitHub and live demo URLs
- `src/components/Footer.jsx` - Social media links
- `src/pages/Contact.jsx` - Email and social profile links

### 4. **Customize Colors**

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  'dark-bg': '#0a0a0a',           // Main background
  'celestial-gold': '#D4AF37',    // Primary accent
  'electric-blue': '#00B4D8',     // Secondary accent
  'dark-secondary': '#1a1a1a',    // Secondary background
  'dark-tertiary': '#2a2a2a',     // Tertiary background
}
```

### 5. **Customize Fonts**

Current fonts are loaded from Fontshare in `src/index.css`:
- **Display Font**: Clash Display
- **Body Font**: General Sans

To change fonts:
1. Update the `@import` URL in `src/index.css`
2. Update font family in `tailwind.config.js`

### 6. **Add More Projects**

Add new projects to `src/data/projects.js`:

```js
{
  id: 'project-id',
  title: 'Project Title',
  shortDescription: 'Brief description',
  category: 'Category',
  tags: ['Tech1', 'Tech2'],
  liveUrl: 'https://...',
  githubUrl: 'https://...',
  featured: true,
  status: 'live', // or 'development'
  description: 'Full description',
  keyFeatures: ['Feature 1', 'Feature 2'],
  techStack: {
    frontend: [],
    backend: [],
    database: [],
    apis: []
  },
  screenshots: [],
  color: '#hexcode'
}
```

Then add a corresponding mockup design in `src/components/ProjectMockup.jsx`.

### 7. **Implement Contact Form Submission**

The contact form in `src/components/ContactForm.jsx` currently logs to console. To make it functional:

**Option 1: Email Service (EmailJS)**
```bash
npm install @emailjs/browser
```

**Option 2: Backend API**
Create an API endpoint and send form data to your server.

**Option 3: Form Services**
Use services like Formspree, Netlify Forms, or Getform.

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will auto-detect Vite configuration
4. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

4. Deploy:
```bash
npm run deploy
```

## 📝 TODO Checklist

Before going live, make sure to:

- [ ] **Configure AI Chatbot** - Add Claude or Venice API key in `src/config/chatbot.config.js`
- [ ] Replace all placeholder images with real photos
- [ ] Update all social media links (GitHub, LinkedIn, Upwork)
- [ ] Update email address in contact information
- [ ] Add real project screenshots
- [ ] Update domain URLs in `index.html`
- [ ] Create and add Open Graph image
- [ ] Create and add custom favicon
- [ ] Implement contact form submission
- [ ] Update project GitHub repository URLs
- [ ] Test AI chatbot with real API key
- [ ] Test all links and navigation
- [ ] Test responsive design on multiple devices
- [ ] Run Lighthouse audit for performance
- [ ] Add Google Analytics (optional)
- [ ] Set up custom domain

## 🎯 Performance Tips

- All animations are GPU-accelerated via Framer Motion
- Images should be optimized (use WebP format when possible)
- Lazy load images below the fold
- The particle background is optimized to maintain 60fps
- Custom cursor is hidden on mobile devices for performance

## 🐛 Troubleshooting

### Issue: Animations not working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors

### Issue: Tailwind classes not applying
- Make sure `tailwind.config.js` content paths are correct
- Restart the dev server after config changes

### Issue: Routing not working in production
- For Netlify: Add a `_redirects` file in `public` folder with: `/* /index.html 200`
- For Vercel: Add `vercel.json` with proper rewrites

## 📄 License

This is a personal portfolio project. Feel free to use it as inspiration, but please don't copy it directly. Build something unique that represents YOU!

## 👨‍💻 Built By

**Godlycode** - Full-Stack Developer from Nigeria 🇳🇬

Built with ❤️ using React, Tailwind CSS, and Framer Motion

---

**Note**: This website is designed to be a masterpiece. Take time to customize it properly with your real information, photos, and project details. Every pixel matters when showcasing your work to potential clients! 🚀
