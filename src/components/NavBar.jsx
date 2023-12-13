import React, { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

import { Link, useHistory } from "react-router-dom";

export default function NavBar() {
  let { keyword } = useContext(StoreContext);

  let history = useHistory();
  let word = "";
  function getKeyWord(e) {
    word = e.target.value;
  }

  function searchMovie(e) {
    e.preventDefault();
    keyword[1](word);
    history.push("/movies");
  }

  return (
    <>
      <div className="fixed">
        <Navbar bg="" variant="dark">
          <Navbar.Brand>
            <Link to="/" style={{ color: "white" }}>
              <img src="/logo.png"  width={93}/>
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/movies" style={{ color: "white" }}>
                Movies
              </Link>
            </Nav.Link>
            {/* <Nav.Link>
              <Link to="/favorite" style={{ color: "white" }}>
                {" "}
                My Favorite
              </Link>
            </Nav.Link> */}
          </Nav>
          <Form inline onSubmit={(e) => searchMovie(e)}>
            <FormControl
              onChange={(event) => getKeyWord(event)}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button type="submit" variant="outline-danger">
              {" "}
              <i className="fas fa-search"></i>
            </Button>
          </Form>
        </Navbar>
      </div>
    </>
  );
}
