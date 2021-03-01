import React, { ReactElement, useState, useEffect } from "react";
import api from "../../api"
import { Badge, Card, Container, Pagination, Row } from 'react-bootstrap'

const BooksList = ({ initPage }: any): ReactElement => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(initPage)

  useEffect(() => {
    api.post.books({
      page,
      itemsPerPage: 20,
      filters: [{ type: "all", values: [""] }]
    })
      .then(({ books }) => {
        setBooks(books)
      })
  }, [page])

  useEffect(() => {
    window.history.pushState({ page }, "", `?page=${page}`)
  }, [page])

  return (
    <Container>

      <Row>
        <h1 className="bg-primary">On track</h1>
        <h1>Page <Badge variant="secondary">{page}</Badge></h1>
      </Row>
      <Row>
        <Pagination>
          <Pagination.Prev onClick={(): void => { setPage(page - 1) }}> Previous </Pagination.Prev>
          <Pagination.Next onClick={(): void => { setPage(page + 1) }}> Next </Pagination.Next>
        </Pagination>
      </Row>
      <Row>
        {books.map((book: any) => {
          return (
            <Card className="mb-4 mr-4" style={{ width: '30rem' }} key={book.id}>
              <Card.Body>
                <Card.Title>{book.book_title}</Card.Title>
                <Card.Subtitle className="mb-2">{`by: ${book.book_author}`}</Card.Subtitle>
                <Card.Text>date: {book.book_publication_year}</Card.Text>
                <Card.Text>pages: {book.book_pages}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </Row>

    </Container >
  );
};

export default BooksList;
