import { useState } from 'react'
import './Feedback.css'

function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // You can integrate with services like:
    // - Formspree
    // - Google Forms
    // - Web3Forms
    // - Your own backend

    console.log('Feedback submitted:', { feedback, email })

    // For now, just show success message
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setFeedback('')
      setEmail('')
    }, 2000)
  }

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        className="feedback-trigger"
        onClick={() => setIsOpen(true)}
        title="Send feedback"
        aria-label="Send feedback"
      >
        💬
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="feedback-overlay" onClick={() => setIsOpen(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="feedback-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close feedback"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <h3 className="feedback-title">Send Feedback</h3>
                <p className="feedback-subtitle">Help us improve GettingShitDone</p>

                <form onSubmit={handleSubmit} className="feedback-form">
                  <textarea
                    className="feedback-textarea"
                    placeholder="What's on your mind? Bug reports, feature requests, or just saying hi..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    rows="5"
                  />

                  <input
                    type="email"
                    className="feedback-email"
                    placeholder="Email (optional - for follow-up)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button type="submit" className="feedback-submit">
                    Send Feedback
                  </button>
                </form>
              </>
            ) : (
              <div className="feedback-success">
                <div className="success-icon">✓</div>
                <h3>Thanks for your feedback!</h3>
                <p>We appreciate you taking the time.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Feedback
