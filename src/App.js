import "./App.css";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import DisplayedGoods from "./states/GoodsState.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Components/Detail";
import axios from "axios";
import Cart from "./Components/Cart";

export let stockContext = React.createContext(); //같은 변수값을 공유할 범위 생성

function App() {
  let [shoes, changingShoes] = useState(DisplayedGoods);
  let [count, changingCount] = useState(2);
  let [countingGoods, changingCountingGoods] = useState(2);
  let [activeBtn, changingActiveBtn] = useState(true);
  let [loadingImage, changingLoadingImage] = useState(false);
  let [stock, changingStock] = useState([
    10, 3, 51, 51, 600, 880, 500, 400, 139,
  ]);

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
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Cart">
                Cart
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

      <Route exact path="/">
        <Link to="/">
          <div className="Jumbotron">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">바로가기</Button>
            </p>
          </div>
        </Link>

        <stockContext.Provider value={stock}>
          <GoodsData shoes={shoes} />
        </stockContext.Provider>
        {activeBtn === true ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                changingCount(count + 1);
                changingCountingGoods(countingGoods + 3);
                //fetch('링크').then();
                /*로딩중이미지 생성 */
                changingLoadingImage(true);

                axios.post("서버URL", { id: "SejinPark", pw: 1478 }).then();

                axios
                  .get(
                    "https://codingapple1.github.io/shop/data" + count + ".json"
                  )
                  .then(result => {
                    //데이터를 가져오는데 성공했을떄의 결과(데이터는 파라미터로 저장됨)
                    /*로딩중이미지 삭제 */
                    changingLoadingImage(false);
                    changingShoes([...shoes, ...result.data]); //changingState의 배열에 다른 배열을 합침
                    /*
                      let shoesArray = [...shoes];
                      shoesArray.push(...result.data)
                      changingShoes(shoesArray)
                      */
                    {
                      shoes.length - 1 === countingGoods && shoes.length - 1 > 2
                        ? changingActiveBtn(false)
                        : changingActiveBtn(true);
                    }
                  })
                  .catch(() => {
                    /*로딩중이미지 삭제 */
                    console.log("실패");
                    let activeBtnArray = [...activeBtn];
                    activeBtnArray = false;
                    changingActiveBtn(false);
                  }); //해당 링크에 대한 데이터를 가져옴
              }}
            >
              더보기
            </button>
            {loadingImage === true ? (
              <div className="loading-image-cover">
                <div className="loading-left"></div>
                <div className="loading-font">Loading...</div>
                <div className="loading-right"></div>
              </div>
            ) : null}
          </>
        ) : null}
      </Route>

      <Route path="/detail/:shoesNumbers">
        <stockContext.Provider value={stock}>
          <Detail shoes={shoes} stock={stock} changingStock={changingStock} />
        </stockContext.Provider>
      </Route>

      <Route path=":id">
        <div>링크창에 아무거나 적었을때 보여주는 텍스트</div>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>
    </div>
  );
}

function GoodsData(props) {
  let stock = useContext(stockContext);

  return (
    <div className="container">
      <div className="row">
        {props.shoes.map(shoesData => {
          return (
            <div className="col-md-4">
              <Link to={"/detail/" + shoesData.id}>
                <img
                  src={
                    "https://codingapple1.github.io/shop/shoes" +
                    (shoesData.id + 1) +
                    ".jpg"
                  }
                  width="100%"
                />
                <h4>{shoesData.title}</h4>
                <p>{shoesData.content}</p>
                <p>재고 : {stock[shoesData.id]}</p>
                <h3>{shoesData.price}₩</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
