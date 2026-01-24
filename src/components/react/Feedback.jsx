import { useState } from 'react'

// Replace with your Formspree form ID
// Get yours at: https://formspree.io/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjkpbwdq'

function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: feedback,
          email: email || 'No email provided',
          _subject: 'New Feedback - GettingShitDone',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send feedback')
      }

      // Success
      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFeedback('')
        setEmail('')
        setError(null)
      }, 2500)
    } catch (err) {
      console.error('Error submitting feedback:', err)
      setError('Failed to send feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
                    disabled={isSubmitting}
                    name="message"
                  />

                  <input
                    type="email"
                    className="feedback-email"
                    placeholder="Email (optional - for follow-up)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    name="email"
                  />

                  {error && (
                    <div className="feedback-error">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="feedback-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Feedback'}
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
