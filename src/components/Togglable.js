import React from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = React.useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (!visible) {
    return (
      <article>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </article>
    )
  }

  return (
    <article>
      <div>
        {children}
        <button className="secondary" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </article>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable
