import React from 'react'
import PropTypes from 'prop-types'
import './Alert.css'

/**
 * Component that displays an alert message with a type, content, and
 * optional details.
 *
 * The alert can be closed by clicking on the close button.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {Object|null} props.message - The message object to display in the alert. If null, the alert is hidden.
 * @param {string} props.message.type - The type of the message, one of "success" or "error".
 * @param {string} props.message.content - The main content of the message to display.
 * @param {string} [props.message.details] - Optional additional details of the message to display.
 * @param {function} props.setMessage - The function to set the message object to display in the alert.
 *
 * @returns {JSX.Element|null} - The rendered alert element or null if no message is provided.
 *
 * @example
 * <Alert
 *   message={{
 *     type: ALERT_TYPE.SUCCESS,
 *     content: 'The operation was successful',
 *     details: 'Additional details about the operation',
 *   }}
 *   setMessage={setMessage}
 * />
 */
const Alert = ({ message, setMessage }) => {
  const timeoutRef = React.useRef(null)

  const closeAlert = () => {
    setMessage(null)
  }

  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMessage(null)
    }, 5000)

    return () => clearTimeout(timeoutRef.current)
  }, [message])

  if (!message) {
    return null
  }

  return (
    <div className={`alert alert-${message.type}`}>
      <span className="close-btn" onClick={closeAlert}>
        &times;
      </span>
      <p>{message.content}</p>
      {message.details && <p className="details">{message.details}</p>}
    </div>
  )
}

/**
 * The possible types of alert messages.
 *
 * @type {Object}
 * @property {string} SUCCESS - The success type of the message.
 * @property {string} ERROR - The error type of the message.
 */
const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
}

Alert.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(ALERT_TYPE)).isRequired,
    content: PropTypes.string.isRequired,
    details: PropTypes.string,
  }),
  setMessage: PropTypes.func.isRequired,
}

export { ALERT_TYPE }
export default Alert
