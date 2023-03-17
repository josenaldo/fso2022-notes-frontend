import React from 'react'

/**
 * Component that displays a footer with attribution to the Note app and the University of Helsinki.
 *
 * @component
 *
 * @return {JSX.Element} - The rendered footer element.
 *
 * @example
 * <Footer />
 */
const Footer = () => {
  const footerStyle = {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  )
}

export default Footer
