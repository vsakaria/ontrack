import React from "react"
import { Card } from "react-bootstrap"

export interface Book {
    book_title: string;
    book_author: string;
    book_publication_year: string;
    book_pages: string;
}

export const BookCard = ({ book }: { book: Book }): JSX.Element => (
    <Card className="mb-4 mr-4" style={{ width: '30rem' }}>
        <Card.Body>
            <Card.Title>{book.book_author}</Card.Title>
            <Card.Subtitle className="mb-2">{`by: ${book.book_author}`}</Card.Subtitle>
            <Card.Text>date: {book.book_publication_year}</Card.Text>
            <Card.Text>pages: {book.book_pages}</Card.Text>
        </Card.Body>
    </Card>
)
