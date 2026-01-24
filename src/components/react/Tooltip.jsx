import { useState } from 'react'

function Tooltip({ children, content }) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && content && (
        <div className="tooltip-bubble">
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
