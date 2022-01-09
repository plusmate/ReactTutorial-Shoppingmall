import "./App.css";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useState } from "react";
import DisplayedGoods from "./states/GoodsState.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Components/Detail";

function App() {
  let [shoes, changingShoes] = useState(DisplayedGoods);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">MyShop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/detail">Detail</Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 먼저 마주친 코드를 먼저 실행 */}
      <Switch>
        <Route exact path="/">
          <Link to="/">
            <div className="Jumbotron">
              <h1>20% Season OFF</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <p>
                <Button variant="primary">바로가기</Button>
              </p>
            </div>
          </Link>

          <GoodsData shoes={shoes} />
        </Route>

        <Route path="/detail/:shoesNumbers">
          <Detail shoes={shoes} />
        </Route>

        <Route path=":id">
          <div>링크창에 아무거나 적었을때 보여주는 텍스트</div>
        </Route>
      </Switch>
    </div>
  );
}

function GoodsData(props) {
  return (
    <div className="row">
      {props.shoes.map((shoesData) => {
        return (
          <div className="col-md-4">
            <Link to={"/detail/" + (shoesData.id)}>
              <img
                src={
                  "https://codingapple1.github.io/shop/shoes" + (shoesData.id + 1) + ".jpg"
                }
                width="100%"
              />
              <h4>{shoesData.title}</h4>
              <p>{shoesData.content}</p>
              <h3>{shoesData.price}₩</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default App;
