import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../Book/BookSlice";
import BookTable from "../Book/BookTable";
import "./Explore.css";

const Explore = () => {
  const { user } = useSelector((state) => state.login);
  const { books, book } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const getBooksAPI = useCallback(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    getBooksAPI();
  }, [book, getBooksAPI]);

  console.log("Explore!", user, books);
  return (
    <>
      <h2 className="login-user">Welcome {user.username}</h2>
      <BookTable books={books} />
    </>
  );
};

export default Explore;
