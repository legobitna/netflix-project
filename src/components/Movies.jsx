import React from "react";
import MovieList from "./MovieList";
import SideBar from "./SideBar";
import { Row, Col, Container } from "react-bootstrap";

export default function Movies() {
  return (
    <div>
      <div className="my-container">
        <div className="movie-sidebar-wrapper">
          <Container>
            <Row>
              <Col lg={4}>
                <SideBar></SideBar>
              </Col>
              <Col lg={8}>
                <MovieList></MovieList>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
