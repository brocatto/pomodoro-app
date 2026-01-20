# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a React 19 + Vite 7 Pomodoro timer app with no routing library. Navigation is state-based.

### Component Flow

```
main.jsx → AppWrapper.jsx → Landing.jsx | App.jsx
                                              ├── MusicPlayer.jsx
                                              └── Feedback.jsx
```

- **AppWrapper**: Controls navigation between Landing and App via `showApp` state
- **Landing**: Marketing page with CTAs that trigger `onEnterApp` callback
- **App**: Main timer with tasks, sound settings, and all Pomodoro logic
- **MusicPlayer**: Audio player with playlist of focus tracks from `/public/music/`
- **Feedback**: Modal form using Formspree (requires form ID configuration)

### Key Patterns

**Sound Generation**: Timer completion sounds are synthesized using Web Audio API oscillators (no audio files). Defined in `App.jsx` `sounds` object with 6 options (chime, piano, melody, bell, harp, zen).

**Styling**: Pure CSS with glassmorphism design. Each component has its own `.css` file. Global styles in `index.css`.

**State**: All state is local React state (useState). No global state management. Tasks and timer state live in App component.

### Audio Files

Music tracks are in `/public/music/` (track1.mp3 through track5.mp3). These are loaded by MusicPlayer.jsx.

## Configuration

**Formspree**: To enable feedback form, replace `YOUR_FORM_ID` in `src/Feedback.jsx:6` with actual Formspree form ID.

## Deployment

Deployed to Vercel. Custom domain: gettingshitdone.pro
