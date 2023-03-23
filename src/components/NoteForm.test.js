import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import NoteForm from './NoteForm'

describe('<NoteForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NoteForm createNote={createNote} />)

    // const input = screen.getByPlaceholderText('Write note content here')
    const input = container.querySelector('#note-input')
    const sendButton = screen.getByText('Save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })
})
