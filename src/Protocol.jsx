import './Protocol.css'
import { useLanguage } from './contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

function Protocol({ onBack, onEnterApp }) {
  const { t } = useLanguage()

  return (
    <div className="protocol">
      <header className="protocol-header">
        <div className="header-content">
          <button className="back-btn" onClick={onBack}>
            ← {t('protocol.back')}
          </button>
          <div className="header-actions">
            <LanguageToggle />
            <button className="cta-btn" onClick={onEnterApp}>
              {t('protocol.startNow')}
            </button>
          </div>
        </div>
      </header>

      <section className="protocol-hero">
        <span className="protocol-label">{t('protocol.label')}</span>
        <h1 className="protocol-title">{t('protocol.title')}</h1>
        <p className="protocol-subtitle">{t('protocol.subtitle')}</p>
      </section>

      <section className="protocol-intro">
        <div className="intro-card">
          <h2>{t('protocol.problem.title')}</h2>
          <p>{t('protocol.problem.p1')}</p>
          <div className="scenario">
            <p className="scenario-label">{t('protocol.problem.scenarioLabel')}</p>
            <ol>
              <li>{t('protocol.problem.scenario1')}</li>
              <li>{t('protocol.problem.scenario2')}</li>
              <li>{t('protocol.problem.scenario3')}</li>
              <li>{t('protocol.problem.scenario4')}</li>
              <li>{t('protocol.problem.scenario5')}</li>
              <li>{t('protocol.problem.scenario6')}</li>
            </ol>
          </div>
          <p className="highlight">{t('protocol.problem.highlight')}</p>
        </div>
      </section>

      <section className="protocol-concepts">
        {/* Concept 00: Pavlov Yourself */}
        <article className="concept">
          <div className="concept-number">00</div>
          <h2 className="concept-title">{t('protocol.pavlov.title')}</h2>
          <p className="concept-subtitle">{t('protocol.pavlov.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.pavlov.quote')}"
          </blockquote>

          <p>{t('protocol.pavlov.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.pavlov.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.pavlov.principle1')}</li>
              <li>{t('protocol.pavlov.principle2')}</li>
              <li>{t('protocol.pavlov.principle3')}</li>
            </ul>
          </div>

          <div className="warning-box">
            <strong>{t('protocol.pavlov.warningTitle')}</strong>
            <p>{t('protocol.pavlov.warning')}</p>
          </div>

          <div className="how-box">
            <h3>{t('protocol.pavlov.howTitle')}</h3>
            <ul>
              <li>{t('protocol.pavlov.how1')}</li>
              <li>{t('protocol.pavlov.how2')}</li>
              <li>{t('protocol.pavlov.how3')}</li>
            </ul>
          </div>
        </article>

        {/* Concept 01: Remove Mental Clutter */}
        <article className="concept">
          <div className="concept-number">01</div>
          <h2 className="concept-title">{t('protocol.clutter.title')}</h2>
          <p className="concept-subtitle">{t('protocol.clutter.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.clutter.quote')}"
          </blockquote>

          <p>{t('protocol.clutter.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.clutter.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.clutter.principle1')}</li>
              <li>{t('protocol.clutter.principle2')}</li>
              <li>{t('protocol.clutter.principle3')}</li>
            </ul>
          </div>

          <div className="how-box">
            <h3>{t('protocol.clutter.howTitle')}</h3>
            <ul>
              <li><strong>{t('protocol.clutter.how1Label')}</strong> — {t('protocol.clutter.how1')}</li>
              <li><strong>{t('protocol.clutter.how2Label')}</strong> — {t('protocol.clutter.how2')}</li>
              <li><strong>{t('protocol.clutter.how3Label')}</strong> — {t('protocol.clutter.how3')}</li>
              <li><strong>{t('protocol.clutter.how4Label')}</strong> — {t('protocol.clutter.how4')}</li>
            </ul>
          </div>

          <div className="math-box">
            <h3>{t('protocol.clutter.mathTitle')}</h3>
            <code>
              {t('protocol.clutter.math')}
            </code>
            <p className="math-conclusion">{t('protocol.clutter.mathConclusion')}</p>
          </div>
        </article>

        {/* Concept 02: Make Distractions Impossible */}
        <article className="concept">
          <div className="concept-number">02</div>
          <h2 className="concept-title">{t('protocol.distractions.title')}</h2>
          <p className="concept-subtitle">{t('protocol.distractions.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.distractions.quote')}"
          </blockquote>

          <p>{t('protocol.distractions.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.distractions.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.distractions.principle1')}</li>
              <li>{t('protocol.distractions.principle2')}</li>
              <li>{t('protocol.distractions.principle3')}</li>
            </ul>
          </div>

          <div className="how-box">
            <h3>{t('protocol.distractions.howTitle')}</h3>
            <ul>
              <li><strong>{t('protocol.distractions.how1Label')}</strong> — {t('protocol.distractions.how1')}</li>
              <li><strong>{t('protocol.distractions.how2Label')}</strong> — {t('protocol.distractions.how2')}</li>
              <li><strong>{t('protocol.distractions.how3Label')}</strong> — {t('protocol.distractions.how3')}</li>
              <li><strong>{t('protocol.distractions.how4Label')}</strong> — {t('protocol.distractions.how4')}</li>
            </ul>
          </div>

          <div className="science-box">
            <h3>{t('protocol.distractions.blindnessTitle')}</h3>
            <p>{t('protocol.distractions.blindness1')}</p>
            <p className="highlight">{t('protocol.distractions.blindness2')}</p>
          </div>
        </article>

        {/* Concept 03: Time Batch */}
        <article className="concept">
          <div className="concept-number">03</div>
          <h2 className="concept-title">{t('protocol.timebatch.title')}</h2>
          <p className="concept-subtitle">{t('protocol.timebatch.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.timebatch.quote')}"
          </blockquote>

          <p>{t('protocol.timebatch.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.timebatch.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.timebatch.principle1')}</li>
              <li>{t('protocol.timebatch.principle2')}</li>
              <li>{t('protocol.timebatch.principle3')}</li>
            </ul>
          </div>

          <div className="how-box">
            <h3>{t('protocol.timebatch.howTitle')}</h3>
            <ul>
              <li><strong>{t('protocol.timebatch.how1Label')}</strong> — {t('protocol.timebatch.how1')}</li>
              <li><strong>{t('protocol.timebatch.how2Label')}</strong> — {t('protocol.timebatch.how2')}</li>
              <li><strong>{t('protocol.timebatch.how3Label')}</strong> — {t('protocol.timebatch.how3')}</li>
            </ul>
          </div>

          <p className="highlight">{t('protocol.timebatch.closing')}</p>
        </article>

        {/* Concept 04: Don't Start, Prepare */}
        <article className="concept">
          <div className="concept-number">04</div>
          <h2 className="concept-title">{t('protocol.prepare.title')}</h2>
          <p className="concept-subtitle">{t('protocol.prepare.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.prepare.quote')}"
          </blockquote>

          <p>{t('protocol.prepare.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.prepare.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.prepare.principle1')}</li>
              <li>{t('protocol.prepare.principle2')}</li>
              <li>{t('protocol.prepare.principle3')}</li>
            </ul>
          </div>

          <div className="how-box">
            <h3>{t('protocol.prepare.howTitle')}</h3>
            <ul>
              <li><strong>{t('protocol.prepare.how1Label')}</strong> — {t('protocol.prepare.how1')}</li>
              <li><strong>{t('protocol.prepare.how2Label')}</strong> — {t('protocol.prepare.how2')}</li>
              <li><strong>{t('protocol.prepare.how3Label')}</strong> — {t('protocol.prepare.how3')}</li>
            </ul>
          </div>

          <p className="highlight">{t('protocol.prepare.closing')}</p>
        </article>

        {/* Concept 05: Embrace Pressure & Constraints */}
        <article className="concept">
          <div className="concept-number">05</div>
          <h2 className="concept-title">{t('protocol.pressure.title')}</h2>
          <p className="concept-subtitle">{t('protocol.pressure.subtitle')}</p>

          <blockquote className="concept-quote">
            "{t('protocol.pressure.quote')}"
          </blockquote>

          <p>{t('protocol.pressure.p1')}</p>

          <div className="principle-box">
            <h3>{t('protocol.pressure.principleTitle')}</h3>
            <ul>
              <li>{t('protocol.pressure.principle1')}</li>
              <li>{t('protocol.pressure.principle2')}</li>
              <li>{t('protocol.pressure.principle3')}</li>
            </ul>
          </div>

          <div className="how-box">
            <h3>{t('protocol.pressure.howTitle')}</h3>
            <ul>
              <li><strong>{t('protocol.pressure.how1Label')}</strong> — {t('protocol.pressure.how1')}</li>
              <li><strong>{t('protocol.pressure.how2Label')}</strong> — {t('protocol.pressure.how2')}</li>
            </ul>
          </div>

          <p className="highlight">{t('protocol.pressure.closing')}</p>
        </article>
      </section>

      <section className="protocol-cta">
        <h2>{t('protocol.cta.title')}</h2>
        <p>{t('protocol.cta.subtitle')}</p>
        <button className="cta-large" onClick={onEnterApp}>
          {t('protocol.cta.button')}
        </button>
        <p className="cta-note">{t('protocol.cta.note')}</p>
      </section>

      <footer className="protocol-footer">
        <p>{t('protocol.footer')}</p>
      </footer>
    </div>
  )
}

export default Protocol
