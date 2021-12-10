import React, { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

import { Link } from "react-router-dom";

export default function NavBar() {
  let { originalMovie, movie } = useContext(StoreContext);

  function getKeyWord(e) {
    let keyword = e.target.value;
    movie[1](originalMovie[0]);
    movie[1](
      originalMovie[0].filter((movie) => movie.original_title.includes(keyword))
    );
  }

  return (
    <>
      <div className="fixed">
        <Navbar bg="" variant="dark">
          <Navbar.Brand ><Link to="/" style={{color:"white"}}><img src="/logo.png"></img></Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link ><Link to="/" style={{color:"white"}}>Home</Link></Nav.Link>
            <Nav.Link ><Link to="/movies" style={{color:"white"}}  >Movies</Link></Nav.Link>
            <Nav.Link ><Link to="/favorite" style={{color:"white"}}  > My Favorite</Link></Nav.Link>
            
          </Nav>
          <Form inline>
            <FormControl onChange={event=>getKeyWord(event)} type="text" placeholder="Search" className="mr-sm-2" />
            
          </Form>
        </Navbar>
      </div>
    </>
  );
}
