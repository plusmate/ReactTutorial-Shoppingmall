import { Axios } from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../Detail.scss";

/*
useEffect 옛날버전
class Detail2 extends React.Component {
  componentDidMount() {} //해당 컴포넌트가 렌더링 될 때 실행하는 함수

  componentWillUnmount() {} //컴포넌트를 끝낼 때 실행하는 함수
}
*/

let DivBox = styled.div`
  padding: 20px;
`;

let TitleCss = styled.h4`
  font-size: 25px;
  color: ${props => props.ColorCss};
`;

function Detail(props) {
  let [timeout, changingTimeout] = useState(true);
  let [disableAlert, changingDisableAlert] = useState(false);
  let [inputValue, changingInputValue] = useState("");
  let { shoesNumbers } = useParams(); //사용자가 입력한 파라미터가 id라는 변수로 들어감
  let history = useHistory();

  function changingStockFunction() {
    let stockArray = [...props.stock];
    stockArray[shoesNumbers] = stockArray[shoesNumbers] - 1;
    props.changingStock(stockArray);
    {
      stockArray[shoesNumbers] <= 0
        ? changingDisableAlert(true)
        : changingDisableAlert(false);
    }
  }

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
      <DivBox>
        <TitleCss className="red">상세페이지</TitleCss>
        <TitleCss ColorCss={"blue"}>상세페이지</TitleCss>
      </DivBox>

      <input
        className="goods-search"
        onChange={e => {
          changingInputValue(e.target.value);
        }}
      />

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
            changingStockFunction={changingStockFunction}
          ></StockFunction>
          {
            (disableAlert === true ? null : (
              <button
                className="btn btn-danger"
                onClick={() => {
                  changingStockFunction();
                }}
              >
                주문하기
              </button>
            ))
          }
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
        </div>
      </div>

      {props.stock[shoesNumbers] <= 50 ? (
        timeout === true && disableAlert === false ? (
          <div className="my-alert my-alert2 stock-alert">
            <p className="low-in-stock">재고가 얼마 남지 않았습니다</p>
          </div>
        ) : null
      ) : null}

      {props.stock[shoesNumbers] === 0 ? (
        disableAlert === true ? (
          <div className="my-alert my-alert2 stock-alert">
            <p className="low-in-stock">품절되었습니다.</p>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

function StockFunction(props) {
  return <p>재고 : {props.stock[props.shoesNumbers]}</p>;
}

export default Detail;
