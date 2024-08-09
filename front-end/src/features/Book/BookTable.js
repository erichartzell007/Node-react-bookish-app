import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./BookTable.css";
import EditBookModal from "./EditBookModal";
import { useDispatch } from "react-redux";
import { deleteBook } from "./BookSlice";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const BookTable = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState(null);
  const [isOpenModal, setisOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleViewPdf = (book) => {
    setSelectedBook(book);
  };

  const handleEditPdf = (book) => {
    setSelectedBookForEdit(book);
    setisOpenModal(true);
  };

  const handleDeletePdf = (book) => {
    console.log({ book });
    dispatch(deleteBook(book));
  };

  return (
    <>
      {isOpenModal ? <Backdrop setisOpenModal={setisOpenModal} /> : null}
      <div className="table-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="scrollable-area">
            {books?.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <div className="btn-container">
                    <button
                      className="view-pdf-btn"
                      onClick={() => handleViewPdf(book)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditPdf(book)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePdf(book)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedBook && (
          <div className="pdf-viewer">
            <iframe
              title={selectedBook.book.filename}
              src={`http://localhost:5000/api/book/readBook/${selectedBook.book.filename}`}
              width="100%"
              height="500"
            ></iframe>
            <button className="close-btn" onClick={() => setSelectedBook(null)}>
              Close
            </button>
          </div>
        )}
        {selectedBookForEdit && (
          <EditBookModal
            isOpenModal={isOpenModal}
            setisOpenModal={setisOpenModal}
            selectedBookForEdit={selectedBookForEdit}
          />
        )}
      </div>
    </>
  );
};

export default BookTable;
