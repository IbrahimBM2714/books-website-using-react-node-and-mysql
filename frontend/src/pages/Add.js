import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Add = () => {
  const [book, setBook] = useState({
    bookTitle: "",
    bookDescription: "",
  });

  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("file" + file);
      if (
        book.bookTitle === "" ||
        book.bookDescription === "" ||
        file === undefined
      ) {
        alert("Field cannot be empty");
      } else {
        const formData = new FormData();
        formData.append("bookTitle", book.bookTitle);
        formData.append("bookDescription", book.bookDescription);
        formData.append("bookCover", file);

        await axios.post("http://localhost:8800/books", formData);
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
        Add new Book
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="book Title"
          onChange={handleChange}
          name="bookTitle"
        />
        <input
          type="text"
          placeholder="book Description"
          onChange={handleChange}
          name="bookDescription"
        />
        <input type="file" onChange={handleFile} />
        <button onClick={handleClick}>Add Book</button>
      </div> */}
    </div>
  );
};

export default Add;
