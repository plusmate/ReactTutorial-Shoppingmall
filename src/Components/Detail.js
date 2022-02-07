import { Axios } from "axios";
import { Nav } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../Css/Detail.scss";
import { stockContext } from "../App.js";
import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";

/*
useEffect 옛날버전
class Detail2 extends React.Component {
  componentDidMount() {} //해당 컴포넌트가 렌더링 될 때 실행하는 함수

  componentWillUnmount() {} //컴포넌트를 끝낼 때 실행하는 함수
}
*/

function Detail(props) {
  let stock = useContext(stockContext);

  let [animation, changingAnimation] = useState(false);
  let [timeout, changingTimeout] = useState(true);
  let [disableAlert, changingDisableAlert] = useState(false);
  let [tab, changingTab] = useState(0);
  let { shoesNumbers } = useParams(); //사용자가 입력한 파라미터가 id라는 변수로 들어감
  let history = useHistory();

  function changingStockFunction() {
    let stockArray = [...stock];
    stockArray[shoesNumbers]--;
    props.changingStock(stockArray);
  }

  useEffect(() => {
    stock[shoesNumbers] <= 0
      ? changingDisableAlert(true)
      : changingDisableAlert(false);
  });

  useEffect(() => {
    // axios.get();

    //2초후에 alert창이 나타났다 사라졌다 하는 코드
    let timer = setInterval(() => {
      changingTimeout(!timeout);
    }, 2000);
    return () => {
      clearInterval(timer);
    }; //창을 나가면 timer해제
  }, [timeout]);

  // useEffect(()=>{
  //   let timer = setTimeout(()=>{ alert변경(false) }, 2000);
  // })

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (props.shoes[shoesNumbers].id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[shoesNumbers].title}</h4>
          <p>{props.shoes[shoesNumbers].content}</p>
          <h3>{props.shoes[shoesNumbers].price}₩</h3>
          <StockFunction
            stock={props.stock}
            shoes={props.shoes}
            shoesNumbers={shoesNumbers}
          ></StockFunction>
          {disableAlert === true ? null : (
            <button
              className="btn btn-danger"
              onClick={() => {
                changingStockFunction();
              }}
            >
              바로구매
            </button>
          )}
          &nbsp;
          {disableAlert === true ? null : (
            <button
              className="btn btn-danger"
              onClick={() => {
                props.dispatch({
                  type: "addCart",
                  addToCart: {
                    id: props.shoes[shoesNumbers].id,
                    name: props.shoes[shoesNumbers].title,
                    quan: 1,
                    stock: stock[shoesNumbers],
                  },
                });
                history.push("/Cart");
              }}
            >
              장바구니 담기
            </button>
          )}
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
              //   history.push('/')
            }}
          >
            뒤로가기
          </button>
          <br></br>
          <br></br>
          {stock[shoesNumbers] > 50 ? null : (
            <div className="my-alert my-alert2 stock-alert">
              {props.stock[shoesNumbers] <= 50 ? (
                timeout === true && disableAlert === false ? (
                  <p className="low-in-stock">재고가 얼마 남지 않았습니다</p>
                ) : null
              ) : null}

              {props.stock[shoesNumbers] <= 0 ? (
                disableAlert === true ? (
                  <p className="low-in-stock">품절되었습니다.</p>
                ) : null
              ) : null}
            </div>
          )}
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              changingAnimation(false);
              changingTab(0);
            }}
          >
            Option 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              changingAnimation(false);
              changingTab(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              changingAnimation(false);
              changingTab(2);
            }}
          >
            Option 3
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={animation} classNames="tabAnimation" timeout={500}>
        <TabComponent tab={tab} changingAnimation={changingAnimation} />
      </CSSTransition>
    </div>
  );
}

function TabComponent(props) {
  useEffect(() => {
    props.changingAnimation(true);
  });

  if (props.tab === 0) {
    return <div>0번째 내용입니다</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다</div>;
  } else if (props.tab === 2) {
    return <div>2번째 내용입니다</div>;
  }
}

function StockFunction(props) {
  return <p>재고 : {props.stock[props.shoesNumbers]}</p>;
}

function StoreCart(state) {
  return {
    state: state.reducer,
    closingAlert: state.reducer2,
  };
}

export default connect(StoreCart)(Detail);
// export default Detail;
