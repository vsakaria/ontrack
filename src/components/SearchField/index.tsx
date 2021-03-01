import React from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"

export const SearchField = ({ handleSubmit }: { handleSubmit: (e: any) => void }): JSX.Element => (
  <Form className="mb-sm-3 mt-sm-3" onSubmit={handleSubmit}>
    <InputGroup>
      <FormControl
        type="text"
        placeholder="Search"
      />
      <InputGroup.Prepend>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup.Prepend>
    </InputGroup>
  </Form>
)