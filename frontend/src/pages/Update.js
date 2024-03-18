import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Update = () => {
  const [book, setBook] = useState({
    bookTitle: "",
    bookDescription: "",
    bookCover: "",
  });

  const [books, setBooks] = useState([]);
  const [file, setFile] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/books/" + bookId
        );
        // console.log(response.data);
        setBooks(response.data);
        // console.log(books[0].bookTitle)
        if (response.data) {
          setBook({
            bookTitle: response.data[0].bookTitle,
            bookDescription: response.data[0].bookDescription,
            bookCover: response.data[0].bookCover,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    
  };

  const handleClick = async (e) => {
    try {
      if (books[0].bookTitle === "" || books[0].bookDescription === "") {
        alert("Field cannot be empty");
      } else {
        const formData = new FormData();
        formData.append("bookTitle", book.bookTitle);
        formData.append("bookDescription", book.bookDescription);
        console.log("this the file:" + file);
        console.log("this si the previous file: " + books[0].bookCover)
        formData.append(
          "bookCover",
          file === undefined ?  books[0].bookCover : file
        );
        await axios.put("http://localhost:8800/books/" + bookId, formData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Update book
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          style={{
            width: "50%",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Title"
              onChange={handleChange}
              name="bookTitle"
              defaultValue={books[0] === undefined ? "" : books[0].bookTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Book Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Book Description"
              onChange={handleChange}
              name="bookDescription"
              defaultValue={
                books[0] === undefined ? "" : books[0].bookDescription
              }
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Book File</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>

          <Button variant="primary" onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Update;
