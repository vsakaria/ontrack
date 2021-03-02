// __tests__/fetch.test.js
import React from 'react'
import { render, waitFor, screen, fireEvent, waitForElementToBeRemoved, queryByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BooksList from '.'
import nock from 'nock'
import { books, booksPageTwo, searchResult } from '../../mock/books'

beforeEach(() => {
  nock('http://nyx.vima.ekt.gr:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/api/books', {
      page: 1,
      itemsPerPage: 20,
      filters: [{ type: "all", values: [""] }]
    })
    .reply(200, books)
})

test('BooksList should render book data onload', async () => {
  render(<BooksList initPage={1} />)

  await waitFor(() => screen.getByText('date: 1529'))

  expect(screen.getByText('date: 1529')).toHaveTextContent('date: 1529')
})

test('BooksList should render paginated book data when clicking next', async () => {
  render(<BooksList initPage={1} />)

  nock('http://nyx.vima.ekt.gr:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/api/books', {
      page: 2,
      itemsPerPage: 20,
      filters: [{ type: "all", values: [""] }]
    })
    .reply(200, booksPageTwo)

  fireEvent.click(screen.getByTestId('next'))

  await waitFor(() => screen.getByText('date: 1631'))

  expect(screen.getByText('date: 1631')).toHaveTextContent('date: 1631')
})

test('BooksList should render book data when submitting a search', async () => {
  render(<BooksList initPage={1} />)

  nock('http://nyx.vima.ekt.gr:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/api/books', {
      page: 1,
      itemsPerPage: 20,
      filters: [{ type: "all", values: ["1548"] }]
    })
    .reply(200, searchResult)

  const form = screen.getByTestId('form')
  fireEvent.change(form, { target: [{ value: '1548' }] })
  fireEvent.click(screen.getByText('Search'))

  await waitFor(() => screen.getByText('date: 1548'))

  expect(screen.getByText('date: 1548')).toHaveTextContent('date: 1548')
  expect(screen.queryByText('date: 1631')).not.toBeInTheDocument()
})

