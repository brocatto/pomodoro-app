import './Landing.css'

function Landing({ onEnterApp }) {
  return (
    <div className="landing">
      {/* Floating Header with Glassmorphism */}
      <header className="landing-header">
        <div className="header-content">
          <h1 className="logo">GettingShitDone</h1>
          <button className="cta-btn" onClick={onEnterApp}>
            Start Now →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            Stop procrastinating.<br />
            Start finishing.
          </h2>
          <p className="hero-subtitle">
            A simple Pomodoro timer that actually helps you get shit done.
          </p>
          <button className="hero-cta" onClick={onEnterApp}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefit">
          <span className="benefit-icon">⏱️</span>
          <h3>25-minute focus sessions</h3>
          <p>Work in short bursts. Stay sharp.</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">🎵</span>
          <h3>Built-in focus sounds</h3>
          <p>No tabs. No distractions. Just flow.</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">✓</span>
          <h3>Track your progress</h3>
          <p>See what you've actually accomplished.</p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <h2>Ready to get your shit done?</h2>
        <button className="cta-large" onClick={onEnterApp}>
          Start Your First Session
        </button>
        <p className="cta-note">No signup. No bullshit. Just focus.</p>
      </section>
    </div>
  )
}

export default Landing
