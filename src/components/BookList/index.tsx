import React, { ReactElement, useState, useEffect } from "react";
import api from "../../api"
import { Container, Pagination, Row } from 'react-bootstrap'
import { BookCard } from "../BookCard";
import { SearchField } from "../SearchField";
import { Col, Jumbotron } from "reactstrap";

const BooksList = ({ initPage }: { initPage: number }): ReactElement => {
  const [books, setBooks] = useState([])
  const [count, setCount] = useState(0)

  const [page, setPage] = useState(initPage)
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.post.books({
      page,
      itemsPerPage: 20,
      filters: [{ type: "all", values: [search] }]
    })
      .then(({ books, count }) => {
        setBooks(books)
        setCount(count)
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
      <Col xs="12" sm="12">
        <Row>
          <Jumbotron className="mt-4 mb-3 bg-primary text-centre text-white">
            <h1>On track book app</h1>
          </Jumbotron>
        </Row>
      </Col>
      <Col xs="12" sm="6">
        <Row>
          <SearchField handleSubmit={handleSubmit} />
        </Row>
      </Col>
      <Col xs="12" sm="12">
        <Row>
          {books.map((book: any) => {
            return <BookCard key={book.id} book={book} />
          })}
        </Row>
      </Col>
      <Col xs="12" sm="6">
        <Row>
          <Pagination>
            <Pagination.Prev disabled={page === 1} onClick={(): void => { setPage(page - 1) }}> Previous </Pagination.Prev>
            <Pagination.Next disabled={page * 20 >= count} data-testid="next" onClick={(): void => { setPage(page + 1) }}> Next </Pagination.Next>
          </Pagination>
        </Row>
      </Col>

    </Container >
  );
};

export default BooksList;
