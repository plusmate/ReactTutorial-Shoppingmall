import React from "react";
import { useHistory, useParams } from "react-router-dom";

function Detail(props) {

  let { shoesNumbers } = useParams(); //사용자가 입력한 파라미터가 id라는 변수로 들어감
  let history = useHistory();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + (props.shoes[shoesNumbers].id+1)  + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[shoesNumbers].title}</h4>
          <p>{props.shoes[shoesNumbers].content}</p>
          <h3>{props.shoes[shoesNumbers].price}￦</h3>
          <button className="btn btn-danger">주문하기</button>
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
    </div>
  );
}

export default Detail;
