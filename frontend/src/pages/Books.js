import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        // console.log(response.data);
        setBooks(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding: "0px 50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>My Favorite Books</h1>

      <div
        style={{
          gap: "10px",
        }}
      >
        <Row
          xs={1}
          md={2}
          className="g-4"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {books.map((book) => {
            const imagePath = book.bookCover.replace(/^public[\\/]/, "");
            // console.log(book.bookCover);
            return (
              <Card
                style={{
                  width: "18rem",
                }}
              >
                <Card.Img
                  variant="top"
                  src={"http://localhost:8800/" + imagePath}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Card.Body
                  style={{
                    height: "20rem",
                    overflow: "auto",
                  }}
                >
                  <Card.Title>{book.bookTitle}</Card.Title>
                  <Card.Text>{book.bookDescription}</Card.Text>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(book.bookId)}
                  >
                    Delete
                  </Button>
                  <Button variant="outline-warning">
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/update/${book.bookId}`}
                    >
                      Update
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </Row>
        {/* </CardGroup> */}
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Button variant="primary">
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/add"
          >
            Add new Book
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Books;
