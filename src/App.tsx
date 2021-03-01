import React from "react";
import BooksList from "./components/BookList/BooksList";

const App: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initPage = Number(searchParams.get('page')) || 1;

  return (<>
    <BooksList initPage={initPage} />
  </>)

};
export default App;
