# GettingShitDone - Pomodoro Focus Timer

> Stop procrastinating. Start finishing.

A minimalist Pomodoro timer with built-in focus sounds, task tracking, and a clean dark glassmorphism design. No signup, no bullshit, just focus.

## 🚀 Live Demo

- **Production:** [https://gettingshitdone.pro](https://gettingshitdone.pro)
- **Vercel:** [https://pomodoro-app-eta-sooty.vercel.app](https://pomodoro-app-eta-sooty.vercel.app)

## ✨ Features

### Core Functionality
- ⏱️ **25-minute focus sessions** (Pomodoro technique)
- ☕ **5-minute break intervals**
- 🎵 **Built-in focus music player** (5 ambient tracks)
- ✓ **Task management** with checkboxes
- 🔊 **Sound settings** with multiple notification sounds
- 📊 **Progress tracking** with visual ring animation

### Design
- 🌑 **Dark theme** with smooth gradients (#1a1a1a → #2d2d2d)
- 🪟 **Glassmorphism UI** throughout
- ✨ **Animated background orbs** for depth
- 📱 **Fully responsive** (mobile-optimized)
- 🎨 **Clean, minimal interface**

### User Experience
- 💬 **Feedback system** (Formspree integration)
- 🏠 **Landing page** with direct response copy
- 🌐 **SEO optimized** with Open Graph meta tags
- 🎯 **Zero friction** - no signup required

## 🛠️ Tech Stack

- **Frontend:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** Pure CSS (no frameworks)
- **Deployment:** Vercel
- **Form Handling:** Formspree (optional)
- **Version Control:** Git/GitHub

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/brocatto/pomodoro-app.git

# Navigate to project directory
cd pomodoro-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎵 Music Tracks

The app includes 5 ambient focus tracks:
1. **Ocean Waves** - Calming beach sounds
2. **Rain & Thunder** - Relaxing storm ambiance
3. **Forest Birds** - Nature sounds
4. **Café Ambiance** - Coffee shop atmosphere
5. **White Noise** - Pure focus sound

## 🔧 Configuration

### Setting up Formspree (Feedback System)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form: "GettingShitDone Feedback"
3. Copy your Form ID (e.g., `xyzabc123`)
4. Edit `src/Feedback.jsx` line 6:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
5. Replace `YOUR_FORM_ID` with your actual Form ID
6. Rebuild and redeploy

See [FORMSPREE_SETUP.md](./FORMSPREE_SETUP.md) for detailed instructions.

### Setting up Custom Domain

**Domain:** gettingshitdone.pro (Hostinger)

1. **Add domain to Vercel:**
   ```bash
   vercel domains add gettingshitdone.pro
   ```

2. **Configure DNS in Hostinger:**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   - TTL: `3600`

3. **Wait for propagation** (5 minutes to 48 hours)

4. **Verify:**
   ```bash
   nslookup gettingshitdone.pro
   ```

### Connecting GitHub to Vercel (Auto-Deploy)

1. Go to [vercel.com/brocattos-projects/pomodoro-app/settings/git](https://vercel.com)
2. Click "Connect Git Repository"
3. Select "GitHub"
4. Choose `brocatto/pomodoro-app`
5. Click "Connect"

Now every push to `master` triggers automatic deployment! 🚀

## 📁 Project Structure

```
pomodoro-app/
├── public/
│   ├── music/              # 5 ambient focus tracks
│   ├── favicon.svg         # Custom timer icon
│   └── og-image.svg        # Social media preview (1200x630)
├── src/
│   ├── App.jsx             # Main Pomodoro timer
│   ├── App.css             # Timer styles
│   ├── Landing.jsx         # Landing page
│   ├── Landing.css         # Landing styles
│   ├── AppWrapper.jsx      # Navigation logic
│   ├── MusicPlayer.jsx     # Music player component
│   ├── Feedback.jsx        # Feedback form
│   ├── Feedback.css        # Feedback styles
│   └── main.jsx            # App entry point
├── index.html              # HTML with meta tags
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── README.md               # This file
└── FORMSPREE_SETUP.md      # Formspree instructions
```

## 🎨 Design System

### Colors
- **Background Gradient:** `#1a1a1a` → `#2d2d2d`
- **Glass Cards:** `rgba(255, 255, 255, 0.05)`
- **Borders:** `rgba(255, 255, 255, 0.1)`
- **Text:** `#ffffff` with varying opacity

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** 700-800 weight, negative letter-spacing
- **Body:** 400-600 weight

### Border Radius
- **Cards:** 32px
- **Buttons:** 12-16px
- **Inputs:** 16px

### Transitions
- **Timing:** `cubic-bezier(0.4, 0, 0.2, 1)`
- **Duration:** 0.3s

## 🚢 Deployment

### Vercel (Current)

```bash
# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls
```

### Other Options

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
npm run build
# Then push dist/ folder to gh-pages branch
```

## 📊 SEO & Social Sharing

### Meta Tags Included
- ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
- ✅ Twitter Cards
- ✅ Custom OG image (1200x630px)
- ✅ Description & keywords
- ✅ Theme color

### Testing Social Previews
- **Facebook:** [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- **Twitter:** [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- **LinkedIn:** [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)

## 🐛 Known Issues

- DNS propagation may take up to 48 hours for custom domain
- Formspree free tier limited to 50 submissions/month
- Music files are placeholder MP3s (replace with actual tracks)

## 📝 Changelog

### [Latest] - 2025-10-24
- ✅ Initial release
- ✅ Landing page with direct response copy
- ✅ Pomodoro timer with task management
- ✅ Music player with 5 tracks
- ✅ Feedback system with Formspree
- ✅ Custom domain setup
- ✅ Social media meta tags
- ✅ Custom favicon

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**brocatto**
- GitHub: [@brocatto](https://github.com/brocatto)

## 🙏 Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- Inspired by the Pomodoro Technique®
- Design influenced by glassmorphism trends

---

**Made with ❤️ and a lot of ☕**

*Stop procrastinating. Start finishing. Get your shit done.*
