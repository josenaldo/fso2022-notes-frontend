import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    date: '2019-05-30T17:30:31.098Z',
    id: '637589cfa4a0b69811aacf36',
  }

  const { container } = render(<Note note={note} />)

  const element = container.querySelector('.note')
  screen.debug(element)

  expect(element).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    date: '2019-05-30T17:30:31.098Z',
    id: '637589cfa4a0b69811aacf36',
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
