import React, { ReactElement, useState, useEffect } from "react";
import api from "../../api"
import { Container, Pagination, Row } from 'react-bootstrap'
import { BookCard } from "../BookCard";
import { SearchField } from "../SearchField";

const BooksList = ({ initPage }: any): ReactElement => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(initPage)
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.post.books({
      page,
      itemsPerPage: 20,
      filters: [{ type: "all", values: [search] }]
    })
      .then(({ books }) => {
        setBooks(books)
      })
  }, [page, search])

  useEffect(() => {
    window.history.pushState({ page }, "", `?page=${page}`)
  }, [page])

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    setSearch(e.target[0].value)
  }

  return (
    <Container>

      <Row>
        <h1 className="bg-primary ">On track book app</h1>
      </Row>

      <Row>
        <SearchField handleSubmit={handleSubmit} />
      </Row>

      <Row>
        {books.map((book: any) => {
          return <BookCard key={book.id} book={book} />
        })}
      </Row>
      <Row>
        <Pagination>
          <Pagination.Prev onClick={(): void => { setPage(page - 1) }}> Previous </Pagination.Prev>
          <Pagination.Next onClick={(): void => { setPage(page + 1) }}> Next </Pagination.Next>
        </Pagination>
      </Row>

    </Container >
  );
};

export default BooksList;
